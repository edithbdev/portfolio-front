import { Projects } from "./types";

export const basicFetch = async <returnType>(endpoint: string): Promise<returnType> => {
    const response = await fetch(endpoint);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    if (!data) throw new Error('Aucune donnée reçue.');
    return data;
}


export const fetchProjects = async (search = ""): Promise<Projects> => {
    return await basicFetch<Projects>(`/api/projects?search=${search}`);
}