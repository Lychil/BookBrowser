import { useCallback, useReducer } from "react";
import { fetchBooks as apiFetchBooks } from "@/store/api/booksApi";
import { booksReducer, initialState } from "@/store/reducers/bookReducer";
import type { GoogleBooksAccessType } from "@/common/types/types";

const useBooksReducer = () => {
    const [state, dispatch] = useReducer(booksReducer, initialState);

    const loadMoreBooks = useCallback(async () => {
        if (!state.pagination.hasMore || state.loading) return;

        dispatch({ type: 'LOAD_MORE_BOOKS_REQUEST' });
        try {
            const startIndex = (state.pagination.currentPage + 1) * state.pagination.maxResults;
            const response = await apiFetchBooks(
                state.filters.q,
                state.filters.filter,
                startIndex,
                state.pagination.maxResults
            );

            dispatch({
                type: 'LOAD_MORE_BOOKS_SUCCESS',
                payload: {
                    books: response.items,
                    totalItems: response.totalItems
                }
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_BOOKS_FAILURE',
                payload: error instanceof Error ? error.message : 'Ошибка загрузки книг'
            });
        }
    }, [state]);

    const fetchBooks = useCallback(async (query: string, filter?: GoogleBooksAccessType) => {
        dispatch({ type: 'FETCH_BOOKS_REQUEST' });
        try {
            const response = await apiFetchBooks(
                query,
                filter,
                0,
                state.pagination.maxResults
            );

            dispatch({
                type: 'FETCH_BOOKS_SUCCESS',
                payload: {
                    books: response.items,
                    totalItems: response.totalItems
                }
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_BOOKS_FAILURE',
                payload: error instanceof Error ? error.message : 'Ошибка загрузки'
            });
        }
    }, [state.pagination.maxResults]);

    const setSearchQuery = useCallback((query: string) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    }, []);

    const setFilterType = useCallback((filterType: GoogleBooksAccessType | undefined) => {
        dispatch({ type: 'SET_FILTER_TYPE', payload: filterType });
    }, []);

    return {
        state,
        fetchBooks,
        setSearchQuery,
        setFilterType,
        loadMoreBooks
    };
};

export default useBooksReducer;