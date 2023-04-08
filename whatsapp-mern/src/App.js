import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => { //for the fetching all initial information we need axios 
    axios.get('/messages/sync')
      .then(response => {
        // console.log(response.data);
        setMessages(response.data);
      })
  }, []);

  useEffect(() => { //this piece of useEffect now lets the localhost know when something new is posted is listening
    const pusher = new Pusher('e0b92a94f3c58692354c', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) { //this code below sets up a listener for pusher
      // alert(JSON.stringify(newMessage)); //two ways: refetch the messages, or initially fetch all and everytime one comes in then we just push the new one
      setMessages([...messages, newMessage]) //... means keep all the messages and append the new one
    });
    //clean up function 
    return () => {
      channel.unbind_all(); //everytime we get a new message we ensure we only have one subcriber 
      channel.unsubscribe();
    }
  
  }, [messages]);
  console.log(messages);

  return (
    <div className="app">
        <div className='app__body'>
            {/* sidebar component */}
            <Sidebar />
            {/* chat bar component */}
        <Chat messages={messages} />
        </div>
    </div>
  );
}

export default App;
