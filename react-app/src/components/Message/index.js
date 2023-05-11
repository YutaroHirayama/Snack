import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Message.css";
import Reaction from "../Reaction";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import ReactionFormModal from "../Reaction/ReactionFormModal";


const Message = ({message}) => {
    const allReactions = Object.values(message.reactions)
    const timestamp = new Date(message.createdAt)
    // console.log('timestamp -->', timestamp, typeof timestamp)

    let reactions = []
    if (allReactions.length) {
        const resObj = {}
        for (let i = 0; i < allReactions.length; i++) {
            let reaction = allReactions[i].reaction;
            if(resObj[reaction]) {
                resObj[reaction] += 1
            } else {
                resObj[reaction] = 1
            }
        }
        reactions = Object.entries(resObj)
    }

    const handleClick = (e) => {
        e.preventDefault()

    }

    return (
        <div>
            <div className='message-profile'>

            </div>
            <div className='message-header'>
                <span>{message.user.firstName} {message.user.lastName}</span>
                <span> {message.createdAt}</span>
                <span>
                    <OpenModalButton
                        buttonText="Add reaction"
                        modalComponent={<ReactionFormModal />}
                    />
                </span>
            </div>
            <div className="users-message">
                <p>{message.message}</p>
                <div className='reaction-container'>
                    {reactions.length && reactions.map(r =>
                        <Reaction reaction={r[0]} count={r[1]} message={message}/>
                    )}
                </div>
                <div>
                    <button
                    onClick={handleClick}
                    >+</button>
                </div>
            </div>
        </div>
    )
}

export default Message;
