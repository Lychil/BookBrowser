import { useState, useRef, useEffect } from 'react';
import styles from '@/common/components/SortDropdown/SortDropdown.module.css';
import arrowImg from "@/common/img/icons/arrow-bottom.svg";

type FilterOption = {
    value: string;
    label: string;
};

const options: FilterOption[] = [
    { value: 'e-books', label: 'электронные книги' },
    { value: 'free-e-books', label: 'бесплатные электронные книги' },
    { value: 'full-view', label: 'полный просмотр' },
    { value: 'paid-e-books', label: 'платные электронные книги' },
    { value: 'limited-view', label: 'ограниченный просмотр' },
];

export default function FilterDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<FilterOption | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: FilterOption) => {
        setSelectedOption(option);
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
                {selectedOption ? selectedOption.label : 'Сортировать по'}
                <img
                    src={arrowImg}
                    style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)' }}
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
                            aria-selected={selectedOption?.value === option.value}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};