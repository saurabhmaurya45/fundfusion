import React from 'react';
import { FaRegCalendarCheck } from "react-icons/fa";
import { LiaGlobeAfricaSolid } from "react-icons/lia";

const DashboardStats = ({statistics}) => {

    return (
        <div className="container items-center bg-[#1C1C24] p-8 rounded-xl">
            <div className="flex flex-wrap pb-3">
                <div className="w-full p-2 lg:w-1/4 md:w-1/2 cursor-pointer">
                    <div
                        className="flex flex-col px-6 py-10 overflow-hidden bg-white text-black hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                        <div className="flex flex-row justify-between items-center">
                            <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd"
                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{statistics?.totalCampaigns}</h1>
                        <div className="flex flex-row justify-between group-hover:text-gray-200">
                            <p>Total Project</p>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/4 md:w-1/2">
                    <div
                        className="flex flex-col px-6 py-10 overflow-hidden bg-white text-black hover:bg-gradient-to-br hover:from-purple-400 hover:via-green-400 hover:to-green-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                        <div className="flex flex-row justify-between items-center">
                            <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clipRule="evenodd" />
                                    <path fillRule="evenodd"
                                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>  
                        </div>
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{statistics?.onGoingCampaigns}</h1>
                        <div className="flex flex-row justify-between group-hover:text-gray-200">
                            <p>Ongoing Project</p>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/4 md:w-1/2">
                    <div
                        className="flex flex-col px-6 py-10 overflow-hidden bg-white text-black hover:bg-gradient-to-br hover:from-purple-400 hover:via-red-400 hover:to-red-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                        <div className="flex flex-row justify-between items-center">
                            <div className="px-4 py-4 bg-gray-300 text-2xl rounded-xl bg-opacity-30">
                                <FaRegCalendarCheck/>
                            </div>
                            
                        </div>
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{statistics?.completedCampaigns}</h1>
                        <div className="flex flex-row justify-between group-hover:text-gray-200">
                            <p>Completed Project</p>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/4 md:w-1/2">
                    <div
                        className="flex flex-col px-6 py-10 overflow-hidden bg-white text-black hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                        <div className="flex flex-row justify-between items-center">
                            <div className="px-4 py-4 bg-gray-300 text-2xl  rounded-xl bg-opacity-30">
                                <LiaGlobeAfricaSolid/>
                            </div>
                            
                        </div>
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">100</h1>
                        <div className="flex flex-row justify-between group-hover:text-gray-200">
                            <p>Total Companies</p>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default DashboardStats;
