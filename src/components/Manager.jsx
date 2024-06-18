import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        const req = await fetch('http://localhost:3000/')
        const passwords = await req.json()
        console.log(passwords)
        if (passwords) {
            // to prevent some unwanted situations
            try {
                setPasswordArray(passwords); // Parse the JSON string to an array
            } catch (e) {
                setPasswordArray([]); // If parsing fails, set to an empty array
            }
        } else {
            setPasswordArray([]);
        }
        
    }
    useEffect(async () => {
       await getPasswords()
    }, []);

    const showPassword = () => {

        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = 'icons/eye.png';
            passwordRef.current.type = 'password'
        } else {
            ref.current.src = 'icons/eyecross.png';
            passwordRef.current.type = 'text'
        }
    }

    const [form, setForm] = useState({ site: '', username: '', password: '' })
    const savePassword = async () => {
        // if on edit if any other password with same uuid exists, then delete it
        await fetch('http://localhost:3000/',{
            method:'DELETE',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({id:form.id})
        })
        // setPasswordArray([...passwordArray, {site:form.site,username:form.username,password:form.password}])
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        let res = await fetch('http://localhost:3000/',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({ ...form, id: uuidv4() })
        })
        // localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setForm({ site: '', username: '', password: '' })
        toast('🦄 Password saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const editContent = (id) => {
        console.log(id)
        let formToEdit = passwordArray.filter(item => item.id === id)[0]
        setForm({...formToEdit,id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem('passwords',JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
    const deleteContent = async (id) => {
        // console.log(id)
        let c = confirm("Do you really want to delete this password ?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch('http://localhost:3000/',{
                method:'DELETE',
                headers:{
                    "Content-Type":'application/json'
                },
                body: JSON.stringify({id})
            })
            // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('🦄 Password deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    const copyText = (text) => {
        toast('🦄 Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="md:mycontainer mx-auto min-h-[80vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP</span>
                    <span className='text-green-500'>/ &gt;</span>
                </h1>
                <p className='text-green-800 text-lg text-center'>Your own password manager</p>
                <div className="manager text-white flex flex-col items-center p-4 gap-8">
                    <input onChange={handleChange} value={form.site} placeholder='Enter website URL' className='rounded-full border w-full text-black p-4 py-1 border-green-700' type="text" name='site' id='' />
                    <div className='flex flex-col gap-3 justify-between items-center w-full sm:flex-row'>
                        <div className="relative w-2/3">
                            <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full border w-full text-black p-4 py-1 border-green-700' type="text" name='username' id='' />
                        </div>

                        <div className="relative w-2/3">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter Password' className='rounded-full w-full border text-black p-4 py-1 border-green-700 no-password-toggle' type="password" name='password' id='' />
                            <span className='absolute top-1.5 right-3 text-black cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='text-black flex justify-center items-center w-fit bg-green-500 gap-2 border border-green-900 hover:bg-green-600 font-semibold rounded-full px-4 py-1 md:py-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 mx-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div className='mx-4'>No saved passwords</div>}
                    {passwordArray.length !== 0 &&
                        <div className='overflow-x-auto mx-1'>
                            <table className="table-auto w-full rounded-md  overflow-hidden">
                                <thead className=' bg-green-800 text-white'>
                                    <tr>
                                        <th className='py-2 px-2'>Site</th>
                                        <th className='py-2 px-4'>Username</th>
                                        <th className='py-2 px-4'>Passwords</th>
                                        <th className='py-2 px-4'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100 '>
                                    {passwordArray.map((item) => {
                                        return (
                                            <tr className='py-[10px]'>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className='flex items-center justify-between mx-4'>
                                                        <a href={item.site} target='_blank'>{item.site}</a>
                                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover" >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className='flex items-center justify-between mx-4 '>
                                                        <span>{item.username}</span>
                                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover" >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className='flex items-center justify-between mx-4 '>
                                                        <span>{'*'.repeat(item.password.length)}</span>
                                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                            <lord-icon
                                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover" >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center relative w-32 py-2 pr-4'>
                                                    <div className="flex justify-center items-center gap-1">
                                                        <span className='cursor-pointer' onClick={() => { editContent(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                trigger="hover"
                                                                style={{ "width": "22px", "height": "22px" }}>
                                                            </lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer' onClick={() => { deleteContent(item.id) }}>
                                                            <lord-icon
                                                                style={{ 'width': '22px', 'height': '22px', 'paddingTop': '3px', 'paddingLeft': '10px' }}
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="hover">
                                                            </lord-icon>
                                                        </span>
                                                    </div>
                                                </td>

                                            </tr>)
                                    })}
                                </tbody>
                            </table></div>}

                </div>
            </div>
            {/* to prevent unwanted eye icon that browser provides for passwords */}
            <style jsx>{`
                input[type="password"]::-ms-reveal,
                input[type="password"]::-ms-clear {
                    display: none;
                }
                input[type="password"]::-webkit-clear-button,
                input[type="password"]::-webkit-reveal-button {
                    display: none;
                }
            `}</style>
        </>
    )
}

export default Manager
