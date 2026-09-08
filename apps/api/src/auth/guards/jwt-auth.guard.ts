// apps/api/src/auth/guards/jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly firebase: FirebaseService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const authorization = request.headers.authorization;
		const token = authorization?.startsWith('Bearer ')
			? authorization.slice(7)
			: null;

		if (!token) throw new UnauthorizedException('Bearer token required');

		try {
			const decoded = await this.firebase.getAuth().verifyIdToken(token);
			const user = await this.firebase.getFirestore().collection('users').doc(decoded.uid).get();
			if (!user.exists) throw new UnauthorizedException('User not found');
			request.user = { id: decoded.uid, ...user.data() };
			return true;
		} catch {
			throw new UnauthorizedException('Invalid Firebase token');
		}
	}
}