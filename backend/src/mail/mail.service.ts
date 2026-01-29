import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendEmail(email: string, subject: string, htmlContent: string, name: string) {
        try {

            const finalName = name && name.trim() !== "" ? name.trim() : "Hiring Manager";
            const _htmlContent = htmlContent.replace(/{{\s*name\s*}}/gi, finalName);
            await this.transporter.sendMail({
                from: `"Azad Kumar" <${process.env.EMAIL_USER}>`,
                to: email,
                subject,
                html: _htmlContent,
            });

            return { message: 'Email sent successfully' };
        } catch (error) {
            console.error("error:", error);
            throw new InternalServerErrorException('Email could not be sent');
        }
    }

}
