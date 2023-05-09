import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessagesThunk } from "../../store/messages";
import Message from "../Message";
import MessageInput from "./MessageInput";
import "./MessagePage.css";
import { io } from 'socket.io-client';
import { fetchChannelThunk } from "../../store/channels";

let socket

const MessagePage = ({user}) => {

    const channel = useSelector(state => state.channels.currentChannel)?.channel;
    const messages = channel?.messages
    const dispatch = useDispatch();
    console.log('channel------->',channel)
    console.log('messages------->',messages)

    useEffect(() => {
        socket = io();
        // dispatch(fetchChannelThunk(channel))
        socket.on("chat", (chat) => {
            if(channel) {
                console.log('CHANNEL ID ------>', channel.id)
                dispatch(fetchChannelThunk(channel.id))
            }
            // let msgArr = Object.values(msg.messages)
            // setMessages(messages => [...messages, chat])
        })
        return(() => {
            socket.disconnect()
        })

    },[])


    if(!messages) return null;

    return (
        <div className='message-page'>
            <h2>{channel.channelName}</h2>
            <div className='messages-container'>
            {messages.map(m => <Message key={m.id} message={m} />)}
            </div>

            <div>
                <MessageInput user={user} channelId={channel.id} socket={socket}/>
            </div>
        </div>

    )
}

export default MessagePage
