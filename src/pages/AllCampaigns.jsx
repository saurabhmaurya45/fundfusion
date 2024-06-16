import React, { useState, useEffect } from 'react'
import { CardCampaign, Loader, Filter } from '../Components'
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCampaignsData, showError } from '../utils';

const allCampaigns = () => {
  const navigate = useNavigate()
  const { contract, address } = useSelector(state => state.contract)
  const [campaignList, setCampaignList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState([])
  // const [searchCampaign, setSearchCampaign] = useState('')



  async function fetchCampaigns() {
    try {
      setIsLoading(true)
      const campaingData = await contract?.call('getCampaigns')
      const formatedData = formatCampaignsData(campaingData)
      const filteredData = formatedData.filter((campaign) => (filterCriteria.includes(campaign.category.name) || filterCriteria.includes(campaign.typeOfContract)))
      setCampaignList(filteredData.length>0 || filterCriteria.length>0 ?filteredData:formatedData)
      setIsLoading(false)
    }
    catch (e) {
      
      showError("Failed to fetch data, try again")
    }
    finally {
      setIsLoading(false)
    }
  }
  function handleNavigate(campaign) {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign.pId })
  }

  useEffect(() => {
    if (contract) {
      fetchCampaigns()
    }
  }, [address, contract,filterCriteria])

  return (
    <>
      {isLoading ? <Loader message={"Loading"} /> :
        <div className=' '>
          <div className='flex justify-between'>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">All Projects ({campaignList.length > 0 ? campaignList.length : 0})</h1>
            <button className='filter p-2 fixed right-7 bg-[#1C1C24] text-white rounded-full font-bold text-3xl' onClick={() => (setShowFilter(!showFilter))}><CiFilter /></button>
            {showFilter && <div className='fixed w-[300px] right-10  top-[7rem]  z-10'>
              <Filter setFilterCriteria={setFilterCriteria} filterCriteria={filterCriteria} setShowFilter={setShowFilter}  />
            </div>}
          </div>
          <div className='campaign-list flex flex-wrap mt-[20px] gap-[26px] '>
            {!isLoading && campaignList.length === 0 && <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">No one have  created any campaigns yet !!</p>}
            {!isLoading && campaignList.length > 0 && campaignList.map((campaign) => (
              <CardCampaign key={campaign.pId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))
            }
          </div>
        </div>}
    </>
  )
}

export default allCampaigns