import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import './Chat.css'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoodIcon from '@mui/icons-material/Mood';
import MicIcon from '@mui/icons-material/Mic';
import axios from './axios';
function Chat({ messages }) {
    //to store the input data from the user
    const [input, setInput] = useState("");

    const sendMessage = async (e) => { //to avoid the default refresh that comes with the button already by default
        e.preventDefault();

        await axios.post("/messages/new", { //works like if we posting in postman when the event of typing gets entered and we receive input
            message: input,
            name: "DEMON APP",
            timestamp: "timestamp",
            received: false,
        });

        setInput(""); //to reset the input
    }
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />

                <div className='chat__headerInfo'>
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map((message) => ( //map returns jsx 
                    <p 
                    className={`chat__message ${message.received && "chat__reciever"}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
                            {/* {new Date().toUTCString()} */}
                            {message.timestamp}
                        </span>
                    </p>))}
                    {/* <p className='chat__message chat__reciever'> has both classnames for both styles
                        <span className='chat__name'>tavo</span>
                        This is a message to receiver
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                            {new Date().toUTCString()}
                        </span>
                    </p> */}
            </div>
            <div className='chat__footer'>
                <MoodIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)} /*what user just typed in */
                        placeholder='Type of message'
                        type='text'
                    />
                    <button
                        onClick={sendMessage}
                        type='submit'
                    >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div> 
  )
}

export default Chat