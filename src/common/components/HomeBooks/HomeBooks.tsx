import styles from "@/common/components/HomeBooks/HomeBooks.module.css";
import { useBooks } from "@/store/context/BooksContext";
import BookCard from "@/common/components/BookCard/BookCard";

export default function HomeBooks() {
    const { state } = useBooks();

    if (state.loading) return <div>Загрузка...</div>;
    if (state.error) return <div>Ошибка: {state.error}</div>;
    if (state.filteredBooks.length === 0) return <div>Книги не найдены.</div>

    return (
        <div className={styles.home__books}>
            {state.filteredBooks.map(book => (
                <BookCard key={book.id} {...book} />
            ))}
        </div>
    );
}