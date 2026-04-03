import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import Avatar from './Avatar';

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const isSender = message?.senderId === authUser?._id

    return (
        <div ref={scroll} className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <Avatar
                    id={message?.senderId}
                    name={isSender ? authUser?.fullName : selectedUser?.fullName}
                    size="w-10 h-10"
                />
            </div>

            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </time>
            </div>

            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.messageText}
            </div>
        </div>
    )
}

export default Message