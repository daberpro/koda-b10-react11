import { createBrowserRouter } from "react-router";
import MainPage from "./pages/MainPage";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
