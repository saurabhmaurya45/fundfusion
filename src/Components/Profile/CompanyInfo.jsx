import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import FormField from '../FormField';
import { useDispatch, useSelector } from 'react-redux';
import { dateToTime, showError, showSuccess } from '../../utils';
import { formatProfileData } from '../../utils';
import { addProfileData } from '../../Redux/Features/Authenticate/UserProfileSlice';
import { getProfileData } from '../../Redux/Features/Authenticate/UserProfileService';
import { useContractWrite } from '@thirdweb-dev/react';
import { BiLoaderCircle } from "react-icons/bi";
import  ProfileDetailTab  from "./ProfileDetailTab";

const CompanyInfo = ({ profileData }) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { profileContract, address } = useSelector(state => state.contract)
  const { mutateAsync: updateCompanyInfo } = useContractWrite(profileContract, 'updateCompanyInfo');
  const { companyInfo } = profileData
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    companyName: companyInfo.companyName,
    industry: companyInfo.industry,
    companySize: companyInfo.companySize,
    companyWebsite: companyInfo.companyWebsite,
    foundedDate: companyInfo.foundedDate,
    gstNo: companyInfo.gstNo,
    panNo: companyInfo.panNo
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateCompanyProfile = async () => {
    const res = await updateCompanyInfo({
      args: [
        form.companyName,
        form.industry,
        form.companySize,
        form.companyWebsite,
        dateToTime(form.foundedDate),
        form.gstNo,
        form.panNo
      ]
    })
    return res;
  }

  const handleUpdateCompanyProfile = async () => {
    if (!form.companyName || !form.industry || !form.companySize
      || !form.companyWebsite || !form.foundedDate || !form.gstNo || !form.panNo
    ) {
      showError('All field are required')
      return
    }
    try {
      setIsSubmitting(true)
      await updateCompanyProfile()
      const profileData = await getProfileData(profileContract, address)
      dispatch(addProfileData(formatProfileData(profileData)))
      sessionStorage.setItem('userProfile', JSON.stringify(formatProfileData(profileData)))
      setIsSubmitting(false)
      setIsModalOpen(false)
      setForm({
        companyName: '',
        industry: '',
        companySize: '',
        companyWebsite: '',
        foundedDate: '',
        gstNo: '',
        panNo: '',
      })
      showSuccess("Profile updated successfully")
    }
    catch (e) {
      
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
          <ProfileDetailTab title="Company Name" description={companyInfo.companyName} />
          <ProfileDetailTab title="Industry" description={companyInfo.industry} />
        </div>
        <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
          <ProfileDetailTab title="Company Size" description={companyInfo.companySize} />
          <ProfileDetailTab title="Company Website" description={companyInfo.companyWebsite} />
        </div>
        <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
          <ProfileDetailTab title="Foundation Date" description={companyInfo.foundedDate} />
          <ProfileDetailTab title="GST No" description={companyInfo.gstNo} />
        </div>
        <div className='flex flex-col lg:flex-row w-full h-auto gap-4'>
          <ProfileDetailTab title="PAN No" description={companyInfo.panNo} />
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
                  <h3 className='mb-4 text-lg'>Update Company Details</h3>
                  <div className='mb-4'>
                    <FormField
                      labelName="Company Name *"
                      placeholder="xyz plt. ltd."
                      inputType="text"
                      value={form.companyName}
                      handleChange={(e) => handleFormFieldChange('companyName', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="Industry *"
                      placeholder="Finance"
                      inputType="text"
                      value={form.industry}
                      handleChange={(e) => handleFormFieldChange('industry', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="Company Size *"
                      placeholder="10/100/1000"
                      inputType="number"
                      value={form.companySize}
                      handleChange={(e) => handleFormFieldChange('companySize', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="Company Website *"
                      placeholder="https://www.abc.com"
                      inputType="text"
                      value={form.companyWebsite}
                      handleChange={(e) => handleFormFieldChange('companyWebsite', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="Founded Date*"
                      inputType="date"
                      value={form.foundedDate}
                      handleChange={(e) => handleFormFieldChange('foundedDate', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="GST No *"
                      placeholder="SDCF3453DFEF454"
                      inputType="text"
                      value={form.gstNo}
                      handleChange={(e) => handleFormFieldChange('gstNo', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="PAN No *"
                      placeholder="SDCF3453"
                      inputType="text"
                      value={form.panNo}
                      handleChange={(e) => handleFormFieldChange('panNo', e)}
                    />
                  </div>
                </div>
                <div className="bg-secondary px-4 py-3 flex flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={handleUpdateCompanyProfile}
                  >
                    {isSubmitting ? <span className='text-xl'><BiLoaderCircle /></span> : "Add Executive"}
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

export default CompanyInfo