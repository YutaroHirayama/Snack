import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import "./Message.css";
import EditMessageModal from "./EditMessageModal";
import DeleteMessageModal from "./DeleteMessageModal";
import { fetchMessageThunk } from "../../store/messages";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Message = ({ message, user, socket }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation()
    const timestamp = new Date(message.createdAt);
    // console.log('timestamp -->', timestamp, typeof timestamp)

    const loadReplies = (message) => {

        if (!location.pathname.includes('message')) {
            history.push(`${location.pathname}/message/${message.id}`)
        } else {
            let newLocation = location.pathname
            for (let i = newLocation.length - 1; i > 0; i--) {
                if (newLocation[i] === '/') {
                    newLocation = newLocation.slice(0, i + 1) + message.id;
                    break;
                }
            }
            history.push(newLocation)
        }
    };

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
                    <button
                        onClick={() => loadReplies(message)}
                    >{message.threads.length > 0 ? `${message.threads.length} replies` : "Reply"} </button>
                </span>
            </div>
            <div className="users-message">
                <p>{message.message}</p>
            </div>
        </div>
    )
}

export default Message;
