import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import Avatar from './Avatar';

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className='md:min-w-[550px] flex flex-col'>

          {/* ✅ Header */}
          <div className='flex gap-3 items-center bg-white/10 backdrop-blur-md border-b border-white/10 text-white px-4 py-3 mb-2'>
            <Avatar
              id={selectedUser?._id}
              name={selectedUser?.fullName}
              online={isOnline}
              size="w-12 h-12"
            />
            <div className='flex flex-col'>
              <p className='font-semibold'>{selectedUser?.fullName}</p>
              <p className='text-xs text-white/50'>
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
          <h1 className='text-4xl text-white font-bold'>Hi, {authUser?.fullName}</h1>
          <h1 className='text-2xl text-white/70'>Let's start conversation</h1>
        </div>
      )}
    </>
  )
}

export default MessageContainer;