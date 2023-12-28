import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

export const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    secure: true, 
    secureConnection: false,
    tls: {
    ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    connectionTimeout: 10000,
    auth: {
        user: email,
        pass: password

    },
});

export const mailOptions = {
    from: email,
    to: email,
};