import styles from "@/common/components/FavoritesBooks/FavoritesBooks.module.css";
import { useFavorites } from "@/common/hooks/useFavorites";
import BookCard from "@/common/components/BookCard/BookCard";
import { useEffect } from "react";

export default function FavoritesBooks() {
    const { favorites, loading, refetch, error, remove } = useFavorites();

    const handleRemove = (id: string) => {
        remove(id);
    };

    useEffect(() => {
        refetch();
    }, []);

    if (error) return <div>Ошибка загрузки избранного.</div>
    if (loading) return <div >Загрузка...</div>
    if (favorites.length === 0 && !loading) return <div>Вы еще не добавили ни одной книги</div>

    return (
        <div className={styles.favorites__books}>
            {favorites.map(book => (
                <BookCard
                    key={`${book.id}-${Math.random().toString(36)}`}
                    onToggle={() => handleRemove(book.id)}
                    {...book}
                />)
            )}
        </div>
    );
}