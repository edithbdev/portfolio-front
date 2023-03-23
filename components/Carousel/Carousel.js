import React, { useState, useEffect } from "react";
import { API_URL } from '../../config';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Modal from '../Modal/Modal';

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param imagesData - Array of images with src and alt attributes
 * @returns React component
 */
const Carousel = ({ imagesData }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) closeModal(); // Fermer la modal quand on appuie sur la touche échap
        if (e.keyCode === 37) handlePrev(); // Voir l'image précédente quand on appuie sur la flèche gauche
        if (e.keyCode === 39) handleNext(); // Voir l'image suivante quand on appuie sur la flèche droite
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    });

    const handleNext = () => {
        if (currentImage === imagesData.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(currentImage + 1);
        }
    };

    const handlePrev = () => {
        if (currentImage === 0) {
            setCurrentImage(imagesData.length - 1);
        } else {
            setCurrentImage(currentImage - 1);
        }
    };

    const handleImageClick = (index) => {
        setCurrentImage(index);
        setLightboxIsOpen(true);
    };

    const handleClose = () => {
        setLightboxIsOpen(false);
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full mb-6">
                    <div className="relative w-full h-96 md:h-96 lg:h-128 cursor-pointer" onClick={openModal} title="cliquer pour agrandir">
                        <Image
                            src={API_URL + imagesData[currentImage]?.path ?? ""}
                            alt={imagesData[currentImage].name}
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
                            style={{ objectFit: "cover", objectPosition: "top center" }}
                            className="rounded-lg"
                            loading="lazy"
                        />
                        <span className="absolute bottom-0 right-0 px-2 py-1 text-xs font-semibold text-white bg-gray-900 rounded-bl-lg">
                            {currentImage + 1} / {imagesData.length}
                        </span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-300">Cliquer sur l&apos;image pour l&apos;agrandir</span>
                    <div className="flex items-center justify-between w-full mt-4">
                        <button
                            className="flex items-center justify-center w-10 h-10 text-gray-100 bg-amber-700 rounded-full focus:outline-none hover:bg-amber-600"
                            onClick={handlePrev}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                        </button>
                        <div className="flex items-center justify-center">
                            {imagesData.map((image, index) => (
                                <button
                                    key={index}
                                    className={`${index === currentImage
                                        ? "border border-amber-700 md:border-2"
                                        : "border border-gray-600 md:border-2"
                                        } w-10 h-10 mx-1 focus:outline-none md:w-16 md:h-16`}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <Image
                                        src={API_URL + image.path}
                                        alt={image.name}
                                        width={15}
                                        height={15}
                                        style={{ objectFit: "cover", objectPosition: "center", width: "auto", height: "auto" }}
                                        className="m-auto"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                        <button
                            className="flex items-center justify-center w-10 h-10 text-gray-100 bg-amber-700 rounded-full focus:outline-none hover:bg-amber-600"
                            onClick={handleNext}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Lightbox
                isOpen={lightboxIsOpen}
                images={imagesData.map((image) => ({
                    src: API_URL + image.path,
                    alt: image.alt,
                }))}
                currentImage={currentImage}
                onClose={handleClose}
                onPrev={handlePrev}
                onNext={handleNext}
            />
            <Modal isVisible={isModalOpen} closeModal={() => setIsModalOpen(false)}>

                <div className="flex items-center justify-center w-full mt-4">
                    {currentImage === 0 ? null : (
                        <button
                            onClick={handlePrev}
                            className="text-gray-100 font-bold text-sm focus:outline-none mr-2 bg-amber-700 rounded-full w-8 h-8 flex items-center justify-center"
                            title="Image précédente"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    )}
                    <div className="flex flex-col align-center justify-center my-4">
                        <Image
                            src={API_URL + imagesData[currentImage].path}
                            alt={imagesData[currentImage].name}
                            fill={false}
                            style={{ objectFit: "cover", objectPosition: "top center", width: "auto", height: "auto" }}
                            width={1000}
                            height={700}
                            loading="lazy"
                        />
                        <span className="bottom-0 left-0 px-2 py-1 text-xs font-semibold text-white bg-gray-900 rounded-bl-lg w-12">
                            {currentImage + 1} / {imagesData.length}
                        </span>
                    </div>
                    {currentImage === imagesData.length - 1 ? null : (
                        <button
                            onClick={handleNext}
                            className="text-gray-100 font-bold text-sm focus:outline-none ml-2 bg-amber-700 rounded-full w-8 h-8 flex items-center justify-center"
                            title="Image suivante"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    )}
                </div>
            </Modal>
        </div>

    );
};

export default Carousel;