import type { NextPage } from 'next';
import Link from 'next/link';
import Header from '../components/Header/Header';
import WARNING from '/public/warning.png';
import Image from 'next/image';

const Error: NextPage = () => (
    <>
        <Header />
        <div className='flex flex-col items-center justify-center h-screen'>
            <Image src={WARNING} alt='warning' width={100} height={100} />
            <h1 className='text-4xl font-bold'>404</h1>
            <p className='text-lg'>Page introuvable</p>
            <Link href='/'>
                <div className='text-blue-500 hover:underline'>Retour à l&apos;accueil</div>
            </Link>
        </div>
    </>
);

export default Error;