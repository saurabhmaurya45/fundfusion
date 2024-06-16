import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import FormField from '../FormField';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showSuccess } from '../../utils';
import { formatProfileData } from '../../utils';
import { addProfileData } from '../../Redux/Features/Authenticate/UserProfileSlice';
import { getProfileData } from '../../Redux/Features/Authenticate/UserProfileService';
import { useContractWrite } from '@thirdweb-dev/react';
import { BiLoaderCircle } from "react-icons/bi";
import ProfileDetailTab from "./ProfileDetailTab";
import { checkIfImage,formatToHtml  } from '../../utils';

const PersonalInfo = ({ profileData }) => {
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { profileContract, address } = useSelector(state => state.contract)
    const { mutateAsync: updateProfile } = useContractWrite(profileContract, 'updateProfile');
    const { personalInfo } = profileData
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: personalInfo.name ?? '',
        contactNo: personalInfo.contactNo ?? '',
        alternativeNumber: personalInfo.alternativeNumber ?? '',
        profilePicture: personalInfo.profilePicture ?? '',
        profileBanner: personalInfo.profileBanner ?? '',
        city: personalInfo.city ?? '',
        state: personalInfo.state ?? '',
        country: personalInfo.country ?? '',
        occupation: personalInfo.occupation ?? '',
        aboutUs: personalInfo.aboutUs ?? ''
    })

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const updatePersonalProfile = async () => {
        const res = await updateProfile({
            args: [
                form.name,
                form.contactNo,
                form.alternativeNumber,
                form.profilePicture,
                form.profileBanner,
                form.city,
                form.state,
                form.country,
                form.occupation,
                form.aboutUs
            ]
        })
        return res;
    }

    const handleUpdatePersonalProfile = async () => {
        if (!form.name || !form.contactNo) {
            showError('All field are required')
            return
        }
        let res = await checkIfImage(form.profilePicture)
        if(!res){
            showError("Provide valid image URL")
            setForm({...form, profilePicture:""})
            return
        }
        res = await checkIfImage(form.profileBanner)
        if(!res){
            showError("Provide valid image URL")
            setForm({...form, profileBanner:""})
            return
        }
        try {
            setIsSubmitting(true)
            await updatePersonalProfile()
            const profileData = await getProfileData(profileContract, address)
            dispatch(addProfileData(formatProfileData(profileData)))
            sessionStorage.setItem('userProfile', JSON.stringify(formatProfileData(profileData)))
            setIsSubmitting(false)
            setIsModalOpen(false)
            setForm({
                name: '',
                contactNo: '',
                alternativeNumber: '',
                profilePicture: '',
                profileBanner: '',
                city: '',
                state: '',
                country: '',
                occupation: '',
                aboutUs: ''
            })
            showSuccess("Profile updated successfully")
        }
        catch (e) {
            console.log(e);
            showError("Failed to update profile,try again")
        }
        finally {
            setIsSubmitting(false)
        }

    }

    return (
        <>
            <div className='company-info w-full min-h-20 bg-secondary rounded-lg p-2 relative'>
                <button type="button" className='add-document w-10 h-10 rounded-full bg-green-500 absolute right-0 text-white text-xl font-semibold flex items-center justify-center shadow-2xl' onClick={handleToggleModal}><FaRegEdit /></button>
                <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
                    <ProfileDetailTab title="Name" description={personalInfo.name} />
                    <ProfileDetailTab title="Email" description={personalInfo.email} />
                </div>
                <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
                    <ProfileDetailTab title="About Us" description={formatToHtml(personalInfo.aboutUs)} isTextArea={true}  />
                </div>
                <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
                    <ProfileDetailTab title="Contact Numner" description={personalInfo.contactNo} />
                    <ProfileDetailTab title="Alternative Number" description={personalInfo.alternativeNumber} />
                </div>
                <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
                    <ProfileDetailTab title="City" description={personalInfo.city} />
                    <ProfileDetailTab title="State" description={personalInfo.state} />
                </div>
                <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
                    <ProfileDetailTab title="Country" description={personalInfo.country} />
                    <ProfileDetailTab title="Occupation" description={personalInfo.occupation} />
                </div>
                
            </div>

            <div className="relative z-10">
                {isModalOpen && (
                    <div
                        aria-labelledby="add-executive"
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 z-10 w-screen overflow-y-auto"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-secondary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-secondary text-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className='mb-4 text-lg'>Update Personal Details</h3>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName=" Name *"
                                            placeholder="Name"
                                            inputType="text"
                                            value={form.name}
                                            handleChange={(e) => handleFormFieldChange('name', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="Contact Number *"
                                            placeholder="0000000000"
                                            inputType="text"
                                            value={form.contactNo}
                                            handleChange={(e) => handleFormFieldChange('contactNo', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="Alternative Number *"
                                            placeholder="000000000"
                                            inputType="text"
                                            value={form.alternativeNumber}
                                            handleChange={(e) => handleFormFieldChange('alternativeNumber', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="Profile Picture *"
                                            placeholder="https://www.abc.com"
                                            inputType="text"
                                            value={form.profilePicture}
                                            handleChange={(e) => handleFormFieldChange('profilePicture', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="Profile Banner*"
                                            placeholder="https://www.abc.com"
                                            inputType="text"
                                            value={form.profileBanner}
                                            handleChange={(e) => handleFormFieldChange('profileBanner', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="City *"
                                            placeholder="City"
                                            inputType="text"
                                            value={form.city}
                                            handleChange={(e) => handleFormFieldChange('city', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="State *"
                                            placeholder="state"
                                            inputType="text"
                                            value={form.state}
                                            handleChange={(e) => handleFormFieldChange('state', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="Country *"
                                            placeholder="Country"
                                            inputType="text"
                                            value={form.country}
                                            handleChange={(e) => handleFormFieldChange('country', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="Occupation *"
                                            placeholder="Software Engineer..."
                                            inputType="text"
                                            value={form.occupation}
                                            handleChange={(e) => handleFormFieldChange('occupation', e)}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            labelName="About Us *"
                                            placeholder="Brief description about yourself or your company"
                                            isTextArea
                                            value={form.aboutUs}
                                            handleChange={(e) => handleFormFieldChange('aboutUs', e)}
                                        />
                                    </div>
                                </div>
                                <div className="bg-secondary px-4 py-3 flex flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={handleUpdatePersonalProfile}
                                    >
                                        {isSubmitting ? <span className='text-xl'><BiLoaderCircle /></span> : "Update Personal Details"}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={handleToggleModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

export default PersonalInfo