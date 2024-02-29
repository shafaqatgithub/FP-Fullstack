import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home-page/HomePage";
import AboutPage from "./pages/about-page/AboutPage";
import LoginPage from "./pages/login-page/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
]);

export default router;
