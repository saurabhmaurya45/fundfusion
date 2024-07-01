import React, { useEffect, useState } from 'react'
import SidebarList from './SidebarList'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  profile, logout, dashboard,
  createCampaign

} from '../assets'
import { useDispatch } from 'react-redux'
import { resetProfile } from '../Redux/Features/Authenticate/UserProfileSlice'
import { useDisconnect } from '@thirdweb-dev/react'

const companySpecificUrl = [3]
const userSpecificUrl = [4]

const sidebarData = [
  {
    id: 1,
    icon: dashboard,
    name: "Dashboard",
    status: true,
    url: "/main",
    show: true
  },
  {
    id: 2,
    icon: createCampaign,
    name: "All Projects",
    status: false,
    url: "/main/all-campaign",
    show: true
  },
  {
    id: 3,
    icon: createCampaign,
    name: "My Projects",
    status: false,
    url: "/main/your-campaign",
    show: true
  },
  {
    id: 4,
    icon: profile,
    name: "Profile",
    status: false,
    url: "/main/profile",
    show: true
  },

]

const SidebarLeft = () => {
  const { contract, address } = useSelector(state => state.contract)
  const { profileData } = useSelector(state => state.userProfile)
  const [sidebar, setSidebar] = useState(sidebarData);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const disconnect = useDisconnect()

  const logoutHandler = async () => {
    dispatch(resetProfile())
    sessionStorage.removeItem("userProfile")
    sessionStorage.removeItem("yourCampaign")
    sessionStorage.removeItem("yourStatistics")
    navigate('/')
    manageSidebarVisibility()
    await disconnect()
  }

  const activeUrlHandler = (e) => {
    const updatedSidebar = sidebar.map((item) => {
      if (item.name === e.target.textContent) {
        return { ...item, status: true }
      }
      return { ...item, status: false }
    })
    setSidebar(updatedSidebar)
  }

  const manageSidebarVisibility = () => {
    const updatedSidebar = sidebarData.map((item) => {
      if (profileData && profileData.owner) {
        if (profileData.profileType != 1 && companySpecificUrl.includes(item.id)) {
          return { ...item, show: false }
        }
        else {
          return item
        }
      }
      else {
        if (userSpecificUrl.includes(item.id) || companySpecificUrl.includes(item.id)) {
          return { ...item, show: false }
        }
        else {
          return item
        }
      }
    })
    setSidebar(updatedSidebar)
  }

  useEffect(() => {
    manageSidebarVisibility()
  }, [profileData,contract,address])

  return (
    <div className='sidebar-container'>
      <ul>
        {
          sidebar?.map((item) => item.show && <Link to={item.url} onClick={activeUrlHandler} key={item.id}><SidebarList item={item} /></Link>)
        }
      </ul>

      {profileData && profileData?.owner && <button onClick={logoutHandler} className={'w-full  h-[32px] flex items-center gap-4 my-[30px] text-sm pl-[32px]  text-[#88C2BB] absolute bottom-0'}>
        <img src={logout} className='w-5 h-5' />
        <p>Log out</p>
      </button>}


    </div>
  )
}

export default SidebarLeft