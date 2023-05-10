import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import "./Message.css";
import EditMessageModal from "./EditMessageModal";
import DeleteMessageModal from "./DeleteMessageModal";


const Message = ({ message, user, socket }) => {

    const timestamp = new Date(message.createdAt)
    // console.log('timestamp -->', timestamp, typeof timestamp)



    return (
        <div>
            <div className='message-profile'>

            </div>
            <div className='message-header'>
                <span>{message.user.firstName} {message.user.lastName}</span>
                <span> {message.createdAt} {message.user.id === user.id && <OpenModalButton
                    buttonText={"Edit"}
                    modalComponent={<EditMessageModal message={message} socket={socket} />}
                />}
                    {message.user.id === user.id && <OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={<DeleteMessageModal message={message} socket={socket} />}
                    />}
                    </span>
            </div>
            <div className="users-message">
                <p>{message.message}</p>
            </div>
        </div>
    )
}

export default Message;
