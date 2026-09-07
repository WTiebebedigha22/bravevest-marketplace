// apps/api/src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: parseInt(this.configService.get('SMTP_PORT')) || 587,
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Welcome to BraveVest!',
        html: `
          <h1>Welcome to BraveVest, ${name}!</h1>
          <p>Thank you for joining BraveVest. You're now part of a community of investors building their financial future.</p>
          <p>Get started by completing your profile and exploring investment opportunities.</p>
          <a href="${this.configService.get('FRONTEND_URL')}/investor/dashboard">Go to Dashboard</a>
        `,
      });
    } catch (error) {
      console.log('Email error:', error);
    }
  }

  async send2FACode(email: string, code: string) {
    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Your BraveVest 2FA Code',
        html: `
          <h1>Your Two-Factor Authentication Code</h1>
          <p>Enter the following code to complete your login:</p>
          <h2 style="font-size: 32px; letter-spacing: 4px;">${code}</h2>
          <p>This code will expire in 5 minutes.</p>
        `,
      });
    } catch (error) {
      console.log('Email error:', error);
    }
  }

  async sendPasswordReset(email: string, token: string) {
    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Reset Your Password - BraveVest',
        html: `
          <h1>Reset Your Password</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
        `,
      });
    } catch (error) {
      console.log('Email error:', error);
    }
  }
}