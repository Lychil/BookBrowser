import BackHome from "@/common/components/BackHome/BackHome";
import FavoritesBooks from "@/common/components/FavoritesBooks/FavoritesBooks";
import styles from "@/pages/Favorites/Favorites.module.css";

export default function Favorites() {
    return (
        <div className={styles.favorites__wrapper}>
            <div style={{ marginBottom: "20px" }}>
                <BackHome />
            </div>
            <FavoritesBooks />
        </div>
    )
}
