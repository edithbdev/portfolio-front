import React, { useState } from "react";
import { sendContactform } from "../../utils/sendContactform";
import { ContactForm } from "@/utils/types";
import Loader from "../Loader/Loader";
//https://www.npmjs.com/package/react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// https://www.youtube.com/watch?v=t2LvPXHLrek
// on récupère les types de l'objet ContactForm
const initValues: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
    emailCopy: '',
}

//https://stackoverflow.com/questions/46215614/property-does-not-exist-on-type-detailedhtmlprops-htmldivelement-with-react
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        issubmitting?: boolean;
    }
}

const initState = { issubmitting: false, values: initValues, error: '' };

const Form = () => {
    const [state, setState] = useState<{ issubmitting?: boolean; values: ContactForm; error: string; }>(initState);

    const { values, error, issubmitting } = state;
    // on initialise un objet vide pour gérer les erreurs de saisie
    const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; subject?: boolean; message?: boolean; }>({});
    const [checked, setChecked] = useState(false);

    // fonction pour gérer les erreurs de saisie
    const onBlur = (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        // console.log('target', e.currentTarget.name);
        if (!e.currentTarget === null) return;
        if (!e.currentTarget.name) return;
        if (e.currentTarget.value === '') {
            e.currentTarget.classList.add('border-red-500');
        } else {
            e.currentTarget.classList.remove('border-red-500');
            e.currentTarget.classList.add('border-green-500');
        }
        // on met à jour le state touched pour indiquer que l'input a été touché
        setTouched({ ...touched, [e.currentTarget.name]: true });
    }

    // fonction pour vérifier si l'email est valide
    const isEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // fonction pour valider le formulaire
    const validate = (values: any) => {
        let errors: any = {};
        if (!values.name) {
            errors.name = 'Veuillez remplir ce champ';
        }
        if (!values.email) {
            errors.email = 'Veuillez remplir ce champ';
        } else if (!isEmail(values.email)) {
            errors.email = 'Email invalide';
        }
        if (!values.subject) {
            errors.subject = 'Veuillez remplir ce champ';
        }
        if (!values.message) {
            errors.message = 'Veuillez remplir ce champ';
        }
        return errors;
    }

    // fonction qui va permettre de mettre à jour les valeurs de l'objet values
    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setState({ ...state, values: { ...values, [name]: value } });
    }

    const resolveAfter1Second = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 1000);
        });
    }

    const notify = async () => {
        const result = await resolveAfter1Second();
        if (result === 'resolved') {
            toast.success('Votre message a bien été envoyé !', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleCheckbox = (e: React.FormEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked);
    }

    if (checked) {
        values.emailCopy = values.email;
    }

    // fonction qui va permettre d'envoyer le formulaire
    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setState((prevState) => ({
            ...prevState,
            issubmitting: true,
        }));
        try {
            await sendContactform(values);
            setTouched({});
            setState(initState);
            notify();
            setTimeout(() => {
                document.getElementById('close-modal')?.click();
            }, 3000); // on ferme la modal après 3 secondes
        } catch (error: any) {
            setState((prevState) => ({
                ...prevState,
                isSubmitting: false,
                error: error.message
            }));
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center py-3 px-6 lg:px-8 w-full mx-auto" data-testid="Form">
                {
                    error && <p className="text-red-500 text-sm">{error}</p>
                }
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <form className="w-full max-w-lg" noValidate>
                    <div className="form-group form-control" {...(touched.name && { error: validate(values).name })}>
                        <label
                            htmlFor="name"
                            className="block text-xs md:text-sm font-medium text-gray-700"
                        >Nom *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mb-2 bg-gray-50 border text-gray-700 text-xs md:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Entrez votre nom"
                            value={values.name} onChange={handleChange}
                            onBlur={onBlur}
                        />
                    </div>
                    {touched.name && validate(values).name && <p className="text-red-500 text-xs">{validate(values).name}</p>}

                    <div className="form-group form-control" {...(touched.email && { error: validate(values).email })}>
                        <label
                            htmlFor="email"
                            className="block text-xs md:text-sm font-medium text-gray-700"
                        >Email *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="mb-2 bg-gray-50 border text-gray-700 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="votre@email.com"
                                value={values.email} onChange={handleChange}
                                onBlur={onBlur}
                            />

                        </div>
                    {touched.email && validate(values).email && <p className="text-red-500 text-xs">{validate(values).email}</p>}
                    </div>

                    <div className="form-group form-control" {...(touched.subject && { error: validate(values).subject })}>
                        <label
                            htmlFor="subject"
                            className="mt-2 block text-xs md:text-sm font-medium text-gray-700"
                        >Sujet *</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            className="mb-2 bg-gray-50 border text-gray-700 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Objet de votre message"
                            value={values.subject} onChange={handleChange}
                            onBlur={onBlur}
                        />
                    </div>
                    {touched.subject && validate(values).subject && <p className="text-red-500 text-xs">{validate(values).subject}</p>}

                    <div className="form-group form-control" {...(touched.message && { error: validate(values).message })}>
                        <label
                            htmlFor="message"
                            className="mt-2 block text-xs md:text-sm font-medium text-gray-700"
                        >Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={2}
                            required
                            className="mb-2 bg-gray-50 border text-gray-700 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Entrez votre message"
                            value={values.message} onChange={handleChange}
                            onBlur={onBlur}
                        />
                    </div>
                    {touched.message && validate(values).message && <p className="text-red-500 text-xs">{validate(values).message}</p>}

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="emailCopy"
                                name="emailCopy"
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-3 text-blue-600 border-gray-300 rounded"
                                value={values.emailCopy} onChange={handleCheckbox}
                            />
                        </div>
                        <div className="ml-2 text-sm">
                            <label htmlFor="emailCopy" className="font-medium text-xs md:text-sm text-gray-700">Recevoir une copie du message</label>
                        </div>
                    </div>
                    
                    <button
                        data-testid='toast'
                        type="submit"
                        disabled={!values.name || !values.email || validate(values).email || !values.message || !values.subject || issubmitting}
                        onClick={onSubmit}
                        className="mt-4 w-100 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs md:text-sm font-medium rounded-md text-gray-100 bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {issubmitting ? <Loader type="spin" color="#fff" height={30} width={30} /> : 'Envoyer'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default Form;