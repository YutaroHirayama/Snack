import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessagesThunk } from "../../store/messages";
import "./MessagePage.css";


const MessagePage = ({channelId, channelName}) => {

    const messages = useSelector(state => state.Messages);
    dispatch = useDispatch();


    useEffect(()=> {

        dispatch(fetchMessagesThunk(channelId))

    }, []);




    return (
        <div className='message-page'>
            <h2>{channelName}</h2>
            <div className='messages-container'>
            {messages.map(m => <Message message={m} />)}

            </div>

            <div>TEXTAREA</div>
        </div>

    )
}
