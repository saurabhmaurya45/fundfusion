import {  useState } from 'react'
import { donationTypes } from '../Constants/constants'
import { useSelector } from "react-redux"

const Filter = ({ setFilterCriteria,filterCriteria,setShowFilter }) => {
    const categories = useSelector(state => state.category.categories)
    const [filterData,setFilterData] = useState(filterCriteria)

    const filterHandler = (e) => {
        if (filterData.includes(e.target.value)) {
            setFilterData(filterData.filter(item => item !== e.target.value))
        }
        else {
            setFilterData([...filterData, e.target.value])
        }
    }

    const filterDataBasedOnCriteria = ()=>{
        setFilterCriteria(filterData)
        setShowFilter(false)
    }
    const resetHandler = ()=>{
        setFilterData([])
        setFilterCriteria([])
        setShowFilter(false)
    }


    return (
        <div className=" w-full z-10" onChange={filterHandler}>
            <div className="mt-7 box rounded-xl border border-gray-300 bg-[#1C1C24] p-6 w-full md:max-w-sm">
                <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-2">
                    <p className="font-medium text-base leading-7 text-white ">Filter</p>
                    <p onClick={resetHandler}
                        className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-white">
                        RESET</p>
                </div>
                <div className='mb-4'>
                    <p className="font-medium text-sm leading-6 text-white mb-3">Category</p>
                    <div className="box flex flex-col gap-2">
                        {
                            categories?.map((item, index) => {
                                return (
                                    <div className="flex items-center" key={item.categoryId}>
                                        <input id={"category" + item.categoryId} defaultChecked={filterData.includes(item.name) && true} type="checkbox" value={item.name} className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-green-500 hover:bg-green-100 checked:bg-no-repeat checked:bg-center checked:border-green-500 checked:bg-green-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor={"category" + item.categoryId} className="text-xs font-normal text-white leading-4 cursor-pointer">{item.name}</label>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className='mb-4'>
                    <p className="font-medium text-sm leading-6 text-white mb-3">Donation Type</p>
                    <div className="box flex flex-col gap-2">
                        {
                            donationTypes?.map((item, index) => {
                                return (
                                    <div className="flex items-center">
                                        <input id={"donation" + index} type="checkbox" value={item} defaultChecked={filterData.includes(item) && true} className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-green-500 hover:bg-green-100 checked:bg-no-repeat checked:bg-center checked:border-green-500 checked:bg-green-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor={"donation" + index} className="text-xs font-normal text-white leading-4 cursor-pointer">{item}</label>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <button className='p-2 px-4 bg-green-500 text-white rounded-lg relative -right-[180px] block ' onClick={filterDataBasedOnCriteria}>Apply</button>
            </div>
        </div>

    )
}

export default Filter