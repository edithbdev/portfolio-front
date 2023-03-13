import type { NextPage } from 'next';
import Link from 'next/link';
import Header from '../components/Header/Header';

const Error: NextPage = () => (
    <>
        <Header />
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>500</h1>
            <p className='text-lg'>Erreur interne du serveur</p>
            <Link href='/'>
                <div className='text-blue-500 hover:underline'>Retour à l&apos;accueil</div>
            </Link>
        </div>
    </>
);

export default Error;

