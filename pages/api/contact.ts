import type { NextApiRequest, NextApiResponse } from 'next'
import { mailOptions, transporter } from '../../config/nodemailer'
import { ContactForm } from '../../utils/types'

const generateEmailContent = (contactform: ContactForm) => {
    const stringData = Object.entries(contactform).map(([key, value]) => {
        return `<p><strong>${key} : </strong> ${value} </p>`
    }).join('')

    const htmlData = Object.entries(contactform).map(([key, value]) => {
        // on remplace le nom des key en anglais par leur équivalent en français
        if (key === 'name') key = 'Nom'
        if (key === 'email') key = 'Email'
        if (key === 'subject') key = 'Sujet'
        if (key === 'message') key = 'Message'
        if (key === 'emailCopy' && value === `${contactform.email}`) key = "Copie du message envoyé à l'adresse :"
        if (key === 'emailCopy' && !value) key = "Pas de copie du message envoyé à l'expéditeur"

        return `<h3 class="form-heading" align="left">${key}</h3><p class="form-answer" align="left">${value}</p>`
    }).join('')

    const text = stringData.replace(/<[^>]*>?/gm, '')
    const html = `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`

    return {
        text,
        html
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.body);
    if (req.method === 'POST') {
        const contactform: ContactForm = req.body;

        if (!contactform) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }
        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: `Au sujet de ${contactform.subject}`,
                ...generateEmailContent(contactform),
                // text: contactform.message,
                // html: `<h1>Message de ${contactform.name} - ${contactform.email}</h1><p>${contactform.message}</p>`
                ...(contactform.emailCopy && { bcc: contactform.email })

            });
            return res.status(201).json({ message: 'Successfully sent message!' });
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message });
        }
    }
    return res.status(400).json({ message: 'Bad request' });
}

export default handler;