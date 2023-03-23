import '@testing-library/jest-dom/extend-expect';

import { sendContactform } from '../../utils/sendContactform';
import { ContactForm } from '../../utils/types';
import mockFetch from 'jest-fetch-mock';

describe('sendContactform', () => {
    it('Should send the contact form', async () => {
        const contactForm: ContactForm = {
            name: 'test',
            emailCopy: ' ', // on met un espace pour que la checkbox soit cochée
            email: 'test@test.fr',
            message: 'test',
            subject: 'test',
        };

        mockFetch.enableMocks(); // on active les mocks de fetch pour pouvoir tester le fetch

        mockFetch.mockResponseOnce(JSON.stringify({ data: contactForm }));

        const response = await sendContactform(contactForm);

        expect(response).toEqual({ data: contactForm });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(contactForm),
        });
    });
});