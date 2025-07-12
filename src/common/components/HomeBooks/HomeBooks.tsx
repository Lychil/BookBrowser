import styles from "@/common/components/HomeBooks/HomeBooks.module.css";
import { useBooks } from "@/store/context/BooksContext";
import BookCard from "@/common/components/BookCard/BookCard";
import { useRef } from "react";
import useInfiniteScroll from "@/common/hooks/useInfiniteScroll";

export default function HomeBooks() {
    const { state, loadMoreBooks } = useBooks();
    const containerRef = useRef<HTMLDivElement>(null);

    const { triggerRef } = useInfiniteScroll({
        onLoadMore: loadMoreBooks,
        hasMore: state.pagination.hasMore,
        loading: state.loading,
        threshold: 200
    });

    if (state.loading && state.books.length === 0)
        return <div>Загрузка...</div>
    if (state.error)
        return <div className={styles.error}>Ошибка: {state.error}</div>
    if (state.filteredBooks.length === 0 && !state.loading)
        return <div>Книги не найдены. Попробуйте изменить параметры поиска.</div>;

    return (
        <div className={styles.home__books} ref={containerRef}>
            {state.filteredBooks.map(book => (
                <BookCard key={`${book.id}-${Math.random().toString(36)}`} {...book} />
            ))}
            {state.loading && state.books.length > 0 && <div>Загрузка...</div>}
            <div ref={triggerRef} />
        </div>
    );
}