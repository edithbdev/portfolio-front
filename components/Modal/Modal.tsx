import React from 'react';

type Props = {
    isVisible: boolean;
    children: React.ReactNode;
    closeModal: () => void;
};

const Modal = ({ isVisible, closeModal, children }: Props) => {

    if (!isVisible) {
        return null;
    }

    const handleClose = (e: Event | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target instanceof HTMLElement) {
            if (e.target.id === 'close-modal') {
                closeModal();
            }
            return;
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm mt-20 md:mt-3" id="close-modal" onClick={handleClose}>
            <div className='w-[500px] h-[auto] flex flex-col mx-2 md:w-[800px] md:h-[800px]'>
                <button className="text-white text-2xl font-bold place-self-end mr-5 mt-6 md:mt-4" onClick={closeModal}>
                    X
                </button>
                <div className="bg-white px-6 pt-3 rounded-lg shadow-lg flex flex-col" style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-5">{children}</h1>
                </div>
            </div>
        </div>
    );
};

export default Modal;
