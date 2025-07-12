import { useState, useRef, useEffect } from 'react';
import styles from '@/common/components/SortDropdown/SortDropdown.module.css';
import arrowImg from "@/common/img/icons/arrow-bottom.svg";
import { useBooks } from '@/store/context/BooksContext';
import type { GoogleBooksAccessType } from '@/common/types/types';

type FilterOption = {
    value: GoogleBooksAccessType | 'all';
    label: string;
};

const options: FilterOption[] = [
    { value: 'all', label: 'Без фильтрации' },
    { value: 'ebooks', label: 'Электронные книги' },
    { value: 'free-ebooks', label: 'Бесплатные' },
    { value: 'full', label: 'Полный просмотр' },
    { value: 'paid-ebooks', label: 'Платные' },
    { value: 'partial', label: 'Ограниченный просмотр' },
];

export default function FilterDropdown() {
    const { state, setFilterType, fetchBooks } = useBooks();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt =>
        opt.value === (state.filters.filter || 'all')
    ) || options[0];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: FilterOption) => {
        const filter = option.value === 'all' ? undefined : option.value;
        setFilterType(filter);
        fetchBooks(state.filters.q, filter);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button
                className={styles.dropdownButton}
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {selectedOption.label}
                <img
                    src={arrowImg}
                    style={{
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)'
                    }}
                    alt="Статус выпадающего меню"
                />
            </button>

            {isOpen && (
                <ul className={styles.dropdownList} role="listbox">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={styles.dropdownItem}
                            onClick={() => handleOptionClick(option)}
                            role="option"
                            aria-selected={selectedOption.value === option.value}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}