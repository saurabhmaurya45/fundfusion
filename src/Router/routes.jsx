import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import AllCampaigns from "../pages/AllCampaigns";
import YourCampaign from "../pages/YourCampaign";
import Profile from "../pages/Profile";
import CreateCampaign from "../pages/CreateCampaign";
import SingleCampaignPage from "../pages/SingleCampaingPage"
import RegistrationPage from "../pages/authenticate/RegistrationPage";
import LoginPage from "../pages/authenticate/LoginPage";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Home from "../pages/Home";
import Main from "../pages/Main";
import ErrorPage from "../pages/errorpage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement : <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/main',
                element: <Main />,
                children: [
                    {
                        path: "/main",
                        element: <Dashboard />
                    },
                    {
                        path: "/main/login",
                        element: <PublicRoute element={<LoginPage />} />
                    },
                    {
                        path: "/main/register",
                        element: <PublicRoute element={<RegistrationPage />} />
                    },
                    {
                        path: "/main/all-campaign",
                        element: <AllCampaigns />
                    },
                    {
                        path: "/main/your-campaign",
                        element: <ProtectedRoute element={<YourCampaign />} />
                    },
                    {
                        path: "/main/profile",
                        element: <ProtectedRoute element={<Profile />} />
                    },
                    {
                        path: "/main/create-campaign",
                        element: <ProtectedRoute element={<CreateCampaign />} />
                    },
                    {
                        path: "/main/campaign-details/:id",
                        element: <SingleCampaignPage />
                    },
                ]
            },

        ],
        
    },
    

])

export default routes

