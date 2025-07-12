import type { Book, BookDetails, GoogleBooksAccessType } from '@/common/types/types';
import { transformGoogleBook, transformGoogleBookDetails } from './transformGoogleResponse';

const API_KEY = "AIzaSyCbFKWXOxJ_5dxPSlp1AvOjG2Z-9cniuXA";

export const fetchBooks = async (
    query: string,
    filter?: GoogleBooksAccessType
): Promise<Book[]> => {
    let url = `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}`;

    if (query) {
        url += `&q=${encodeURIComponent(query)}`;
    } else {
        url += "&q=Harry Potter";
    }

    if (filter) {
        url += `&filter=${filter}`;
    }

    const response = await fetch(url);

    if (!response.ok) throw new Error('Ошибка загрузки книг');
    const data = await response.json();

    return data.items?.map(transformGoogleBook) || [];
};

export const fetchBookDetails = async (id: string): Promise<BookDetails> => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
    );

    if (!response.ok) throw new Error('Ошибка загрузки книги');
    const data = await response.json();
    return transformGoogleBookDetails(data);
};