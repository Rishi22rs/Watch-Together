import React, { useEffect } from 'react'
import Video from './Components/Video'
import Chat from './Components/Chat'
import { socket } from './Components/Operations'
import {Prompt, useHistory} from 'react-router-dom'

const App = ({match}) => {
  socket.on("roomData",({room,users})=>console.log(room,users))
  
  const history=useHistory()

  document.onbeforeunload = function(){
    
    return 'Are you sure you want to leave?';
  };
  window.addEventListener("popstate", e => {
    socket.emit('disconnectMe')
  })

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
        {/* <Prompt
          message={(location, action) => {
            return  `You will be romoved from the room.`
          }}
        /> */}
      <div className="video">
        <Video room={match.params.room}/>
      </div>
      <div className="chat">
        <Chat room={match.params.room}/>
      </div>
    </div>
  );
}
 
export default App;