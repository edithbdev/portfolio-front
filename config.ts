// Configuration pour l'application front
const MODE_ENV = process.env.NODE_ENV;

let API_URL: string;

if (MODE_ENV === 'production') {
    API_URL = process.env.API_URL_PROD || 'https://backoffice.edithbredon.fr/';
} else {
    API_URL = process.env.API_URL_DEV || 'http://localhost:8000/';
}

const SEARCH_BASE_URL: string = `${API_URL}api/search?search=`;

const PROJECTS_LIST_URL: string = `${API_URL}api/projects`;
const IMAGE_BASE_URL: string = `${API_URL}images/project/`;
const projectUrl = (slug?: string) => `${PROJECTS_LIST_URL}/${slug}`;
const similarProjectsUrl = (slug?: string) => `${PROJECTS_LIST_URL}/${slug}/similar`;

export {
    API_URL,
    SEARCH_BASE_URL,
    PROJECTS_LIST_URL,
    IMAGE_BASE_URL,
    projectUrl,
    similarProjectsUrl,
};
