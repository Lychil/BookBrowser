import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider
} from "react-router-dom";

export default function RoutesProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Outlet />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="*" element={<></>} />
                </Route>
            </>
        )
    );

    return <RouterProvider router={router} />;
}
