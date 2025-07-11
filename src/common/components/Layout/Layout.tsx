import { Outlet } from "react-router-dom";
import Header from "@/common/components/Header/Header";
import shared from "@/common/styles/shared.module.css";

export default function Layout() {
    return (
        <>
            <Header />
            <main className={shared.container}>
                <Outlet />
            </main>
        </>
    )
}
