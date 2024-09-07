import React from 'react'
import { FaCopy } from "react-icons/fa";
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setPasswordarray] = useState([])

    // Fetch Passwords from Database
    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordarray(passwords);
    }

    useEffect(() => {
        getPassword()
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        // state="hover-cross"
        if (ref.current.state === "open") {
            ref.current.state = "hover-cross";
            passwordref.current.type = "text";
        }
        else {
            ref.current.state = "open"
            passwordref.current.type = "password";
        }
    }

    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            //If any such id exists in the database delete it
            // await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type" : "application/json"}, body : JSON.stringify({id : form.id})})



            // localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
            
            setPasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            // Save in Database by API
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type" : "application/json"}, body : JSON.stringify({...form, id: uuidv4()})})

            toast('Saved Password Successfully!');

        }
        else {
            toast("Error : Password Not Saved");
        }
        setform({ site: "", username: "", password: "" })
    }

    const deletePassword = async(id) => {
        let a = confirm("Are you Sure to Delete Password ?")
        if (a == true) {
            console.log("Deleting Password with id " + id)

            // localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item => item.id !== id)))
            setPasswordarray(passwordarray.filter(item => item.id !== id))

            // Save in Database by API
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type" : "application/json"}, body : JSON.stringify({id})})


            toast("Delete Password Successfully!")
        }
    }

    const editPassword = async(id) => {
        setform(passwordarray.filter(item => item.id === id)[0]);
        setPasswordarray(passwordarray.filter(item => item.id !== id))
        await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type" : "application/json"}, body : JSON.stringify({id})})
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-2 md:p-0 md:pt-3 md:mycontainer min-h-[85.2vh]">
                <h1 className=' max-[460px]:text-3xl font-bold text-4xl text-center'><span className='text-green-600 font-bold'>&lt;Safe</span>
                    Kee
                    <span className='text-green-600 font-bold'>P/&gt;</span>
                </h1>

                <p className='text-green-900 text-lg text-center'>Your Personal Password Manager...</p>

                <div className='flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL....' className='rounded-full border border-green-500 w-full px-5 text-lg py-2 font-bold' type="text" name="site" id="Mysite" />

                    <div className="flex flex-col w-full gap-8 md:flex-row">
                        <input value={form.username} onChange={handleChange} placeholder='Enter user Name...' className='rounded-full border border-green-500 w-full px-5 text-base py-2 font-bold' type="text" name="username" id="Myusername" />

                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password.' className='rounded-full border border-green-500 w-full px-5 py-2 text-base font-bold' type="password" name="password" id="Mypass" />

                            <span className='absolute right-2 top-[5px] cursor-pointer' onClick={showPassword}><lord-icon
                                ref={ref}
                                src="https://cdn.lordicon.com/ccrgnftl.json"
                                trigger="hover"
                                state="open"
                            >
                            </lord-icon>
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 w-fit bg-green-400 rounded-full p-2 px-4 hover:bg-green-500 transition-all font-bold border border-green-700'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon> Save PassWord
                    </button>
                </div>
                <div className="password-table">
                    <h1 className='font-bold text-2xl py-4'>Your PassWords</h1>
                    {passwordarray.length === 0 && <div className='font-bold text-lg text-center'>No PassWords to Show..</div>}
                    {passwordarray.length != 0 &&
                        <table className="table-auto w-full rounded-xl overflow-hidden mb-10 max-[470px]:text-xs ">
                            <thead className='bg-green-700 text-white'>
                                <tr>
                                    <th className='sm:py-2'>Site</th>
                                    <th className='sm:py-2'>UserName</th>
                                    <th className='sm:py-2'>PassWord</th>
                                    <th className='sm:py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordarray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='sm:py-2 border border-green-100 text-center'>
                                                <a target='_blank' className='hover:text-blue-600' href={item.site}>{item.site}</a>
                                            </td>
                                            <td className='py-2  border border-green-100 text-center'>
                                                <div className='flex flex-col sm:flex-row justify-center gap-5 items-center'>
                                                    <span>{item.username}</span>
                                                    <span className='cursor-pointer' onClick={() => copyText(item.username)}><FaCopy /></span>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-green-100 text-center'>
                                                <div className='flex flex-col sm:flex-row justify-center gap-5 items-center'>
                                                    <span className='font-bold'>{"*".repeat(item.password.length)}</span>
                                                    <span className='cursor-pointer' onClick={() => copyText(item.password)}><FaCopy /></span>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-green-100 text-center'>
                                                <div className='flex flex-col sm:flex-row justify-center gap-4 items-center'>
                                                    <span className='cursor-pointer' onClick={() => editPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/zfzufhzk.json"
                                                            trigger="hover"
                                                            state="hover-line"
                                                            style={{ "width": "30px", "height": "30px" }}
                                                        >
                                                        </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer' onClick={() => deletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ "width": "30px", "height": "30px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>)
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
