import React, { useEffect } from 'react'
import Video from './Components/Video'
import Chat from './Components/Chat'
import { socket } from './Components/Operations'

const App = ({match}) => {
  window.addEventListener("popstate", e => {
    socket.emit('disconnect')
  })
  console.log(localStorage.getItem('name'))
  if(localStorage.getItem('name')===null){
    const name=prompt('What is your name?')
    localStorage.setItem('name',name)
  }

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