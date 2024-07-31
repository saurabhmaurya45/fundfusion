import React from 'react'
import { useSelector } from 'react-redux';
import { FaRegCalendarCheck } from "react-icons/fa";
import { LiaGlobeAfricaSolid } from "react-icons/lia";

const ProfileStats = () => {
    const statistics = useSelector(state => state.userProfile.statistics)
    
    return (
        <div className='profile-stats w-full h-auto p-4 bg-[#1C1C24] rounded-lg'>
            <h3 className='font-semibold text-normal'>Project Status</h3>
            <div className='stats flex w-full gap-4 my-4'>
                <div className='w-1/3 cursor-pointer bg-white text-[#4b4a4a] hover:text-white h-20 rounded-lg p-2 px-4 flex items-center justify-between hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 shadow-lg duration-300 hover:shadow-2xl group'>
                    <div>
                        <h3 className=''>Total Projects</h3>
                        <h1 className='text-4xl font-bold'>{statistics?.totalCampaigns ?? 0}</h1>
                    </div>
                    <div className='bg-gray-300 bg-opacity-30 w-14 h-14 rounded-xl flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                             />
                        </svg>
                    </div>
                </div>
                <div className='w-1/3 cursor-pointer bg-white text-[#4b4a4a] hover:text-white h-20 rounded-lg p-2 px-4 flex items-center justify-between hover:bg-gradient-to-br hover:from-purple-400 hover:via-green-400 hover:to-green-500 shadow-lg duration-300 hover:shadow-2xl group'>
                    <div>
                        <h3 className=''>Ongoing Projects</h3>
                        <h1 className='text-4xl font-bold'>{statistics?.onGoingCampaigns ?? 0}</h1>
                    </div>
                    <div className='text-2xl bg-gray-300 bg-opacity-30 w-14 h-14 rounded-xl flex justify-center items-center'>
                        <FaRegCalendarCheck />
                    </div>
                </div>
                <div className='w-1/3 cursor-pointer bg-white text-[#4b4a4a] hover:text-white h-20 rounded-lg p-2 px-4 flex items-center justify-between hover:bg-gradient-to-br hover:from-purple-400 hover:via-red-400 hover:to-red-500 shadow-lg duration-300 hover:shadow-2xl group'>
                    <div>
                        <h3 className=''>Completed Projects</h3>
                        <h1 className='text-4xl font-bold'>{statistics?.completedCampaigns ?? 0}</h1>
                    </div>
                    <div className='text-3xl bg-gray-300 bg-opacity-30 w-14 h-14 rounded-xl flex justify-center items-center'>
                        <LiaGlobeAfricaSolid />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileStats