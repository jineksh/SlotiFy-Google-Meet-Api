import nodemailer from 'nodemailer'
import {
    GMAIL_USER, GMAIL_PASS
} from './envFile.js'



export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});