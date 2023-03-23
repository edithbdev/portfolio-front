import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SearchInput from '../../components/SearchInput/SearchInput';

beforeEach(() => {
    render(<SearchInput setQuery={() => { }} />);
});

describe('<SearchInput />', () => {
    it('should mount', () => {

        const searchInput = screen.getByTestId('SearchInput');

        expect(searchInput).toBeInTheDocument();
    });

    it('should have a placeholder', () => {

        const searchInput = screen.getByPlaceholderText('Rechercher un projet par mot clé');

        expect(searchInput).toBeInTheDocument();
    });

    it('should have a button', () => {

        const searchInput = screen.getByRole('button');

        expect(searchInput).toBeInTheDocument();
    });

    it('should have a form', () => {

        const searchInput = screen.getByRole('form');

        expect(searchInput).toBeInTheDocument();
    });

    it('should have a input', () => {

        const searchInput = screen.getByRole('textbox');

        expect(searchInput).toBeInTheDocument();
    });

    it('should have a input with a value', () => {

        const searchInput = screen.getByRole('textbox');

        expect(searchInput).toHaveValue('');
    });

    //on test le submit du formulaire
    it('should submit the form', () => {
        const button = screen.getByRole('button');
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.blur(input);
        fireEvent.click(button);

        expect(input).toHaveValue('test');
    });
});



