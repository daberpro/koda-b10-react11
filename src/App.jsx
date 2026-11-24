import { createBrowserRouter } from "react-router";
import MainPage from "./pages/MainPage";
import { RouterProvider } from "react-router/dom";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/detail",
        element: <DetailPage />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
