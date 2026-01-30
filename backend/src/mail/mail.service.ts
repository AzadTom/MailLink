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

    async sendEmail(
        email: string,
        subject: string,
        htmlContent: string,
        name: string,
        company: string
    ) {
        try {
            const finalName =
                name && name.trim() !== "" ? name.trim() : "Hiring Manager";

            const finalCompany =
                company && company.trim() !== "" ? company.trim() : "your company";

            // Replace in subject
            const finalSubject = subject
                .replace(/{{\s*company\s*}}/gi, finalCompany);

            // Replace in HTML body
            const finalHtml = htmlContent
                .replace(/{{\s*name\s*}}/gi, finalName)
                .replace(/{{\s*company\s*}}/gi, finalCompany);

            await this.transporter.sendMail({
                from: `"Azad Kumar" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: finalSubject,
                html: finalHtml,
            });

            return { message: "Email sent successfully" };
        } catch (error) {
            console.error("error:", error);
            throw new InternalServerErrorException("Email could not be sent");
        }
    }


}
