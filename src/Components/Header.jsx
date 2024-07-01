import { ConnectWallet, useWallet } from "@thirdweb-dev/react"
import { logo } from "../assets"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const wallet = useWallet();
    const { profileData, isAccountActive } = useSelector(state => state.userProfile)


    return (

        <header className='bg-black w-full h-auto fixed top-0 shadow-lg p-2 px-8 flex justify-between items-center z-10 '>
            <Link to='/'>
                <div className='logo  rounded-xl ml-2 px-4 flex items-center'>
                    <img src={logo} className='w-full h-14' alt='logo' />
                </div>
            </Link>
            <div className="wallet flex items-center gap-8">
                {wallet && profileData?.profileType == 1 && isAccountActive == "Active" &&  <Link to="create-campaign" className="p-4 px-8 text-white bg-[#22C55E] rounded-lg text-lg font-semibold">Create Project</Link>}
                <ConnectWallet />
                {profileData && profileData?.owner ?
                    <Link to="/main/profile" className="profile rounded-full bg-[#1c1c24]  ">
                        <img src={profileData?.personalInfo?.profilePicture !='' ? profileData?.personalInfo?.profilePicture : thirdweb} className='w-12 h-12 rounded-full' alt='profile' />
                    </Link>
                    :
                    <Link to = "/login" className="p-4 px-8 text-white bg-[#1C1C24] rounded-lg text-lg font-semibold">Login</Link>
                }
            </div>
        </header>
    )
}

export default Header