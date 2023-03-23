import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchProjects } from '../../utils/fetchFunctions';
import mockFetch from 'jest-fetch-mock';
import { Projects } from '../../utils/types';
import Error500 from '../../pages/500';
import Error404 from '../../pages/404';

beforeEach(() => {
    jest.resetModules();
});

describe('fetchProjects', () => {
    it('Should fetch the projects', async () => {
        const projects: Projects = {
            results: [
                {
                    id: 1,
                    name: 'test',
                    slug: 'test',
                    status: 'en ligne',
                    lastUpdate: '2021-01-01',
                    year: '2021',
                    description: 'test',
                    imageName: 'test',
                    imageFile: 'test',
                    projectLink: 'https://test.fr',
                    githubLink: 'https://github.com',
                    frontendLanguages: [],
                    backendLanguages: [],
                    tools: [],
                    images: [],
                },
            ]
        };

        mockFetch.enableMocks();

        mockFetch.mockResponseOnce(JSON.stringify({ data: projects }));

        const response = await fetchProjects('test');

        expect(response).toEqual({ data: projects });

        expect(fetch).toHaveBeenCalledTimes(1);

        mockFetch.disableMocks();

    });

    it('Should fetch the projects with no data', async () => {
        mockFetch.enableMocks();

        mockFetch.mockResponseOnce(JSON.stringify({ data: [] }));

        const response = await fetchProjects('test');

        expect(response).toEqual({ data: [] });

        const { getByText } = render(<Error404 />);
        const linkElement = getByText(/Page introuvable/i);
        expect(linkElement).toBeInTheDocument();

        expect(fetch).toHaveBeenCalledTimes(1);

        mockFetch.disableMocks();

    });

    it('Should fetch the projects with error 500', async () => {

        mockFetch.enableMocks();

        mockFetch.mockResponseOnce(JSON.stringify({ response: { status: 500 } }));

        mockFetch.mockRejectOnce(new Error('Erreur interne du serveur'));

        const response = await fetchProjects('test');

        expect(response).toEqual({ response: { status: 500 } });

        const { getByText } = render(<Error500 />);
        const linkElement = getByText(/Erreur interne du serveur/i);
        expect(linkElement).toBeInTheDocument();

        expect(fetch).toHaveBeenCalledTimes(1);

        mockFetch.disableMocks();
    });
});