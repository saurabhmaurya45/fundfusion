import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ethers } from "ethers"
import { calculateBarPercentage, formatCampaignData, formatToHtml, showError, showSuccess } from "../utils"
import { thirdweb } from "../assets"
import { CustomButton, Loader, CountBox } from "../Components"
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux"

export default function CampaignDetails() {
    const { state } = useLocation()
    const  pId  = state
    const { contract, address } = useSelector(state => state.contract)
    const [singleContractData, setSingleContractData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [amount, setAmount] = useState('')
    const donations =  singleContractData?.donations


    const donate = async () => {
        const data = await contract?.call('donateToCampaign', [pId], {
            value: ethers.utils.parseEther(amount)
        });
        return data;
    }

    const fetchSingleContractData = async () => {
        try {
            setIsLoading(true)
            const data = await contract?.call('getSingleCampaign', [pId])
            const formatedData = formatCampaignData(data)
            setSingleContractData(formatedData)
            setIsLoading(false)
        }
        catch (e) {
            
            showError("Failed to fetch data, try again")
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (contract) {
            fetchSingleContractData()
        }
    }, [contract, address])

    const handleDonate = async () => {
        try {
            setIsSubmitting(true)
            await donate()
            await fetchSingleContractData()
            setAmount('')
            setIsSubmitting(false)
            showSuccess("Transaction successful")
        } catch (e) {
            
            if(e.reason){
                showError(e.reason)
            }
            else{
                showError("Transaction failed, try again")
            }
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {isLoading || isSubmitting && <Loader message={isSubmitting?"Transaction in progress, ":"Loading"} />}
            {!isLoading && (
                <>
                    <div className="w-full flex md:flex-row flex-col gap-[30px]">
                        <div className="flex-1 flex-col">
                            <img src={singleContractData?.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
                            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                                <div className="absolute h-full bg-[#4acd8d]"
                                    style={{
                                        width: `${calculateBarPercentage(Number(singleContractData?.target), Number(singleContractData?.amountCollected))}%`,
                                        maxWidth: '100%'
                                    }} >
                                </div>
                            </div>
                        </div>
                        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                            <CountBox title="Days Left" value={singleContractData?.daysLeft} />
                            <CountBox title={`Raised of ${singleContractData?.target}`} value={singleContractData?.amountCollected} />
                            <CountBox title="Total Backers" value={singleContractData?.donations?.length} />
                        </div>
                    </div>
                    <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                        <div className="flex-[2] flex flex-col gap-[40px]">
                            <h1 className="font-epilogue text-2xl font-bold ">{singleContractData?.title}</h1>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[18px] text-white
                                    uppercase">
                                    Creator
                                </h4>
                                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                                    <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full
                                    bg-[#2c2f32] cursor-pointer">
                                        <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{singleContractData?.owner ?? ""}</h4>
                                        <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191] flex gap-2 items-center">Category: {singleContractData?.category?.name} <span className="pt-1"><GoDotFill /></span> Type: {singleContractData?.typeOfContract ?? ""} </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[18px] text-white
                                    uppercase">
                                    Project Details
                                </h4>
                                <div className="mt-[20px]">
                                    <p className="font-epilogue font-normal text-[16px] text-[#808191]
                                    leading-[26px] text-justify">
                                        {formatToHtml(singleContractData?.description ?? "")}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[18px] text-white
                                    uppercase">
                                    Donators
                                </h4>
                                <div className="mt-[20px] flex flex-col gap-4 max-h-[400px] overflow-y-scroll">
                                    {donations?.length > 0 && donations?.map((donation, index) => (
                                        <div key={`${donation.donator}-${donation.amount}-${index}`} className="flex items-center gap-4">
                                            <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd]
                                            leading-[26px] break-all">
                                                {index + 1}. {donation.donator}
                                            </p>
                                            <p className="font-epilogue font-normal text-[16px] text-[#808191]
                                            leading-[26px] break-all">
                                                {donation.amount} ETH
                                            </p>
                                        </div>
                                    ))}
                                    {donations?.length === 0 && <p className="font-epilogue font-normal text-[16px] text-[#808191]
                                    leading-[26px] text-justify">
                                        No donators yet. Be the first one.
                                    </p>
                                    }
                                </div>
                            </div>
                            <div>
                                <h4 className="font-epilogue font-normal text-[14px] text-white
                                    uppercase">
                                    Terms and Conditions
                                </h4>
                                <div className="mt-[20px]">
                                    <p className="font-epilogue font-normal text-[12px] text-[#808191]
                                    leading-[26px] text-justify">
                                        {formatToHtml(singleContractData?.termsAndCondition ?? "")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-epilogue font-semibold text-[18px] text-white
                                    uppercase">
                                Fund
                            </h4>
                            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                                <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center
                                    text-[#808191]
                                ">
                                    Fund the project
                                </p>
                                <div className="mt-[30px]">
                                    <input type="number" placeholder="ETH 0.1" step="0.01" className="w-full
                                    py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43]
                                     bg-transparent font-epilogue text-white text-[18px] leading-[30px]
                                     placeholder:text-[#4b5264] rounded-[10px]"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                        <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                                            Back it because you believe in it.
                                        </h4>
                                        <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                                            Support the project for no reward, just because it speaks to you.
                                        </p>
                                    </div>
                                    <CustomButton
                                        btnType="button"
                                        title="Fund project"
                                        styles="w-full bg-[#8c6dfd]"
                                        handleClick={handleDonate}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ >
    )
}