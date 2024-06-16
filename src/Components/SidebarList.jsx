import React from 'react'

const SidebarList = ({item}) => {
    const {icon,name,status} = item
  return (
    <li className={'w-full  h-[32px] flex items-center gap-4 my-[20px] text-sm '+ (status?'pl-[32px] border-l-4 border-[#88C2BB] text-[#f9f7f7] ':'pl-[36px] text-[#8D8D8D]')}>
        <img src={icon} className='w-5 h-5' />
        <p>{name}</p>
    </li>
  )
}

export default SidebarList