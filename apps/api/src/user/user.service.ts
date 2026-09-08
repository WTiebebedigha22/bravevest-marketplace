import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private readonly firebase: FirebaseService) {}

  async findById(id: string) {
    const snapshot = await this.firebase.getFirestore().collection('users').doc(id).get();
    if (!snapshot.exists) throw new NotFoundException('User not found');
    return { id: snapshot.id, ...snapshot.data() };
  }

  async updateProfile(id: string, data: Record<string, unknown>) {
    const profile = await this.firebase.getFirestore().collection('users').doc(id);
    if (!(await profile.get()).exists) throw new NotFoundException('User not found');
    await profile.update({ ...data, updatedAt: this.firebase.serverTimestamp() });
    return this.findById(id);
  }

  async getInvestorProfile(id: string) {
    return this.findById(id);
  }
}
