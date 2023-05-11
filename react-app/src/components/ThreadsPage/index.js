import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessageThunk } from "../../store/messages";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import ChannelInfoModal from "../ChannelInfoModal";
import MessageInput from "../MessagePage/MessageInput";
import Message from "../Message";
import { Redirect } from "react-router-dom";

let threadSocket

const ThreadsPage = ({ user }) => {

    const message = useSelector(state => state.messages.currentMessage)

    const dispatch = useDispatch();

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

    if (!isMember) return <Redirect to='/' />

    return (
        <div className='thread-page'>
            <Message message={message} user={user} />
            <div className='threads-container'>
                {message.threads.map(thread => <p key={thread.id}>{thread.threadMessage}</p>)}
            </div>
            <MessageInput user={user} messageId={message.id} socket={threadSocket} type='thread' />
        </div>

    )
}

export default ThreadsPage;
