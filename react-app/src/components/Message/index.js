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
        <div>
            <div className='message-profile'>

            </div>
            <div className='message-header'>
                <img className="profile-pic-msg" src={message.user.profilePic || '/placeholder.jpg'}></img>
                <span>{message.user.firstName} {message.user.lastName} </span>
                <span className="time" title={getTime(message.createdAt).datetime}>{getTime(message.createdAt).time}</span>
                <span> {message.user.id === user.id && <OpenModalButton
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
                <span>
                    <OpenModalButton
                        buttonText="Add reaction"
                        modalComponent={<ReactionFormModal message={message} socket={socket} />}
                    />
                </span>
            </div>
            <div className="users-message">
                <p>{message.message}</p>
                <div className='reaction-container'>
                    {reactions.length > 0 && reactions.map(r =>
                        <Reaction reaction={r[0]} count={r[1]} message={message} socket={socket} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Message;
