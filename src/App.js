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
    <>
    <div style={{position:'fixed',zIndex:200,left:left,transition:'0.5s'}}>
        <UsersInRoom handleNav={handleNav}/>
    </div>
    <div style={{position:'fixed',display:'flex',flexDirection:'column',width:'100%'}}>
      <div style={{display:'flex',flexDirection:'column'}}>
        <button className='btn' style={{position:'absolute',zIndex:'10'}} onClick={()=>setLeft(0)}>&#9776;</button>
        <h3 style={{textAlign:'right',margin:'10px'}}>Room: {match.params.room}</h3>
      </div>
      <hr />
      <div className='row'>
        <Video room={match.params.room}/>
        <Chat room={match.params.room}/>
      </div>
    </div>
    <Sky
        images={{
            0: "https://securityapp22.000webhostapp.com/yt.png", 
        }}
        how={40} 
        time={5} 
        size={'100px'} 
        background={'black'} 
      />
    </>
  );
}
 
export default App;