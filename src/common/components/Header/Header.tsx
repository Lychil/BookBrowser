import shared from "@/common/styles/shared.module.css";
import styles from "@/common/components/Header/Header.module.css";
import Logo from "@/common/components/Logo/Logo";
import FavoritesLink from "@/common/components/FavoritesLink/FavoritesLink";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`${shared.container} ${styles.headerContent}`}>
                <Logo />
                <FavoritesLink />
            </div>
        </header>
    )
}
