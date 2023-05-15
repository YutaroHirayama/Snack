import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import "./Message.css";
import EditMessageModal from "./EditMessageModal";
import DeleteMessageModal from "./DeleteMessageModal";
import { fetchMessageThunk } from "../../store/messages";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Reaction from "../Reaction";
import { useModal } from "../../context/Modal";
import ReactionFormModal from "../Reaction/ReactionFormModal";
import { getTime } from "../ThreadsPage";

const Message = ({ message, user, socket }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation()

    const allReactions = Object.values(message.reactions)
    const timestamp = new Date(message.createdAt);


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


    let reactions = []
    if (allReactions.length) {
        const resObj = {}
        for (let i = 0; i < allReactions.length; i++) {
            let reaction = allReactions[i].reaction;
            if (resObj[reaction]) {
                resObj[reaction] += 1
            } else {
                resObj[reaction] = 1
            }
        }
        reactions = Object.entries(resObj)
    }


    return (
        <div className='single-message-container'>
            <img className="profile-pic-msg" src={message.user.profilePic}></img>
            <div className='single-message-details'>
                <div className='single-message-header'>
                    <div className='single-message-user-timestamp'>
                        <span className='single-message-user'>{message.user.firstName} {message.user.lastName} </span>
                        <span className="time" title={getTime(message.createdAt).datetime}>{getTime(message.createdAt).time}</span>
                    </div>
                    <div className='single-message-header-button-container'>
                        {message.user.id === user.id && <OpenModalButton
                            buttonText={"Edit"}
                            className='single-message-header-button'
                            modalComponent={<EditMessageModal message={message} socket={socket} />}
                        />}
                        {message.user.id === user.id && <OpenModalButton
                            buttonText={"Delete"}
                            className='single-message-header-button'
                            modalComponent={<DeleteMessageModal message={message} socket={socket} />}
                        />}
                        <button
                            className='single-message-header-button'
                            onClick={() => loadReplies(message)}
                        >Reply</button>
                        <OpenModalButton
                            buttonText="Add reaction"
                            className='single-message-header-button'
                            modalComponent={<ReactionFormModal message={message} socket={socket} />}
                        />
                    </div>
                </div>
                <div className="users-message">{message.message}</div>
                <div className='reaction-container'>
                    {reactions.length > 0 && reactions.map(r =>
                        <Reaction reaction={r[0]} count={r[1]} message={message} socket={socket} />
                    )}
                </div>
                {message.threads.length > 0 && (
                <button
                    className='message-replies-button'
                    onClick={() => loadReplies(message)}>
                    {message.threads.length > 1 ? `${message.threads.length} replies ` : `${message.threads.length} reply `}
                    <span className='message-reply-hidden message-reply-view-thread'>    View Thread</span>
                    <span className='message-reply-hidden message-reply-caret'>{'>'}</span>
                </button>
                )}
            </div>
        </div>
    )
}

export default Message;
