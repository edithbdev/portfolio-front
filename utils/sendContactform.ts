import { ContactForm } from './types';

export const sendContactform = async (contactForm: ContactForm): Promise<Response> => {
    let response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(contactForm),
    });
    if (!response.ok) throw new Error("Echec de l'envoi du formulaire");
    return response.json();
};
