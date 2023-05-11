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
import ThreadsPage from "../ThreadsPage";
import { Redirect } from "react-router-dom";

let socket

const MessagePage = ({ user }) => {

    const channel = useSelector(state => state.channels?.currentChannel?.channel);
    const messages = channel?.messages;
    // const [messages, setMessages] = useState();



    const dispatch = useDispatch();



    // const params = useParams()
    // const channelId = params.channelId

    const { channelId } = useParams();

    let newChannel;
    useEffect(() => {
        socket = io();

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

            socket.disconnect()
        })

    }, [channelId])


    if (!channel || !messages) return null;

    let isMember = false;
    for (let member of channel.members) {
        if (member.id === user.id) isMember = true;
    }

    if (!isMember) return <Redirect to='/' />

    return (
        <div className='message-page'>
            <OpenModalButton
                buttonText={!channel.isDm ? channel.channelName :
                    Object.values(channel.members)
                        .filter((member) => member.id !== user.id)
                        .map((member) => `${member.firstName} ${member.lastName}`)
                        .join(", ")
                }
                // onItemClick={closeMenu}
                modalComponent={<ChannelInfoModal channel={channel} />}
            />
            <div className='messages-container'>
                {messages.map(m => <Message key={m.id} message={m} user={user} socket={socket} />)}
            </div>

            <div>
                <MessageInput user={user} channelId={channel.id} socket={socket} type='message' />
            </div>
        </div>

    )
}

export default MessagePage
