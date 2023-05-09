import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessagesThunk } from "../../store/messages";
import Message from "../Message";
import MessageInput from "./MessageInput";
import "./MessagePage.css";


const MessagePage = () => {

    const channel = useSelector(state => state.channels.currentChannel)?.channel;
    const messages = channel?.messages
    console.log('channel------->',channel)
    console.log('messages------->',messages)

    if(!messages) return null;

    return (
        <div className='message-page'>
            <h2>{channel.channelName}</h2>
            <div className='messages-container'>
            {messages.map(m => <Message key={m.id} message={m} />)}
            </div>

            <div>
                <MessageInput channelId={channel.id}/>
            </div>
        </div>

    )
}

export default MessagePage
