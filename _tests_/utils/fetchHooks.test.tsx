import React from 'react';
import { renderHook } from '@testing-library/react'
import { useFetchProjects } from '../../utils/fetchHooks';
import { fetchProjects } from '../../utils/fetchFunctions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// On crée un client de requête pour le hook
const queryClient = new QueryClient()

// Mock pour la fonction fetchProjects du fichier fetchFunctions.tsx
// pour éviter les appels réels à l'API
jest.mock('../../utils/fetchFunctions')

test('useFetchProjects', async () => {
    const { result } = renderHook(() => useFetchProjects(''), {
        wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
    })

    await result.current.fetchNextPage()
    
    //on vérifie que le hook renvoie bien un objet avec les propriétés suivantes
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('fetchNextPage');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isFetching');
    expect(result.current).toHaveProperty('error');

    //on vérifie que la fonction fetchProjects est bien appelée
    expect(fetchProjects).toHaveBeenCalled();
})

test('useFetchProjects with query', async () => {
    const { result } = renderHook(() => useFetchProjects('test'), {
        wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
    })

    await result.current.fetchNextPage()
    
    //on vérifie que le hook renvoie bien un objet avec les propriétés suivantes
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('fetchNextPage');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('isFetching');
    expect(result.current).toHaveProperty('error');

    //on vérifie que la fonction fetchProjects est bien appelée avec le bon paramètre
    expect(fetchProjects).toHaveBeenCalledWith('test');
})