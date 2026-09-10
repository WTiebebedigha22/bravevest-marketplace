import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type Auth, type DecodedIdToken } from 'firebase-admin/auth';
import { randomBytes } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseSyncDto } from '../auth/dto/firebase-sync.dto';

@Injectable()
export class FirebaseService {
  private readonly app?: App;
  private readonly auth?: Auth;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');

    if (getApps().length > 0) {
      this.app = getApps()[0];
    } else if (projectId && clientEmail && privateKey) {
      this.app = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      });
    } else if (this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS')) {
      this.app = initializeApp();
    }

    if (this.app) {
      this.auth = getAuth(this.app);
    }
  }

  isConfigured(): boolean {
    return Boolean(this.auth);
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    if (!this.auth) {
      throw new ServiceUnavailableException('Firebase is not configured');
    }

    return this.auth.verifyIdToken(idToken, true);
  }

  async getUser(uid: string) {
    if (!this.auth) {
      throw new ServiceUnavailableException('Firebase is not configured');
    }

    return this.auth.getUser(uid);
  }

  async syncUser(firebaseUser: DecodedIdToken, profile: FirebaseSyncDto) {
    const email = firebaseUser.email ?? profile.email;
    if (!email) {
      throw new BadRequestException('Firebase account does not contain an email address');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ firebaseUid: firebaseUser.uid }, { email }],
      },
    });

    if (existingUser) {
      return this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          firebaseUid: firebaseUser.uid,
          email,
          firstName: profile.firstName ?? existingUser.firstName ?? firebaseUser.name?.split(' ')[0],
          lastName: profile.lastName ?? existingUser.lastName,
          lastLoginAt: new Date(),
        },
        include: { wallets: true },
      });
    }

    if (!profile.phone) {
      throw new BadRequestException('A phone number is required to create a BraveVest profile');
    }

    return this.prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email,
        phone: profile.phone,
        passwordHash: await bcrypt.hash(randomBytes(32).toString('hex'), 10),
        role: profile.role ?? 'investor',
        accountType: profile.accountType ?? 'individual',
        firstName: profile.firstName,
        lastName: profile.lastName,
        nationality: profile.nationality,
        countryOfResidence: profile.countryOfResidence,
        investorType: profile.investorType,
        city: profile.city,
        address: profile.address,
        isPEP: profile.isPEP ?? false,
        lastLoginAt: new Date(),
        wallets: { create: { currency: 'NGN', balance: 0 } },
      },
      include: { wallets: true },
    });
  }

  async findUserByFirebaseUid(uid: string) {
    return this.prisma.user.findUnique({
      where: { firebaseUid: uid },
      include: { wallets: true },
    });
  }
}
