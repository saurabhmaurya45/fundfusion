import React from 'react'

const ProfileDetailTab = ({ title, description, isTextArea = false }) => {
    return (
        <>
            {!isTextArea ?
                <div className='shadow-lg lg:w-[50%] h-auto rounded-lg flex items-center p-4 gap-2 cursor-pointer hover:bg-[#2A2A34]'>
                    <h4 className='text-lg font-semibold'>{title}: </h4>
                    <p > {description ?? ""}</p>
                </div>
                :
                <div className='shadow-lg w-full h-auto rounded-lg flex flex-col p-4 gap-2 cursor-pointer hover:bg-[#2A2A34]'>
                    <h4 className='text-lg font-semibold'>{title}: </h4>
                    <p className='pl-4 text-sm'> {description ?? ""}</p>
                </div>
            }
        </>
    )
}

export default ProfileDetailTab