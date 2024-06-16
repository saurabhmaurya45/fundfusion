import { useEffect, useState } from "react";
import { useAddress, useMetamask, useContract } from "@thirdweb-dev/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, Sidebar } from "./Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "./Redux/Features/Category/CategoryService";
import { setContract, setAddress, setProfileContract } from './Redux/Features/Contract/ContractSlice';
import { addProfileData,addYourCampaignData,addStatisticsData,resetProfile } from "./Redux/Features/Authenticate/UserProfileSlice";
import { showError } from "./utils";


function App() {
  const navigate = useNavigate()
  const { contract, isLoading: IsContractLoading } = useContract(import.meta.env.VITE_CONTRACT_ADDRESS_CROWDFINDING);
  const { contract: profileContract, isLoading: isProfileContractLoading } = useContract(import.meta.env.VITE_CONTRACT_ADDRESS_PROFILE);
  const address = useAddress()
  const connectWithMetamask = useMetamask();
  const dispatch = useDispatch()
  const userDataFromSession = JSON.parse(sessionStorage.getItem("userProfile"))
  const { isAccountActive } = useSelector(state => state.userProfile)
  const location = useLocation()
  const [initialAddress, setInitialAddress] = useState(address);

  

  useEffect(() => {
    if (address && initialAddress && address !== initialAddress) {
      // Address has changed, log out the user
      dispatch(resetProfile());
      sessionStorage.removeItem("userProfile");
      navigate('/login');
    } else {
      setInitialAddress(address);
    }
  }, [address]);

  useEffect(() => {
    connectWithMetamask().then(async (res) => {
      dispatch(setContract(contract))
      dispatch(setProfileContract(profileContract))
      dispatch(setAddress(address))
      dispatch(getCategory(contract))
      if (userDataFromSession) {
        dispatch(addProfileData(userDataFromSession))
        const yourCampaign = JSON.parse(sessionStorage.getItem("yourCampaign"))
        const yourStatistics = JSON.parse(sessionStorage.getItem("yourStatistics"))
        dispatch(addYourCampaignData(yourCampaign))
        dispatch(addStatisticsData(yourStatistics))
      }
    });
  }, [IsContractLoading, address, isProfileContractLoading])

  

  if (isAccountActive === "Inactive") {
    showError("Your account is inactive")
  }

  
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
        {!(location.pathname == "/login" || location.pathname == "/register") && <div className="sidebar text-white bg-[#1c1c24] shadow-lg rounded-3xl  w-[20%] h-[calc(100vh-5rem)]  sticky top-20">
          <Sidebar />
        </div>}
        <div className={"outlet px-2 pl-5 py-1 " + (!(location.pathname == "/login" || location.pathname == "/register") ? "w-[80%]" : "w-full bg-white")}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
