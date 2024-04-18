import transporter from "../config/mail.config.js"
import logger from '../config/logger.config.js'

export async function sendMail(subject, template, emailReciver) {
    try{
        const reciver = emailReciver;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: reciver,
            subject: subject,
            html: template,
        };

        await transporter.sendMail(mailOptions);
    }
    catch(err){
        logger.error('An error ocurred trying to send an email: '+ err);
    }
}