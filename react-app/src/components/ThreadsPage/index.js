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
import DeleteMessageModal from "../Message/DeleteMessageModal";
import './ThreadsPage.css'

let threadSocket

const ThreadsPage = ({ user }) => {

    const message = useSelector(state => state.messages.currentMessage)

    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();
    const { messageId, channelId } = useParams();

    useEffect(() => {
        threadSocket = io();
        fetchMessage();

        threadSocket.on("chat", (chat) => {

            dispatch(fetchMessageThunk(messageId))

        })
        return (() => {

            threadSocket.disconnect()
        })

    }, [messageId])

    async function fetchMessage() {
        const currentMessage = await dispatch(fetchMessageThunk(messageId));

        if (currentMessage.no_message) {
            alert("Channel no longer exists");
            history.push(`/`);
            return
        }
    }

    const closeThreads = e => {
        history.push(`/channel/${channelId}`);
    }


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
            <div className="close-threads-bttn-div">
                <button
                    className="close-threads-bttn"
                    onClick={closeThreads}>X</button>

            </div>
            <img className="profile-pic-msg" src={message.user.profilePic}></img>
            <h3>{message.user.firstName} {message.user.lastName}</h3>
            <p>{message.message}</p>
            <div className='threads-container'>
                {message?.threads.map(thread => <div key={thread.id}>
                    <img className="profile-pic-msg" src={thread?.user.profilePic}></img>
                    <span>{thread?.user.firstName} {thread?.user.lastName} {thread.createdAt}</span>
                    {thread?.user.id === user.id && <OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={<DeleteMessageModal message={thread} socket={threadSocket} type={"thread"} channelId={message.channelId} />}
                    />}
                    <p>{thread?.threadMessage}</p>
                </div>)}
            </div>
            <MessageInput user={user} messageId={message.id} socket={threadSocket} type='thread' />
        </div>

    )
}

export default ThreadsPage;
