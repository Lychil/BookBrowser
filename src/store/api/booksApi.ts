import type { Book, BookDetails, GoogleBooksAccessType } from '@/common/types/types';
import { transformGoogleBook, transformGoogleBookDetails } from './transformGoogleResponse';

const API_KEY = "AIzaSyCbFKWXOxJ_5dxPSlp1AvOjG2Z-9cniuXA";

export const fetchBooks = async (
    query: string, filter?: GoogleBooksAccessType, startIndex: number = 0, maxResults: number = 10
): Promise<{ items: Book[]; totalItems: number }> => {
    let url = `https://www.googleapis.com/books/v1/volumes?startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`;

    if (filter) {
        url += `&filter=${filter}`;
    }

    if (query) {
        url += `&q=${encodeURIComponent(query)}`;
    } else {
        url += "&q=Harry Potter";
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка загрузки книг');
    const data = await response.json();

    return {
        items: data.items?.map(transformGoogleBook) || [],
        totalItems: data.totalItems || 0
    };
};

export const fetchBookDetails = async (id: string): Promise<BookDetails> => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
    );

    if (!response.ok) throw new Error('Ошибка загрузки книги');
    const data = await response.json();
    return transformGoogleBookDetails(data);
};