import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessageThunk } from "../../store/messages";
import { io } from 'socket.io-client';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import ChannelInfoModal from "../ChannelInfoModal";
import MessageInput from "../MessagePage/MessageInput";
import Message from "../Message";
import { Redirect } from "react-router-dom";

let threadSocket

const ThreadsPage = ({ user }) => {

    const message = useSelector(state => state.messages.currentMessage)

    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();
    const { messageId } = useParams();

    useEffect(() => {
        threadSocket = io();
        dispatch(fetchMessageThunk(messageId));

        threadSocket.on("chat", (chat) => {

            dispatch(fetchMessageThunk(messageId))

        })
        return (() => {

            threadSocket.disconnect()
        })

    }, [messageId])


    if (!message || !message.threads) return null;

    let isMember = false;
    for (let member of message.channel.members) {
        if (member.id === user.id) {
            isMember = true;
        }
    }
    console.log("MESSAGE ----> ", message)
    if (!isMember) return <Redirect to='/' />

    return (
        <div className='thread-page'>
            <h3>{message.user.firstName} {message.user.lastName}</h3>
            <p>{message.message}</p>
            <div className='threads-container'>
                {message.threads.map(thread => <div key={thread.id}>
                    <h4>{thread?.user.firstName} {thread?.user.lastName} {thread.createdAt}</h4>
                    <p>{thread?.threadMessage}</p>

                </div>)}
            </div>
            <MessageInput user={user} messageId={message.id} socket={threadSocket} type='thread' />
        </div>

    )
}

export default ThreadsPage;
