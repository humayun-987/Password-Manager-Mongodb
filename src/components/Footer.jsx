import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col bg-slate-800 justify-center items-center  mt-4 p-1 w-full'>
            <div className="logo font-bold text-2xl">
                <span className='text-green-500'>&lt;</span>
                <span className='text-white'>Pass</span>
                <span className='text-green-500'>OP</span>
                <span className='text-green-500'>/ &gt;</span>
            </div>
            <div className='flex items-center'>
                <span className='text-white'>Created with&nbsp;</span>
                <span><img width={25} src="icons/heart.png" alt="" /></span>
                <span className='text-white'>&nbsp;Humayun</span>
            </div>
        </div>
    )
}

export default Footer
