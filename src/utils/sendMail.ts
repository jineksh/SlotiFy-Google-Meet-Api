import {
    transporter
} from '../config/mailer.js'
import { getMailHtml } from './mailUi.js'
import {
    GMAIL_USER
} from '../config/envFile.js'


export interface mailType {
    inviteeEmail: string,
    inviteeName: string,
    date: string,
    time: string
}


export async function sendMail(input: mailType) {

    const mailHtml: string = getMailHtml(input.inviteeName, input.date, input.time);


    const mailOptions = {
        from: GMAIL_USER,
        to: input.inviteeEmail,
        subject: 'BOOKING CONFIRMATION',
        html: mailHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.error('[EMAIL-Error] : sending email:', err);
    }


}