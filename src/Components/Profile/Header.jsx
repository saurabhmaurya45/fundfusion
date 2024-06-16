import React from 'react'
import { useSelector } from 'react-redux';

const Header = ({profileTabs,setProfileTabs}) => {
  const {profileData} = useSelector(state=>state.userProfile)
  const {name, occupation,profilePicture, profileBanner} = profileData?.personalInfo

  const handleTabs= (e)=>{
    const updatedTabs = profileTabs.map((item)=>{
      if(item.id == e.target.id){
        return {...item, status: true}
      }
      return {...item, status: false}
    })
    setProfileTabs(updatedTabs)
  }
  
  return (
    <div className='header relative  bg-secondary w-full h-96 rounded-xl p-4'>
      <div className='relative flex flex-col items-center h-80'>
        <div className='banner w-full h-40 rounded-lg my-2'>
          {profileBanner ? <img className='w-full h-40 rounded-lg' src={ profileBanner} alt='profile-banner' />:
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1113 161" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_697_201879)">
              <rect x="1" width="1112" height="348" fill="#B2E7FE"></rect>
              <rect width="185.209" height="704.432" transform="matrix(0.50392 0.86375 -0.860909 0.508759 435.452 -177.87)" fill="#FF8F5D"></rect>
              <rect width="184.653" height="378.667" transform="matrix(0.849839 -0.527043 0.522157 0.852849 -10.4556 -16.4521)" fill="#3ECEED"></rect>
              <rect width="184.653" height="189.175" transform="matrix(0.849839 -0.527043 0.522157 0.852849 35.4456 58.5195)" fill="#4C48FF"></rect>
            </g>
            <defs>
              <clipPath id="clip0_697_201879">
                <rect x="0.5" width="1112" height="161" rx="12" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>}
        </div>
        <div className='profile-pic w-32 h-32 rounded-full absolute top-[4rem] border-[4px] border-white'>
          <img className='rounded-full  ' src={profilePicture ? profilePicture: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'} />
        </div>
        <h2 className='mt-4 font-semibold text-xl'>{profileData?.companyInfo?.companyName?profileData?.companyInfo?.companyName : name}</h2>
        <p className='text-sm'>{profileData?.companyInfo?.industry? profileData?.companyInfo?.industry : occupation}</p>
      </div>
      <ul className='flex gap-6' onClick={handleTabs}>
        {
          profileTabs?.map((item)=>{
              return (
                item.show && <li key={item.id} id={item.id} className={'flex gap-2 text-sm h-12 items-center cursor-pointer '+ (item.status && " border-b-2 border-[#22C55E] ")}><span className='text-lg font-semibold'>{item.icon}</span>{item.name}</li>
              )
          })
        }
      </ul>
    </div>
  )
}

export default Header