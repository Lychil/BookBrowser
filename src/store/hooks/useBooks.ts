import type { BooksState, BooksAction, Book } from "@/common/types/types";
import { useReducer } from "react";
import { fetchBooks as apiFetchBooks } from "@/store/api/booksApi";

const initialState: BooksState = {
    books: [],
    loading: false,
    error: null
};

const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return { ...state, loading: true, error: null };

        case 'FETCH_BOOKS_SUCCESS':
            return { ...state, loading: false, books: action.payload };

        case 'FETCH_BOOKS_FAILURE':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

const useBooksReducer = () => {
    const [state, dispatch] = useReducer(booksReducer, initialState);

    const fetchBooks = async (query: string = "Harry Poter") => {
        dispatch({ type: 'FETCH_BOOKS_REQUEST' });
        try {
            const books: Book[] = await apiFetchBooks(query);
            dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: books });
        } catch (error) {
            dispatch({ type: 'FETCH_BOOKS_FAILURE', payload: 'Ошибка загрузки' });
        }
    };

    return {
        state,
        fetchBooks
    };
};

export default useBooksReducer;
