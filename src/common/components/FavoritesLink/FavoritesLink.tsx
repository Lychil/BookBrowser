import { Link } from "react-router-dom";
import { routes } from "@/router/routes";
import MarkIcon from "@/common/components/MarkIcon/MarkIcon";

export default function FavoritesLink() {
    return (
        <Link to={routes.favorites}>
            <MarkIcon />
        </Link>
    )
}
