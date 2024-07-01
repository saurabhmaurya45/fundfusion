import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from '../Components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
    const location = useLocation()

    return (
        <div className="app bg-black min-h-[100vh] text-white">

            <Header />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className="main pt-[5rem] px-10 flex gap-2  relative ">
                {!(location.pathname == "/main/login" || location.pathname == "/main/register") && <div className="sidebar text-white bg-[#1c1c24] shadow-lg rounded-3xl  w-[20%] h-[calc(100vh-5rem)]  sticky top-20">
                    <Sidebar />
                </div>}
                <div className={"outlet px-2 pl-5 py-1 " + (!(location.pathname == "/main/login" || location.pathname == "/main/register") ? "w-[80%]" : "w-full bg-white")}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Main