import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessagesThunk } from "../../store/messages";
import Message from "../Message";
import MessageInput from "./MessageInput";
import "./MessagePage.css";
import { io } from 'socket.io-client';
import { fetchChannelThunk } from "../../store/channels";
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import ChannelInfoModal from "../ChannelInfoModal";

let socket

const MessagePage = ({ user }) => {

    const channel = useSelector(state => state.channels?.currentChannel?.channel);
    const messages = channel?.messages;
    // const [messages, setMessages] = useState();

    const dispatch = useDispatch();

    console.log('messages------->', messages)
    // const params = useParams()
    // const channelId = params.channelId

    const { channelId } = useParams();
    console.log('CHANNEL ID --------->', channelId)
    let newChannel;
    useEffect(() => {
        socket = io();
        console.log('INSIDE USE EFFECT')
        dispatch(fetchChannelThunk(parseInt(channelId)))
        socket.on("chat", (chat) => {

            newChannel = dispatch(fetchChannelThunk(channelId))
            // console.log('newChannel ----->', newChannel)
            // let msgArr = newChannel.channel.messages
            // console.log(msgArr)
            // setMessages(...msgArr)

            // let msgArr = Object.values(msg.messages)
            // setMessages(messages => [...messages, chat])
        })
        return (() => {
            console.log("UNMOUNTED")
            socket.disconnect()
        })

    }, [channelId])


    if (!channel || !messages) return null;

    return (
        <div className='message-page'>
            <OpenModalButton
                buttonText={channel.channelName}
                // onItemClick={closeMenu}
                modalComponent={<ChannelInfoModal channel={channel} />}
            />
            <div className='messages-container'>
                {messages.map(m => <Message key={m.id} message={m} user={user} socket={socket} />)}
            </div>

            <div>
                <MessageInput user={user} channelId={channel.id} socket={socket} />
            </div>
        </div>

    )
}

export default MessagePage
