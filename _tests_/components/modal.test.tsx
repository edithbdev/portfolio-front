import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Modal from '../../components/Modal/Modal';

describe('<Modal />', () => {
    it('Should render without crashing', () => {
        render(
        <Modal isVisible={true} closeModal={() => {}} >
            <div>test</div>
        </Modal>
        );

        const modal = screen.getByTestId('Modal');
        expect(modal).toBeInTheDocument();
    });

    it('Should render the title', () => {
        render(
        <Modal isVisible={true} closeModal={() => {}} >
            <div>test</div>
        </Modal>
        );

        const title = screen.getByText('test');
        expect(title).toBeInTheDocument();
    });

    it('Should render the close button', () => {
        render(
        <Modal isVisible={true} closeModal={() => {}} >
            <div>test</div>
        </Modal>
        );

        const closeButton = screen.getByText('X');
        expect(closeButton).toBeInTheDocument();
    });
});
       

