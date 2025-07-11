import styles from "@/common/components/SearchInput/SearchInput.module.css";
import searchImg from "@/common/img/icons/search.svg";
import { useBooks } from "@/store/context/BooksContext";
import { useState, useEffect } from "react";
import { useDebounce } from "@/common/hooks/useDebounce";

export default function SearchInput() {
    const { state, setSearchQuery, fetchBooks } = useBooks();
    const [inputValue, setInputValue] = useState(state.filters.q);
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        setSearchQuery(debouncedValue);
        fetchBooks(debouncedValue);
    }, [debouncedValue, setSearchQuery, fetchBooks]);

    return (
        <div className={styles.search__container}>
            <div className={styles.search__wrapper}>
                <img src={searchImg} className={styles.search__icon} alt="Поиск" />
                <input
                    type="text"
                    className={styles.search__input}
                    placeholder="Поиск..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
        </div>
    );
}