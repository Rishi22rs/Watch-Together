import React, { useEffect, useState } from 'react'
import Video from './Components/Video'
import Chat from './Components/Chat'
import { socket } from './Components/Operations'
import UsersInRoom from './Components/UsersInRoom'
import Sky from 'react-sky'

const App = ({match}) => {
  window.addEventListener("popstate", e => {
    socket.emit('disconnect')
  })

  const [left,setLeft]=useState(-500)

  const handleNav=()=>{
    setLeft(-500)
  }

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <Sky
        images={{
            0: "https://securityapp22.000webhostapp.com/yt.png", 
        }}
        how={40} 
        time={5} 
        size={'100px'} 
        background={'black'} 
      />
      <button className='btn' onClick={()=>setLeft(0)}>Nav</button>
      <div style={{position:'fixed',zIndex:200,left:left,transition:'0.5s'}}>
        <UsersInRoom handleNav={handleNav}/>
      </div>
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