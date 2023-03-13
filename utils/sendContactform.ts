import { ContactForm } from './types';

export const sendContactform = async (contactform: ContactForm) =>
    await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(contactform),
    }).then((res) => {
        if (!res.ok) throw new Error("Echec de l'envoi du formulaire");
        return res.json();
    });  
