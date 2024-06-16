import {createBrowserRouter} from "react-router-dom";
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


const routes = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"/",
                element: <Dashboard/>
            },
            {
                path:"/login",
                element: <PublicRoute element={<LoginPage/>} />
            },
            {
                path:"/register",
                element: <PublicRoute element={<RegistrationPage/>} />
            },
            {
                path:"/all-campaign",
                element: <AllCampaigns/>
            },
            {
                path:"/your-campaign",
                element: <ProtectedRoute element={<YourCampaign/>} />
            },
            {
                path:"/profile",
                element: <ProtectedRoute element={<Profile/>} />
            },
            {
                path:"/create-campaign",
                element: <ProtectedRoute element={<CreateCampaign/>} />
            },
            {
                path:"/campaign-details/:id",
                element: <SingleCampaignPage/>
            },
            
        ]
    }
])

export default routes

