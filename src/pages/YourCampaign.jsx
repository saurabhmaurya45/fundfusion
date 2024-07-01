import React, { useState } from 'react'
import { CardCampaign, Filter } from '../Components'
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const YourCampaign = () => {
  const navigate = useNavigate()
  const yourCampaign = useSelector(state => state.userProfile.yourCampaign)
  const [showFilter, setShowFilter] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState([])
  // const [searchCampaign, setSearchCampaign] = useState('')

  let filteredData = yourCampaign.filter((campaign) => (filterCriteria.includes(campaign.category.name) || filterCriteria.includes(campaign.typeOfContract)))

  filteredData = filteredData.length > 0 || filterCriteria.length > 0 ? filteredData : yourCampaign

  function handleNavigate(campaign) {
    navigate(`/main/campaign-details/${campaign.pId}`, { state: campaign.pId })
  }

  return (
    <>

      <div className=' '>
        <div className='flex justify-between'>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">My Projects ({filteredData.length > 0 ? filteredData.length : 0})</h1>
          <button className='filter p-2 fixed right-7 bg-[#1C1C24] text-white rounded-full font-bold text-3xl' onClick={() => (setShowFilter(!showFilter))}><CiFilter /></button>
          {showFilter && <div className='fixed w-[300px] right-10  top-[8.5rem] z-10'>
            <Filter setFilterCriteria={setFilterCriteria} filterCriteria={filterCriteria} setShowFilter={setShowFilter} />
          </div>}
        </div>
        <div className='campaign-list flex flex-wrap mt-[20px] gap-[26px] '>
          {filteredData.length === 0 && <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">No one have  created any campaigns yet !!</p>}
          {filteredData.length > 0 && filteredData.map((campaign) => (
            <CardCampaign key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))
          }
        </div>
      </div>
    </>
  )
}

export default YourCampaign