import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from '../redux/messageSlice';
import { BASE_URL } from "../config";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { selectedUser, authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket); // ✅ from Redux

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedUser?._id) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const newMessage = res?.data?.newMessage;
      dispatch(addMessage(newMessage)); // ✅

    } catch (error) {
      console.log(error);
    }

    setMessage("");
  };

  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder='Send a message...'
          className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
        />
        <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;