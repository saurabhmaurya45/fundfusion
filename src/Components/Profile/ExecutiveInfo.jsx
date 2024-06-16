import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import FormField from '../FormField';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showSuccess, isValidEmail } from '../../utils';
import { formatProfileData } from '../../utils';
import { addProfileData } from '../../Redux/Features/Authenticate/UserProfileSlice';
import { getProfileData } from '../../Redux/Features/Authenticate/UserProfileService';
import { useContractWrite } from '@thirdweb-dev/react';
import { BiLoaderCircle } from "react-icons/bi";


const ExecutiveInfo = ({ profileData }) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { profileContract, address } = useSelector(state => state.contract)
  const { mutateAsync: addExecutive } = useContractWrite(profileContract, 'addExecutive');
  const { executiveTeam } = profileData
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    designation: '',
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addExecutiveFunc = async () => {
    const res = await addExecutive({
      args: [
        form.name,
        form.designation,
        form.email
      ]
    })
    return res;
  }

  const handleAddExecutive = async () => {
    if (!form.name || !form.email || !form.designation) {
      showError('All field are required')
      return
    }
    if (!isValidEmail(form.email)) {
      showError("Invalid Email")
      return
    }
    try {
      setIsSubmitting(true)
      await addExecutiveFunc()
      const profileData = await getProfileData(profileContract, address)
      dispatch(addProfileData(formatProfileData(profileData)))
      sessionStorage.setItem('userProfile', JSON.stringify(formatProfileData(profileData)))
      setIsSubmitting(false)
      setIsModalOpen(false)
      setForm({
        name: '',
        email: '',
        designation: '',
      })
      showSuccess("Executive added successfully")
    }
    catch (e) {
      
      showError("Failed to add executive,try again")
    }
    finally {
      setIsSubmitting(false)
    }

  }


  return (
    <div className='relative w-full'>
      <button type="button" className='add-documen absolute right-0 z-10 w-10 h-10 rounded-full bg-green-500  text-white text-xl font-semibold flex items-center justify-center shadow-2xl' onClick={handleToggleModal}><IoMdAdd /></button>
      <div class="document min-h-20 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Sr.No
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Designation
              </th>
            </tr>
          </thead>
          <tbody>
            {
              executiveTeam?.map((item, index) => (
                <tr class=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                  <td class="px-6 py-4">
                    {++index}
                  </td>
                  <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white">
                    {item.name}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white">
                    {item.email}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white">
                    {item.designation}
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
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
                  <h3 className='mb-4 text-lg'>Add Executive</h3>
                  <div className='mb-4'>
                    <FormField
                      labelName="Your Name *"
                      placeholder="John Doe"
                      inputType="text"
                      value={form.name}
                      handleChange={(e) => handleFormFieldChange('name', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="Email *"
                      placeholder="demo@gmail.com"
                      inputType="email"
                      value={form.email}
                      handleChange={(e) => handleFormFieldChange('email', e)}
                    />
                  </div>
                  <div className='mb-4'>
                    <FormField
                      labelName="Designation *"
                      placeholder="CEO/CFO"
                      inputType="text"
                      value={form.designation}
                      handleChange={(e) => handleFormFieldChange('designation', e)}
                    />
                  </div>
                </div>
                <div className="bg-secondary px-4 py-3 flex flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={handleAddExecutive}
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
    </div>

  )
}

export default ExecutiveInfo