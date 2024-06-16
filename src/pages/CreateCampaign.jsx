import React, { useState } from 'react';
import { ethers } from "ethers"
import { useNavigate } from 'react-router-dom';
import { money } from '../assets'
import { FormField, CustomButton, Loader } from '../Components';
import { checkIfImage, dateToTime, showError, showSuccess } from '../utils';
import { donationTypes } from '../Constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useContractWrite } from '@thirdweb-dev/react';
import { fetchYourCampaigns,fetchYourStatistics } from '../Redux/Features/Authenticate/UserProfileService';
import { addStatisticsData,addYourCampaignData } from '../Redux/Features/Authenticate/UserProfileSlice';

const CreateCampaign = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.category.categories)
    const { contract, address } = useSelector(state => state.contract)
    const {personalInfo} = useSelector(state=>state.userProfile.profileData)
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [form, setForm] = useState({
        name: personalInfo?.name ?? "",
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: '',
        termsandcondition: '',
        category: '',
        type: ''
    })

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleRedirectToOrBack = () => {
        navigate(location.state?.from ?? '/', { replace: true })
    }
    const handleYourData = async () => {
        const yourCampaign = await fetchYourCampaigns(contract, address)
        const yourStatistics = await fetchYourStatistics(contract, address)
        dispatch(addYourCampaignData(yourCampaign))
        dispatch(addStatisticsData(yourStatistics))
        sessionStorage.setItem('yourCampaign', JSON.stringify(yourCampaign))
        sessionStorage.setItem('yourStatistics', JSON.stringify(yourStatistics))
    }

    const createCampaignFunc = async () => {
        const res = await createCampaign({
            args: [
                form.name,
                form.title,
                form.description,
                ethers.utils.parseUnits(form.target, 18),
                dateToTime(form.deadline),
                form.image,
                form.category,
                form.type,
                form.termsandcondition
            ]
        })
        return res;
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!form.name || !form.title || !form.description || !form.target || !form.deadline
            || !form.image || !form.category || !form.type
        ) {
            showError("All field are required")
            return
        }
        const res = await checkIfImage(form.image)
        if (!res) {
            showError("Provide valid image URL")
            setForm({ ...form, image: "" })
            return
        }
        try {
            setIsSubmitting(true)
            await createCampaignFunc()
            await handleYourData()
            setIsSubmitting(false)
            setForm({
                name: '',
                title: '',
                description: '',
                target: '',
                deadline: '',
                image: '',
                termsandcondition: '',
                category: '',
                type: ''
            })
            handleRedirectToOrBack()
            showSuccess("Project created Sucessfully");
        }
        catch (e) {
            console.log(e);
            showError("Failed to create project, try again")
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {
                isSubmitting ?
                    <Loader message="Transaction is in progress" />
                    :
                    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10">
                        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Project</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                            <div className="flex flex-wrap gap-[40px]">
                                <FormField
                                    labelName="Your Name *"
                                    placeholder="John Doe"
                                    inputType="text"
                                    value={form.name}
                                    handleChange={(e) => handleFormFieldChange('name', e)}
                                />
                                <FormField
                                    labelName="Project Title *"
                                    placeholder="Write a title"
                                    inputType="text"
                                    value={form.title}
                                    handleChange={(e) => handleFormFieldChange('title', e)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-[40px] ">
                                <FormField
                                    labelName="Category *"
                                    isSelectType={true}
                                    value={form.category}
                                    selectArray={categories}
                                    handleChange={(e) => handleFormFieldChange('category', e)}
                                />
                                <FormField
                                    labelName="Project Type *"
                                    isSelectType={true}
                                    value={form.type}
                                    selectArray={donationTypes}
                                    handleChange={(e) => handleFormFieldChange('type', e)}
                                />
                            </div>
                            <FormField
                                labelName="Project *"
                                placeholder="Write project details"
                                isTextArea
                                value={form.description}
                                handleChange={(e) => handleFormFieldChange('description', e)}
                            />

                            <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                                <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
                                <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
                                    You will get 100% of the raised amount
                                </h4>
                            </div>

                            <div className="flex flex-wrap gap-[40px]">
                                <FormField
                                    labelName="Goal *"
                                    placeholder="ETH 0.50"
                                    inputType="number"
                                    value={form.target}
                                    handleChange={(e) => handleFormFieldChange('target', e)}
                                />
                                <FormField
                                    labelName="End Date *"
                                    placeholder="End date"
                                    inputType="date"
                                    value={form.deadline}
                                    handleChange={(e) => handleFormFieldChange('deadline', e)}
                                />
                            </div>
                            <FormField
                                labelName="Project Image *"
                                placeholder="Place image URL of your project"
                                inputType="url"
                                value={form.image}
                                handleChange={(e) => handleFormFieldChange('image', e)}
                            />
                            <FormField
                                labelName="Terms and Condition *"
                                placeholder="Write terms and conditions"
                                isTextArea
                                value={form.termsandcondition}
                                handleChange={(e) => handleFormFieldChange('termsandcondition', e)}
                            />
                            <div className="flex justify-center items-center mt-[40px]">
                                <CustomButton
                                    btnType="submit"
                                    title="Create new project"
                                    styles="bg-[#1dc071]"
                                />
                            </div>
                        </form>
                    </div>
            }
        </>
    );
};

export default CreateCampaign;
