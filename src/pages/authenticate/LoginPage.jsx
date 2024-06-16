import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { isValidEmail, showError, showSuccess, formatProfileData } from '../../utils/index'
import { useSelector, useDispatch } from 'react-redux'
import { fetchYourCampaigns, fetchYourStatistics, getProfileData } from '../../Redux/Features/Authenticate/UserProfileService'
import { addProfileData, addStatisticsData, addYourCampaignData } from '../../Redux/Features/Authenticate/UserProfileSlice'



function LoginPage() {
    const dispatch = useDispatch()
    const { profileData, isLoading, error } = useSelector(state => state?.userProfile)
    const { contract, profileContract, address } = useSelector(state => state?.contract)
    const location = useLocation()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRedirectToOrBack = () => {
        navigate(location.state?.from ?? '/', { replace: true })
    }
    const handleFormInput = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleYourData = async () => {
        const yourCampaign = await fetchYourCampaigns(contract, address)
        const yourStatistics = await fetchYourStatistics(contract, address)
        dispatch(addYourCampaignData(yourCampaign))
        dispatch(addStatisticsData(yourStatistics))
        sessionStorage.setItem('yourCampaign', JSON.stringify(yourCampaign))
        sessionStorage.setItem('yourStatistics', JSON.stringify(yourStatistics))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (!userDetails.email || !userDetails.password) {
            showError('All field are required')
            return
        }
        if (!isValidEmail(userDetails.email)) {
            showError("Invalid Email")
            return
        }

        // your login logic here
        try {
            setIsSubmitting(true)
            const res = await getProfileData(profileContract, address)

            if (res && res.owner == "0x0000000000000000000000000000000000000000" && res.personalInfo.email == "") {
                showError("Profile doesn't exist")
                return
            }
            if (res && res.owner !== "0x0000000000000000000000000000000000000000" && res.personalInfo.email !== userDetails.email) {
                showError("Invalid email id ")
                return
            }
            if (res && res.owner !== "0x0000000000000000000000000000000000000000" && res.personalInfo.password !== userDetails.password) {
                showError("Invalid password")
                return
            }
            dispatch(addProfileData(formatProfileData(res)))
            if (res.profileType == 1) {
                await handleYourData()
            }
            sessionStorage.setItem('userProfile', JSON.stringify(formatProfileData(res)))
            handleRedirectToOrBack()
            showSuccess("Login Successfully")
        }
        catch (e) {
            
            showError("Failed to Login, retry")
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="font-[sans-serif] text-[#333]">
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                        <div className="md:max-w-md w-full sm:px-6 py-4">
                            <form onKeyUp={handleFormInput} onSubmit={handleFormSubmit}>
                                <div className="mb-12">
                                    <h3 className="text-3xl font-extrabold">Log in</h3>
                                    <p className="text-sm mt-4 ">Don't have an account <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
                                </div>
                                <div>
                                    <label className="text-xs block mb-2">Email</label>
                                    <div className="relative flex items-center">
                                        <input name="email" type="text" required autoComplete='true' className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter email" />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                            <defs>
                                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                                </clipPath>
                                            </defs>
                                            <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                                <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <label className="text-xs block mb-2">Password</label>
                                    <div className="relative flex items-center">
                                        <input name="password" type="password" required autoComplete='true' className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter password" />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    {isSubmitting ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 animate-spin fill-blue-600 block mx-auto"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                                data-original="#000000" />
                                        </svg>
                                        :
                                        <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                            Log in
                                        </button>}
                                </div>

                            </form>
                        </div>
                        <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
                            <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage