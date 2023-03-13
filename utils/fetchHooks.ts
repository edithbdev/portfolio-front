// useInfiniteQuery hook est utilisé pour récupérer les données de l'API et les mettre dans le cache de React Query
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchProjects } from "./fetchFunctions";

export const useFetchProjects = (search: string) => {
  return useInfiniteQuery(['projects', search], () => fetchProjects(search), {
    //OPTIONS
    // refetchOnWindowFocus permet de refetch les données quand on change de page
    refetchOnWindowFocus: false,
    // staleTime permet de définir le temps avant de refetch les données
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5, // 5 minutes
    // retry permet de définir le nombre de rafrachissement de la page avant d'afficher une erreur
    retry: 2,
    retryDelay: 1000, // 1 second
    // onError permet de définir une fonction qui sera exécutée en cas d'erreur
    onError: (error) => {
      console.log("error", error);
    }
  });
};