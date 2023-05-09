import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Message.css";


const Message = ({message}) => {


    console.log('message CREATED AT ------>', message.createdAt)


    return (
        <div>
            <div className='message-profile'>

            </div>
            <div className='message-header'>
                <span>{message.user.firstName} {message.user.lastName}</span>
                <span>{message.createdAt}</span>
            </div>
            <div>
                <p>{message.message}</p>
            </div>
        </div>
    )
}

export default Message;
