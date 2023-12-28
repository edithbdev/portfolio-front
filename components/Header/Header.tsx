import Link from 'next/link';
import GITHUB from '/public/github-pages-logo-1.png';
import LINKEDIN from '/public/linkedin-logo.png';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className='sticky flex top-0 z-40 w-full h-24 bg-zinc-700'>
            <div className='flex items-center justify-start w-2/4 h-full ml-6'>
                <Link className='flex' href='/' passHref>
                    <div className='cursor-pointer flex items-center'>
                        <div className='invisible md:visible'>
                            <h1 className='text-2xl font-bold text-gray-100'> Edith BREDON _ <span className='uppercase'>Développeuse Web</span></h1>
                        </div>
                        <div className='absolute md:invisible pt-2'>
                            <h1 className='text-sm md:text-2xl font-bold text-gray-100'>Edith BREDON</h1>
                            <span className='text-sm md:text-2xl font-bold text-gray-100 uppercase'>Développeuse Web</span>
                        </div>
                    </div>
                </Link>
            </div>

            <div className='relative flex items-center space-x-2 w-1/4 h-full pr-4 md:pr-12'>
                <a href='https://github.com/edithbdev' target='_blank' rel='noreferrer' className='cursor-pointer'>
                    <Image
                        src={GITHUB} alt='github' width={45} height={45} title='Voir mon Github' loading="lazy" />
                </a>
                <a href='https://www.linkedin.com/in/edithbredon/' target='_blank' rel='noreferrer' className='cursor-pointer'>
                    <Image
                        src={LINKEDIN} alt='linkedin' width={45} height={45} title='Voir mon profil Linkedin' loading="lazy" />
                </a>
            </div>
            <Fragment>
                <button className='relative flex items-center w-1/4 h-full justify-end mr-6 md:mr-12' onClick={openModal}>
                    <h1 className='text-xs md:text-2xl font-bold text-gray-100 box-border border-2 border-white rounded-md ml-2 px-2 md:px-4 py-2 cursor-pointer' title='Contactez-moi !'>Contact</h1>
                </button>
                <Modal isVisible={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                    <p className='text-xl md:text-3xl font-bold text-gray-400'>
                        Contactez-moi !</p>
                    <p className='text-xs md:text-lg font-bold text-gray-500 mt-4 mb-2'>
                        N&apos;hésitez à me contacter via ce formulaire ou <a href='https://www.linkedin.com/in/edithbredon/' target='_blank' rel='noreferrer' className='cursor-pointer underline'>mon profil
                            LinkedIn</a> pour en savoir plus ou bien discuter d&apos;une éventuelle collaboration</p>
                    <Form />
                </Modal>
            </Fragment>
        </div>
    )
}

export default Header;