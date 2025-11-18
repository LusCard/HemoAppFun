import nodemailer from 'nodemailer';
import {envs} from '../config/config.env.js';

class EmailService {
    constructor(){ //aca hacemos la conexion con el servicio de mail
        this.transporter = nodemailer.createTransport({
            host: envs.EMAIL_HOST,
            port: envs.EMAIL_PORT,
            secure: false,
            auth:{
                user: envs.EMAIL_USER,
                pass: envs.EMAIL_PASS
            }
        });
    }
    async sendVerificationEmail(to, token){ //es el metodo de envio, tiene la logica de node
        const verificationUrl = `${envs.FRONTEND_URL}/verify-email?token=${token}`;
        const mailOptions ={
            from: `HemoApp <${envs.EMAIL_USER}>`,
            to: to,
            subject: "Verifica tu identidad! Valida si sos vos",
            html: this.getVerificationTemplate(verificationUrl)
        }
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email enviado a: ${to}` );
            return true;
        } catch (error) {
            console.log("No se pudo enviar el email de verificación", error);
        }
    }
    getVerificationTemplate(verificationUrl){ //el template es 
        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #e74c3c;">¡Bienvenido a HemoApp!</h1>
                <p>Estás a un paso de unirte a nuestra comunidad de donantes.</p>
                <p>Haz clic en el siguiente enlace para verificar tu email:</p>
                <a href="${verificationUrl}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #e74c3c; 
                          color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
                    Verificar Email
                </a>
                <p><em>Si no solicitaste este registro, puedes ignorar este mensaje.</em></p>
            </div>
        `
    }    
}
export const emailService = new EmailService();