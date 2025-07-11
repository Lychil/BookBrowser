import { Link } from "react-router-dom";
import styles from "@/common/components/FavoritesLink/FavoritesLink.module.css"
import markImg from "@/common/img/icons/mark.svg";
import { routes } from "@/router/routes";

export default function FavoritesLink() {
    return (
        <Link className={styles.link} to={routes.favorites}>
            <img src={markImg} alt="Значек закладки" />
        </Link>
    )
}
