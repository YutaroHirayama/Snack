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

    if (!message || !message.threads || message.id !== parseInt(messageId)) return (
        <div className="threads-container">
            <div>
                <div className="threads-header">
                    <h3>Thread</h3>
                    <div className="close-threads-bttn-div">
                        <button
                            className="close-threads-bttn"
                            onClick={closeThreads}><i className="fa-solid fa-xmark"></i></button>

                    </div>
                </div>
                <div className='thread-page'>
                    <img className="profile-pic-msg" src='/placeholder.jpg'></img>
                    <div className="single-message-details">
                        <div className='single-message-header'>

                        </div>
                        <p className="thread-message">{"--------"}</p>
                    </div>
                    <span className="replies-tag">{"--"} replies</span>
                    <div className='threads-container'>
                    </div>
                </div>
            </div>
        </div>
    );

    let isMember = false;
    for (let member of message.channel.members) {
        if (member.id === user.id) {
            isMember = true;
        }
    }

    if (!isMember) return <Redirect to='/' />

    return (
        <div >
            <div className="threads-header">
                <h3>Thread</h3>
                <div className="close-threads-bttn-div">
                    <button
                        className="close-threads-bttn"
                        onClick={closeThreads}><i className="fa-solid fa-xmark"></i></button>

                </div>
            </div>
            <div className='thread-page'>
                <div className="single-thread-message-container">
                    <div className='single-thread-profile-pic'>
                        <img className="profile-pic-msg" src={message.user.profilePic || '/placeholder.jpg'}></img>
                    </div>
                    <div className='single-thread-message'>
                        <div className='single-thread-header'>
                            <div className='single-thread-header-info'>
                                <span>{message.user.firstName} {message.user.lastName} </span>
                                <span className="time" title={getTime(message.createdAt).datetime}>{getTime(message.createdAt).time}</span>
                            </div>
                        </div>
                        <div className="thread-message">{message.message}</div>
                    </div>
                </div>
                <div className='thread-replies'>
                    <span className="replies-tag">{message.threads.length} replies ---------------------------------</span>
                </div>
                <div className='threads-container'>
                    <div>
                        {message?.threads.map(thread =>
                            <div key={thread.id} className='single-thread-message-container'>
                                <div className='single-thread-profile-pic'>
                                    <img className="profile-pic-msg" src={thread?.user.profilePic}></img>
                                </div>
                                <div className='single-thread-message'>
                                    <div className='single-thread-header'>
                                        <div className='single-thread-header-info'>
                                            <span className="names-in-threads">{thread?.user.firstName} {thread?.user.lastName} </span>
                                            <span className="time" title={getTime(thread.createdAt).datetime}>{getTime(thread.createdAt).time}</span>
                                        </div>
                                        {thread?.user.id === user.id && <OpenModalButton
                                            buttonText={"Delete"}
                                            className='single-thread-delete-button'
                                            modalComponent={<DeleteMessageModal message={thread} socket={threadSocket} type={"thread"} channelId={message.channelId} />}
                                        />}
                                    </div>
                                    <div>{thread?.threadMessage}</div>
                                </div>
                            </div>)}
                    </div>
                </div>
                <div>
                    <MessageInput user={user} messageId={message.id} socket={threadSocket} type='thread' />
                </div>
            </div>
        </div>
    )
}

export function getTime(timeDate) {
    const dateObj = new Date(timeDate);
    const timeZone = dateObj.toTimeString();

    const year = dateObj.getFullYear();
    const monthInteger = dateObj.getMonth() + 1;
    const dayInt = dateObj.getDate();
    const month = String(monthInteger).length === 1 ? `0${monthInteger}` : `${monthInteger}`;
    const day = String(dayInt).length === 1 ? `0${dayInt}` : `${dayInt}`;

    let monthWord;

    switch (monthInteger) {
        case 1: monthWord = 'January'
        case 2: monthWord = 'February'
        case 3: monthWord = 'March'
        case 4: monthWord = 'April'
        case 5: monthWord = 'May'
        case 6: monthWord = 'June'
        case 7: monthWord = 'July'
        case 8: monthWord = 'August'
        case 9: monthWord = 'September'
        case 10: monthWord = 'October'
        case 11: monthWord = 'November'
        default: monthWord = 'December'
    }

    const militaryHours = dateObj.getHours();
    const minutesInteger = dateObj.getMinutes();
    const secondsInteger = dateObj.getSeconds();
    const minutes = String(minutesInteger).length === 1
        ? `0${minutesInteger}` : String(minutesInteger).length === 0
            ? `00` : `${minutesInteger}`;
    const seconds = String(secondsInteger).length === 1
        ? `0${secondsInteger}` : String(secondsInteger).length === 0
            ? `00` : `${secondsInteger}`;

    const suffix = militaryHours >= 12 ? 'PM' : 'AM';
    const hours = ((militaryHours + 11) % 12 + 1);

    const zone = timeZone.slice(9);

    const dayPostfix = dayInt === 1 ? 'st' : dayInt === 2 ? 'nd' : dayInt === 3 ? 'rd' : 'th'

    return {
        time: `${hours}:${minutes} ${suffix}`,
        date: `${year}-${month}-${day}`,
        zone,
        datetime: `${monthWord} ${dayInt}${dayPostfix} at ${hours}:${minutes}:${seconds} ${suffix}`,
    };
}

export default ThreadsPage;
