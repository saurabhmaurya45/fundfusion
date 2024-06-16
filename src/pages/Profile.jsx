import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ProfileCompanyInfo, ProfileDocuments, ProfileExecutiveInfo, ProfileHeader, ProfilePersonalInfo, ProfileProject } from '../Components';
import { LiaUserCogSolid } from "react-icons/lia";
import { GoProjectRoadmap } from "react-icons/go";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";

const Profile = () => {
  const {profileData} = useSelector(state=>state.userProfile)
  const [profileTabs, setProfileTabs] = useState([
    {
      id: 1,
      name: "Personal Info",
      icon: <LiaUserCogSolid />,
      status: true,
      show:true
    },
    {
      id: 2,
      name: "Statistics",
      icon: <GoProjectRoadmap />,
      status: false,
      show:false
    },
    {
      id: 3,
      name: "Company Info",
      icon: <LiaGlobeAmericasSolid />,
      status: false,
      show:false
    },
    {
      id: 4,
      name: "Executive Info",
      icon: <AiOutlineTeam />,
      status: false,
      show:false
    },
    {
      id: 5,
      name: "Documents",
      icon: <IoDocumentTextOutline />,
      status: false,
      show:false
    },
  ])

  useEffect(()=>{
    const updateTabs = profileTabs.map((item)=>{
      if(profileData && profileData.owner && profileData.profileType == 1 ){
        return {...item, show:true}
      }
      return item
    })
    setProfileTabs(updateTabs)

  },[profileData])

  return (
    <div className='profile '>
      <ProfileHeader profileTabs={profileTabs} setProfileTabs={setProfileTabs} />
      <div className='my-4'>
        {profileTabs[0]?.status && profileTabs[0]?.show &&  <ProfilePersonalInfo profileData={profileData} />}
        {profileTabs[1]?.status && profileTabs[1]?.show && <ProfileProject profileData={profileData}/>}
        {profileTabs[2]?.status && profileTabs[2]?.show && <ProfileCompanyInfo profileData={profileData}/>}
        {profileTabs[3]?.status && profileTabs[3]?.show && <ProfileExecutiveInfo profileData={profileData}/>}
        {profileTabs[4]?.status && profileTabs[4]?.show && <ProfileDocuments profileData={profileData}/>}
      </div>
    </div>
  )
}

export default Profile