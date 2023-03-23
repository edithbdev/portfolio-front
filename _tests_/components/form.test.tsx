import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../../components/Form/Form';
import { ContactForm } from '../../utils/types';

describe('<Form />', () => {
    //Cette fonction est exécutée avant chaque test
    beforeEach(() => {
        render(<Form />);
    });

    it('displays the form', () => {
        const form = screen.getByTestId('Form');
        expect(form).toBeInTheDocument();
    });

    it('indicates required fields in label', () => {
        const labels = ['Nom *', 'Email *', 'Sujet *', 'Message *'];
        labels.forEach((label) => {
            const labelElement = screen.getByText(label);
            expect(labelElement).toBeInTheDocument();
        });
    });

    it('displays invalid fields in red', async () => {
        const { getByLabelText, getByRole } = screen;

        const name = getByLabelText('Nom *');
        const email = getByLabelText('Email *');
        const subject = getByLabelText('Sujet *');
        const message = getByLabelText('Message *');

        //fireEvent déclenche un événement dans le DOM, ici un changement de valeur dans un champ de formulaire
        fireEvent.change(name, { target: { value: 'test' } });
        fireEvent.change(email, { target: { value: 'test' } });
        fireEvent.change(subject, { target: { value: '' } });
        fireEvent.change(message, { target: { value: 'test' } });

        //fireEvent.blur déclenche un événement blur sur un élément du DOM
        // ce qui déclenche la validation de ce champ
        fireEvent.blur(name);
        fireEvent.blur(email);
        fireEvent.blur(subject);
        fireEvent.blur(message);

        // await waitFor attend que la fonction passée en paramètre soit exécutée
        // ici on attend que les champs soient invalides
        await waitFor(() => {
            expect(name).toHaveStyle('color: red, border-color: red');
            expect(email).toHaveStyle('color: red, border-color: red');
            expect(subject).toHaveStyle('color: red, border-color: red');
            expect(message).toHaveStyle('color: red, border-color: red');
        });

        const submitButton = getByRole('button', { name: 'Envoyer' });
        expect(submitButton).toBeDisabled();
    });

    it('displays valid fields', () => {
        const { getByLabelText, getByRole } = screen;

        const name = getByLabelText('Nom *');
        const email = getByLabelText('Email *');
        const subject = getByLabelText('Sujet *');
        const message = getByLabelText('Message *');

        fireEvent.change(name, { target: { value: 'test' } });
        fireEvent.change(email, { target: { value: 'test@test.fr' } });
        fireEvent.change(subject, { target: { value: 'test' } });
        fireEvent.change(message, { target: { value: 'test' } });

        fireEvent.blur(name);
        fireEvent.blur(email);
        fireEvent.blur(subject);
        fireEvent.blur(message);

        waitFor(() => {
            expect(name).toHaveClass('border-green-500')
            expect(email).toHaveClass('border-green-500')
            expect(subject).toHaveClass('border-green-500')
            expect(message).toHaveClass('border-green-500')
        });

        const submitButton = getByRole('button', { name: 'Envoyer' });
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);

        waitFor(() => {
            const successMessage = screen.getByText('Votre message a bien été envoyé !');
            expect(successMessage).toBeInTheDocument();
        });
    });

    it('should display a copy of the email', async () => {
        const { getByLabelText, getByRole } = screen;

        const name = getByLabelText('Nom *');
        const email = getByLabelText('Email *');
        const subject = getByLabelText('Sujet *');
        const message = getByLabelText('Message *');
        const emailCopy = getByLabelText('Recevoir une copie du message');

        fireEvent.change(name, { target: { value: 'test' } });
        fireEvent.change(email, { target: { value: 'test@test.fr' } });
        fireEvent.change(subject, { target: { value: 'test' } });
        fireEvent.change(message, { target: { value: 'test' } });

        fireEvent.blur(name);
        fireEvent.blur(email);
        fireEvent.blur(subject);
        fireEvent.blur(message);

        fireEvent.click(emailCopy);

        const submitButton = getByRole('button', { name: 'Envoyer' });

        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);

        waitFor(() => {
            const successMessage = screen.getByText('Votre message a bien été envoyé !');
            expect(successMessage).toBeInTheDocument();

            expect(emailCopy).toBeChecked();
        });
    });

    it('should submit the form', () => {
        const handleSubmit = jest.fn();

        const contactForm: ContactForm = {
            name: 'test',
            email: 'test@test.fr',
            subject: 'test',
            message: 'test',
            emailCopy: ' ',
        };

        const name = screen.getByLabelText('Nom *');
        const email = screen.getByLabelText('Email *');
        const subject = screen.getByLabelText('Sujet *');
        const message = screen.getByLabelText('Message *');

        fireEvent.change(name, { target: { value: contactForm.name } });
        fireEvent.change(email, { target: { value: contactForm.email } });
        fireEvent.change(subject, { target: { value: contactForm.subject } });
        fireEvent.change(message, { target: { value: contactForm.message } });

        fireEvent.blur(name);
        fireEvent.blur(email);
        fireEvent.blur(subject);
        fireEvent.blur(message);

        const submitButton = screen.getByRole('button', { name: 'Envoyer' });
        expect(submitButton).toBeEnabled();

        fireEvent.click(submitButton);

        waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith(contactForm);
        });

        waitFor(() => {
            const successMessage = screen.getByText('Votre message a bien été envoyé !');
            expect(successMessage).toBeInTheDocument();
            expect(document.getElementById('close-modal')).toBeInTheDocument();

            setTimeout(() => {
                document.getElementById('close-modal')?.click();
            }, 3000); // on ferme la modal après 3 secondes

            waitFor(() => {
                expect(document.getElementById('close-modal')).not.toBeInTheDocument();
            });
        });
    });

    it('should close the modal after 3 seconds', () => {
        const { getByLabelText, getByRole } = screen;

        const name = getByLabelText('Nom *');
        const email = getByLabelText('Email *');
        const subject = getByLabelText('Sujet *');
        const message = getByLabelText('Message *');

        fireEvent.change(name, { target: { value: 'test' } });
        fireEvent.change(email, { target: { value: 'test@test.fr' } });
        fireEvent.change(subject, { target: { value: 'test' } });
        fireEvent.change(message, { target: { value: 'test' } });

        fireEvent.blur(name);
        fireEvent.blur(email);
        fireEvent.blur(subject);
        fireEvent.blur(message);

        const submitButton = getByRole('button', { name: 'Envoyer' });
        expect(submitButton).toBeEnabled();

        fireEvent.click(submitButton);

        waitFor(() => {
            const successMessage = screen.getByText('Votre message a bien été envoyé !');
            expect(successMessage).toBeInTheDocument();

            setTimeout(() => {
                expect(successMessage).not.toBeInTheDocument();
            }, 3000);
        });
    });

    it('should display an error message', () => {

        const { getByLabelText, getByRole } = screen;

        const name = getByLabelText('Nom *');
        const email = getByLabelText('Email *');
        const subject = getByLabelText('Sujet *');
        const message = getByLabelText('Message *');

        fireEvent.change(name, { target: { value: '' } });
        fireEvent.change(email, { target: { value: '' } });
        fireEvent.change(subject, { target: { value: '' } });
        fireEvent.change(message, { target: { value: '' } });

        fireEvent.blur(name);
        fireEvent.blur(email);
        fireEvent.blur(subject);
        fireEvent.blur(message);

        const submitButton = getByRole('button', { name: 'Envoyer' });
        expect(submitButton).toBeDisabled();

        waitFor(() => {
            const errorMessage = screen.getByText('Veuillez remplir ce champ');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('should display a success message', () => {
        const { getByLabelText, getByRole } = screen;

        const name = getByLabelText('Nom *');
        const email = getByLabelText('Email *');
        const subject = getByLabelText('Sujet *');
        const message = getByLabelText('Message *');

        fireEvent.change(name, { target: { value: 'test' } });
        fireEvent.change(email, { target: { value: 'test@test.fr' } });
        fireEvent.change(subject, { target: { value: 'test' } });
        fireEvent.change(message, { target: { value: 'test' } });

        fireEvent.blur(name);
        fireEvent.blur(email);
        fireEvent.blur(subject);
        fireEvent.blur(message);

        const submitButton = getByRole('button', { name: 'Envoyer' });

        expect(submitButton).toBeEnabled();

        fireEvent.click(submitButton);
        waitFor(() => {
            const successMessage = screen.getByText('Votre message a bien été envoyé !');
            expect(successMessage).toBeInTheDocument();

            setTimeout(() => {
                expect(successMessage).not.toBeInTheDocument();
            }, 3000);
        });
    });
});