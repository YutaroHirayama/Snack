import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Message.css";


const Message = ({message}) => {

    const timestamp = new Date(message.createdAt)
    console.log('timestamp -->', timestamp, typeof timestamp)

    return (
        <div>
            <div className='message-profile'>

            </div>
            <div className='message-header'>
                <span>{message.user.firstName} {message.user.lastName}</span>
                <span> {message.createdAt}</span>
            </div>
            <div className="users-message">
                <p>{message.message}</p>
            </div>
        </div>
    )
}

export default Message;
