// apps/api/src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        wallets: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, data: any) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async getInvestorProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        wallets: true,
        subscriptions: {
          include: {
            opportunity: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}