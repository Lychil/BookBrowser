import { useCallback, useEffect, useState } from 'react';
import type { Book } from '@/common/types/types';
import { fetchFavoriteBooks } from '@/store/api/booksApi';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFavorites = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const favoritesIds = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            ) as string[];
            if (favoritesIds.length === 0) {
                setFavorites([]);
                return;
            }

            const books = await fetchFavoriteBooks(favoritesIds);
            setFavorites(books);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка загрузки избранного');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const remove = useCallback((id: string) => {
        setFavorites(prev => prev.filter(book => book.id !== id));

        const updatedIds = JSON.parse(localStorage.getItem('favorites') || '[]')
            .filter((favId: string) => favId !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedIds));
    }, []);

    const refetch = useCallback(async () => {
        await fetchFavorites();
    }, [fetchFavorites]);

    return {
        favorites,
        loading,
        error,
        refetch,
        remove
    };
};