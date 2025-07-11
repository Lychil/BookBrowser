import Layout from "@/common/components/Layout/Layout";
import { Book } from "@/pages/Book/Book";
import Favorites from "@/pages/Favorites/Favorites";
import Home from "@/pages/Home/Home";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider
} from "react-router-dom";

const book = { publishDate: "2024-04-10", pageCount: 350, coverUrl: "", title: "1984 Ешенавп вапавпав", author: "Jeorge Oruell", description: "gdfgj fhkjfdg fdghdfkg dfgjdf hgkfdgh d hfdjkgh hdfdjgh dkfjgh dfkjg hdfjghfd khgjkd gdg hdkfdgh khfdkgh dgkdfg kdhfdk dkdfgdhkghdf hdfghdfgkd dhfgkfdg dkfhg d" };

export default function RoutesProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="book/:bookId" element={<Book {...book} />} />
                    <Route path="*" element={<></>} />
                </Route>
            </>
        )
    );

    return <RouterProvider router={router} />;
}
