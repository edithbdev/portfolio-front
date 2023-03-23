import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../../components/Card/Card';

// tableau d'objets pour le test
const item = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    }
];

beforeEach(() => {
    jest.resetModules();//on reset les modules ce qui permet de réinitialiser le state de la card
});


describe('<Card />', () => {
    it('Should render without crashing', () => {
        render(
            <Card
                imgUrl='https://picsum.photos/200'
                title='test'
                subtitle='test'
                displayOneList={item}
            />
        );

        // on vérifie que la card est bien présente
        const card = screen.getByTestId('Card');
        // on vérifie que la card est bien présente dans le document html
        expect(card).toBeInTheDocument();
    });

    it('Should render the title', () => {
        render(
            <Card
                imgUrl='https://picsum.photos/200'
                title='test'
                subtitle='test'
                displayOneList={item}
            />
        );

        const card = screen.getByTestId('Card');
        // on vérifie que la card contient bien le titre "test1"
        expect(card).toHaveTextContent('test1');
        expect(card).toHaveTextContent('test2');
        expect(card).toHaveTextContent('test3');
    });

     it('Should be clickable', async () => {
        render(
            <Card
                imgUrl='https://picsum.photos/200'
                title='test'
                subtitle='test'
                displayOneList={item}
            />
        );

        // on récupère le bouton "En savoir plus"
        const button = screen.getByText('En savoir plus');
        // on choisi de click sur la card "test2"
        const card = screen.getByText('test2');
        // on click sur la card "test2"
        fireEvent.click(card);

        // on attend que la card soit bien chargée et que le titre soit bien "test2"
        await waitFor(() => {
            expect(card).toHaveTextContent('test2');      
        });

        //on click sur le bouton "En savoir plus"
        fireEvent.click(button);
      
    });
});