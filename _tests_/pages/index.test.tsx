import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from '../../pages/index';

const queryClient = new QueryClient();

beforeEach(() => {
    queryClient.clear(); // on reset le cache de la query pour éviter les conflits entre les tests
});

describe('<Home />', () => {
    it('Should render without crashing', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );
        const home = screen.getByTestId('Home');
        expect(home).toBeInTheDocument();

    });

    it('Should render the title', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );
        const title = screen.getByText('À propos de moi');
        expect(title).toBeInTheDocument();

    });

    it('Should render the search button', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );
        const searchButton = screen.getByText('Rechercher');
        expect(searchButton).toBeInTheDocument();
    });

    it('Should click on a card', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );
        const card = screen.getByTestId('ChildrenCard');
        fireEvent.click(card);
        
        //on a le spinner qui se lance
        const spinner = screen.getByTestId('Spinner');
        expect(spinner).toBeInTheDocument();

        //le texte du spinner est "Chargement..."
        const spinnerText = screen.getByText('Chargement...');
        expect(spinnerText).toBeInTheDocument();
    });

});


