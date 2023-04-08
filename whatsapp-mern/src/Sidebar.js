import React from 'react';
import './Sidebar.css';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a3ba561-3ace-45f1-88c6-6b1e895ba9be/d6gksqz-b3c1664e-3a46-4661-946b-7c07f9be73f1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFhM2JhNTYxLTNhY2UtNDVmMS04OGM2LTZiMWU4OTViYTliZVwvZDZna3Nxei1iM2MxNjY0ZS0zYTQ2LTQ2NjEtOTQ2Yi03YzA3ZjliZTczZjEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2Nz3UDjvuwlorZg-g6svYgpsGxzcTora51oNf0kwONU'/>
                <div className='sidebar__headerRight'>
                    <IconButton>
                       <DonutLargeIcon /> 
                    </IconButton>
                    <IconButton>
                       <ChatIcon /> 
                    </IconButton>
                    <IconButton>
                       <MoreVertIcon /> 
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
  )
}

export default Sidebar