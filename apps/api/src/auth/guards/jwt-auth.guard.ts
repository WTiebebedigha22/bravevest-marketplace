// apps/api/src/auth/guards/jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly firebaseService: FirebaseService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const [scheme, token] = request.headers.authorization?.split(' ') ?? [];

		if (scheme?.toLowerCase() === 'bearer' && token && this.firebaseService.isConfigured()) {
			try {
				const firebaseUser = await this.firebaseService.verifyIdToken(token);
				const user = await this.firebaseService.findUserByFirebaseUid(firebaseUser.uid);
				if (!user) {
					throw new UnauthorizedException('Firebase user profile has not been synchronized');
				}
				request.firebaseUser = firebaseUser;
				request.user = user;
				return true;
			} catch (error) {
				if (error instanceof UnauthorizedException) {
					throw error;
				}
			}
		}

		const legacyGuard = new (AuthGuard('jwt'))();
		return Boolean(await legacyGuard.canActivate(context));
	}
}