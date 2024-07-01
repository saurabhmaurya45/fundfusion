import { useEffect } from "react";
import { useAddress, useMetamask, useContract } from "@thirdweb-dev/react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "./Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "./Redux/Features/Category/CategoryService";
import { setContract, setAddress, setProfileContract } from './Redux/Features/Contract/ContractSlice';
import { addProfileData, addYourCampaignData, addStatisticsData } from "./Redux/Features/Authenticate/UserProfileSlice";
import { showError } from "./utils";
import Home from "./pages/Home";


function App() {
  const { contract, isLoading: IsContractLoading } = useContract(import.meta.env.VITE_CONTRACT_ADDRESS_CROWDFINDING);
  const { contract: profileContract, isLoading: isProfileContractLoading } = useContract(import.meta.env.VITE_CONTRACT_ADDRESS_PROFILE);
  const address = useAddress()
  const connectWithMetamask = useMetamask();
  const dispatch = useDispatch()
  const userDataFromSession = JSON.parse(sessionStorage.getItem("userProfile"))
  const { isAccountActive } = useSelector(state => state.userProfile)
  // const location = useLocation()
  // const [initialAddress, setInitialAddress] = useState(address);



  // useEffect(() => {
  //   if (address && initialAddress && address !== initialAddress) {
  //     // Address has changed, log out the user
  //     dispatch(resetProfile());
  //     sessionStorage.removeItem("userProfile");
  //     navigate('/login');
  //   } else {
  //     setInitialAddress(address);
  //   }
  // }, [address]);

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
  // console.log(location);
  // console.log(import.meta.env.VITE_CONTRACT_ADDRESS_CROWDFINDING);
  // console.log(import.meta.env.VITE_CONTRACT_ADDRESS_PROFILE);
  // console.log(address,contract,profileContract);
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
