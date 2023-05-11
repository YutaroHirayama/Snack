import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessageThunk } from "../../store/messages";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import ChannelInfoModal from "../ChannelInfoModal";

// let socket

const ThreadsPage = () => {

    const message = useSelector(state => state.messages.currentMessage)

    // const dispatch = useDispatch();

    if (!message || !message.threads) return null;
    console.log("THREAD : ", message)

    return (
        <div className='thread-page'>
            <div className='threads-container'>

                {message.threads.map(thread => {
                    console.log(thread)
                    return <p>{thread.threadMessage}</p>
                }
                )}
            </div>

        </div>

    )
}

export default ThreadsPage;
