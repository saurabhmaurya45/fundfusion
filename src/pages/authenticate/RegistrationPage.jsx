import React, { useState } from 'react';
import { Link, useNavigate, useLocation, json } from 'react-router-dom'
import { isPasswordValid, isValidEmail, showError, showSuccess, formatProfileData } from '../../utils/index';
import { CiUser } from 'react-icons/ci';
import { RiContactsBook3Line,RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useContractWrite } from '@thirdweb-dev/react';
import { getProfileData } from '../../Redux/Features/Authenticate/UserProfileService'
import { addProfileData } from '../../Redux/Features/Authenticate/UserProfileSlice'

function RegistrationPage() {
    const dispatch = useDispatch()
    const { contract,profileContract, address } = useSelector(state => state?.contract)
    const { mutateAsync: createProfile } = useContractWrite(profileContract, 'createProfile');
    const { mutateAsync: authorizeUser } = useContractWrite(contract, 'authorizeUser');
    const location = useLocation()
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        userType: '0',
        name: '',
        email: '',
        contactNo: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRedirectToOrBack = () => {
        navigate(location.state?.from ?? '/', { replace: true })
    }

    const handleFormInput = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };

    const registerUser = async () => {
        try {
            const data = await createProfile({
                args: [
                    userDetails.userType,
                    userDetails.name,
                    userDetails.email,
                    userDetails.contactNo,
                    userDetails.password
                ]
            });
            return data;

        } catch (e) {
            return e;
        }
    }

    const authorizeUserFunc = async ()=>{
        try{
            const data = await authorizeUser({args:[address]})
            return data
        }
        catch(e){
            return e
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!userDetails.email || !userDetails.password || !userDetails.name || !userDetails.contactNo) {
            showError('All fields are required');
            return;
        }
        if (!isValidEmail(userDetails.email)) {
            showError('Invalid Email');
            return;
        }
        const validatePassword = isPasswordValid(userDetails.password);
        if (validatePassword && !validatePassword.status) {
            showError(validatePassword.message);
            return;
        }

        // Your registration logic here
        try {
            setIsSubmitting(true)
            await registerUser();
            const res = await getProfileData(profileContract, address)
            const formatedProfile = formatProfileData(res)
            if(formatedProfile.profileType == 1){
                await authorizeUserFunc()
            }
            dispatch(addProfileData(formatedProfile))
            sessionStorage.setItem("userProfile",JSON.stringify(formatedProfile))
            handleRedirectToOrBack()
            showSuccess("Registration successful")
        }
        catch (e) {
            showError("Failed to register, retry")
        }
        finally {
            setIsSubmitting(false)
        }
    };

    return (
        <>
            <div className="font-[sans-serif] text-[#333]">
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                        <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
                            <img
                                src="https://readymadeui.com/signin-image.webp"
                                className="w-full h-full object-contain"
                                alt="login-image"
                            />
                        </div>
                        <div className="md:max-w-md w-full sm:px-6 py-4">
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-8">
                                    <h3 className="text-3xl font-extrabold">Register</h3>
                                    <p className="text-sm mt-4 ">
                                        Have an account{' '}
                                        <Link
                                            to="/login"
                                            className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                                        >
                                            Login{' '}
                                        </Link>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs block mb-2">User Type</label>
                                    <div className="relative flex items-center">
                                        <select
                                            name="userType"
                                            type="text"
                                            className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                            onChange={handleFormInput}
                                        >
                                            <option value="0">User</option>
                                            <option value="1">Company</option>
                                        </select>

                                    </div>
                                </div>
                                <div className="mt-8">
                                    <label className="text-xs block mb-2">Name</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="name"
                                            type="text"
                                            className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                            placeholder="Enter name"
                                            value={userDetails.name}
                                            onChange={handleFormInput}
                                        />
                                        <span className="absolute right-2 text-2xl">
                                            <CiUser />
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <label className="text-xs block mb-2">Email</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                            placeholder="Enter email"
                                            value={userDetails.email}
                                            onChange={handleFormInput}
                                        />
                                        <span className="absolute right-2 text-2xl">
                                            <AiOutlineMail />
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <label className="text-xs block mb-2">Contact No</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="contactNo"
                                            type="text" // Use text for contact number to handle non-numeric characters
                                            className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                            placeholder="Enter contact no"
                                            value={userDetails.contactNo}
                                            onChange={handleFormInput}
                                        />
                                        <span className="absolute right-2 text-2xl"><RiContactsBook3Line /></span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <label className="text-xs block mb-2">Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="password"
                                            type="password"
                                            className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                            placeholder="Enter password"
                                            value={userDetails.password}
                                            onChange={handleFormInput}
                                        />
                                        <span className="absolute right-2 text-2xl">
                                            <RiLockPasswordLine />
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    {isSubmitting ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 animate-spin fill-blue-600 block mx-auto"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                                data-original="#000000" />
                                        </svg>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                        >
                                            Create account
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegistrationPage;
