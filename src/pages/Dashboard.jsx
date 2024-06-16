import React, { useEffect, useState } from 'react'
import { DashboardStats, Loader } from '../Components'
import { useSelector } from 'react-redux'
import { formatStatistics, showError } from '../utils'


const Dashboard = () => {
  const { contract, address } = useSelector(state => state.contract)
  const [isLoading, setIsLoading] = useState(false)
  const [statistics, setStatistics] = useState({})

  const fetchStatistics = async()=>{
    setIsLoading(true)
    try{
      const res = await contract?.call("getStatistics")
      const formatedData = formatStatistics(res)
      setStatistics(formatedData)
      setIsLoading(false)
    }
    catch(e){
      
      showError("Failed to fetch statistics")
    }
    finally{
      setIsLoading(false)
    }
    
  }

  useEffect(() => {
    if (contract && address) {
      fetchStatistics();
    }
  }, [contract, address]);


  return (
    <div >
      {isLoading && <Loader message={"Loading"}/>}
      {!isLoading && <DashboardStats statistics = {statistics}/>}
    </div>
  )
}

export default Dashboard