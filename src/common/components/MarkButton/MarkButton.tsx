import MarkIcon from "@/common/components/MarkIcon/MarkIcon";
import { ToastMessagesEnum } from "@/common/types/types";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface MarkButtonProps {
    id: string;
    onToggle?: () => void;
}

export default function MarkButton({ id, onToggle = () => { } }: MarkButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
    }, [id]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const newFavorites = favorites.includes(id)
            ? favorites.filter((favId: string) => favId !== id)
            : [...favorites, id];

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        if (isFavorite) toast.success(ToastMessagesEnum.SUCCESS_DELETE_MARK)
        else toast.success(ToastMessagesEnum.SUCCESS_ADD_MARK)
        setIsFavorite(!isFavorite);
        onToggle();
    };

    return (
        <button type="button" onClick={handleClick}>
            <MarkIcon active={isFavorite} />
        </button>
    );
}