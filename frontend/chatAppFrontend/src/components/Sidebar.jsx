import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from "../config";
import { IoChatbubblesSharp } from "react-icons/io5"

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }

    return (
        <div className='border-r border-white/10 p-4 flex flex-col'>
            {/* ✅ App Name */}
{/* ✅ App Name */}
{/* ✅ App Name */}
<div className='mb-4 flex items-center gap-2  '>
    <IoChatbubblesSharp className='text-blue-300 text-2xl'/>
    <h1 className='text-2xl font-bold text-white tracking-wide'>ChatSync</h1>
</div>
            {/* ✅ Search Bar */}
            <form onSubmit={searchSubmitHandler} className='flex items-center gap-2 mb-3'>
                <div className='flex items-center w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 gap-2'>
                    <BiSearchAlt2 className='w-5 h-5 text-white/50' />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder='Search...'
                        className='bg-transparent outline-none text-white placeholder-white/40 w-full text-sm'
                    />
                    <button type='submit'>
                        <BiSearchAlt2 className='w-5 h-5 text-white/70 hover:text-white transition' />
                    </button>
                </div>
            </form>

            <div className="divider my-1 opacity-20"></div>

            <OtherUsers />

            {/* ✅ Logout */}
            <div className='mt-2'>
                <button
                    onClick={logoutHandler}
                    className='w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm transition border border-white/10'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar