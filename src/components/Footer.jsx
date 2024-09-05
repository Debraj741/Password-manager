import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full'>
            <div className="logo font-bold text-3xl max-[460px]:text-2xl cursor-pointer">
                <span className='text-green-500 font-bold'>&lt;Safe</span>
                Kee
                <span className='text-green-500 font-bold'>P/&gt;</span>
            </div>
            <div className="flex justify-center items-center font-semibold">
                Created with <img className='m-2' src="/icons/heart.svg" alt="Heart" /> by Debraj Kundu...
            </div>
        </div>
    )
}

export default Footer
