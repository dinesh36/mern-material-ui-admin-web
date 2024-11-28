import { smtpSenderEmail, smtpHost, smtpPass, smtpUser } from './config';

const nodemailer = require('nodemailer');

class EmailSender {
  transporter: any;
  constructor() {
    this.init();
  }

  init() {
    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
      tls: {
        minVersion: 'TLSv1.2',
      },
    });
  }

  async sendEmail({
    subject,
    text,
    html,
    to,
  }: {
    subject: string;
    text: string;
    html: string;
    to: string;
  }) {
    try {
      await this.transporter.sendMail({
        from: smtpSenderEmail,
        subject,
        text,
        html,
        to,
      });
    } catch (error) {
      throw error;
    }
  }
}

export const emailSender = new EmailSender();
