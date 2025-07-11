import type { Book, BookDetails } from '@/common/types/types';
import { transformGoogleBook, transformGoogleBookDetails } from './transformGoogleResponse';

const API_KEY = "AIzaSyCbFKWXOxJ_5dxPSlp1AvOjG2Z-9cniuXA";

export const fetchBooks = async (query: string): Promise<Book[]> => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`
    );

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