import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 '>
            <div className="mycontainer flex justify-between items-center h-14 text-white px-10 py-5">
                <div className="logo font-bold text-3xl cursor-pointer max-[460px]:text-2xl">
                    <span className='text-green-500 font-bold'>&lt;Safe</span>
                    Kee
                    <span className='text-green-500 font-bold'>P/&gt;</span>
                </div>
                {/* <ul className='flex gap-10'>
                    <li><a className='text-xl font-bold hover:text-green-600 transition-all' href="/">Home</a></li>
                    <li><a className='text-xl font-bold hover:text-green-600 transition-all' href="#">About</a></li>
                    <li><a className='text-xl font-bold hover:text-green-600 transition-all' href="#">Contact</a></li>
                </ul> */}
                <button className="btn flex justify-center items-center gap-2 bg-green-900 py-1 px-3 rounded-full">
                    <img src="/icons/github.svg" alt="Github" />
                    <span className='font-bold'>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
