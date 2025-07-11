import Layout from "@/common/components/Layout/Layout";
import Book from "@/pages/Book/Book";
import Favorites from "@/pages/Favorites/Favorites";
import Home from "@/pages/Home/Home";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider
} from "react-router-dom";

export default function RoutesProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="book/:bookId" element={<Book />} />
                    <Route path="*" element={<></>} />
                </Route>
            </>
        )
    );

    return <RouterProvider router={router} />;
}
