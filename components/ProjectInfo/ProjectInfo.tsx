import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Thumbnail from '../Thumbnail/Thumbnail';
import Pill from '../Pill/Pill';
import Carousel from '../Carousel/Carousel';
import GITHUB from '/public/github-pages-logo-1.png';
import SITE from '/public/site-internet.png';
import Modal from '../Modal/Modal';

import type { FrontendLanguages, BackendLanguages, Tools, Images } from '../../utils/types';

type Props = {
  thumbUrl: string;
  backgroundImgUrl: string;
  title: string;
  lastUpdate: string;
  year: string;
  projectLink: string;
  githubLink: string;
  summary: string;
  frontendLanguages?: FrontendLanguages[];
  backendLanguages?: BackendLanguages[];
  tools?: Tools[];
  images?: Images[];
};

const ProjectInfo = ({
  thumbUrl,
  backgroundImgUrl,
  title,
  lastUpdate,
  year,
  projectLink,
  githubLink,
  summary,
  frontendLanguages,
  backendLanguages,
  tools,
  images,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className='relative w-full h-auto py-4 px-8'>
        <div className='relative min-h-128 flex flex-col md:flex-row max-w-fit p-4 m-auto z-10 rounded-xl bg-zinc-800 bg-opacity-95'>
          {images && images.length > 0 ?
            <div className='relative w-full h-96 md:h-auto md:w-2/4 mb-4'>
              <Carousel imagesData={images} />
            </div>
            :
            <div className='relative w-full h-96 md:h-auto md:w-2/4' onClick={openModal} title="cliquer pour agrandir">
              <Thumbnail imgUrl={thumbUrl ? thumbUrl : '/no_image.jpg'} height='h-full' />
            </div>
          }

          <div className='text-gray-100 px-0 py-4 md:py-0 text-center md:text-left md:px-8 w-full md:w-2/3'>
            <div className='flex flex-col md:flex-row justify-between items-center md:items-start mt-6'>
              <h1 className='text-2xl mt-6 md:text-3xl md:mt-0 font-bold pb-4'>
                {title}
              </h1>
              {projectLink && projectLink !== '' || githubLink && githubLink !== '' ?
              <div className='flex flex-wrap items-center justify-center md:justify-start'>
                {projectLink && projectLink !== '' ? (
                  <Link href={projectLink} passHref target='_blank' rel='noopener noreferrer' className='mr-4 md:mr-8'>
                    <Image src={SITE} alt='site-internet' width={50} height={50} title='Voir le projet' loading="lazy" />
                  </Link>
                ) : ''}

                {githubLink && githubLink !== '' ? (
                  <Link href={githubLink} passHref target='_blank' rel='noopener noreferrer'>
                    <Image src={GITHUB} alt='github' width={40} height={40} title='Voir le code' loading="lazy" />
                  </Link>
                ) : ''}
              </div>
              : ''}
            </div>
            <div className='mb-6 text-sm md:text-md mt-6' dangerouslySetInnerHTML={{ __html: summary }} />
            <p className='mb-6 text-sm md:text-lg mt-6'>Année de création : {year}</p>
            {lastUpdate && lastUpdate !== '' ? <p className='mb-6 text-sm md:text-lg mt-6'>Dernière mise à jour : {lastUpdate}</p> : ''}
            <div className='flex flex-col md:flex-row justify-between items-center md:items-start w-full'>
              {frontendLanguages && frontendLanguages.length > 0 ?
              <div className='mt-6 w-full md:w-1/3'>
                <h3 className='text-lg font-bold px-2 py-1'>Client</h3>
                {frontendLanguages.map((frontendLanguages: FrontendLanguages) => (
                  <Pill key={frontendLanguages.id} text={frontendLanguages.name} />
                ))}
              </div>
              : ''}
              {backendLanguages && backendLanguages.length > 0 ?
                  <div className='mt-6 w-full md:w-1/3'>
                    <h3 className='text-lg font-bold px-2 py-1'>Serveur</h3>
                    {backendLanguages.map((backendLanguages: BackendLanguages) => (
                      <Pill key={backendLanguages.id} text={backendLanguages.name} />
                    ))}
                  </div>
                : ''}

              {tools && tools.length > 0 ?
              <div className='mt-6 w-full md:w-1/3'>
                <h3 className='text-lg font-bold px-2 py-1'>Outils</h3>
                {tools.map((tool: Tools) => (
                  <Pill key={tool.id} text={tool.name + (tool.description ? ` : ${tool.description}` : '')} />
                ))}
              </div>
              : ''}
            </div>
          </div>
          <Modal isVisible={isModalOpen} closeModal={() => setIsModalOpen(false)}>
            <Image
              fill={false}
              style={{ objectFit: "cover", objectPosition: "top center", width: "100%", height: "100%" }}
              width={700}
              height={700}
              src={thumbUrl ? thumbUrl : '/no_image.jpg'}
              alt='thumbnail'
              loading="lazy"
            />
          </Modal>
        </div>
        <Image
          // priority
          placeholder='blur'
          blurDataURL='/placeholder.jpg'
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(5px)' }}
          src={backgroundImgUrl ? backgroundImgUrl : '/no_image.jpg'}
          loading="lazy"
          alt='background'
        />
      </div>
    </>
  );
};
export default ProjectInfo;