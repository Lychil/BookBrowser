import { Link } from 'react-router-dom';
import { routes } from '@/router/routes';
import styles from "@/common/components/BackHome/BackHome.module.css";

export default function BackHome() {
    return (
        <Link className={styles.backHome} to={routes.home}>
            Вернуться на главную
        </Link>
    )
}
