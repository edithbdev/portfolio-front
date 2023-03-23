// Types de l'app
export type Project = {
    id: number;
    name: string;
    slug: string;
    status: string;
    lastUpdate: string;
    year: string;
    description: string;
    imageName: string;
    imageFile: string;
    projectLink?: string;
    githubLink?: string;
    frontendLanguages?: FrontendLanguages[];
    backendLanguages?: BackendLanguages[];
    tools?: Tools[];
    images?: Images[];
};

export type Projects = {
    results: Project[];
};

export type FrontendLanguages = {
    id: number;
    name: string;
};

export type BackendLanguages = {
    id: number;
    name: string;
};

export type Tools = {
    id: number;
    name: string;
    description: string;
}

export type Images = {
    id: number;
    name: string;
    path: string;
};

export type ContactForm = {
    name: string;
    email: string;
    subject: string;
    message: string;
    emailCopy: string;
};
