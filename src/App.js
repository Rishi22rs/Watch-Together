import React from 'react'
import Video from './Components/Video'
import Chat from './Components/Chat'
import { socket } from './Components/Operations'

const App = ({match}) => {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className="video">
        <Video />
      </div>
      <div className="chat">
        <Chat room={match.params.room}/>
      </div>
    </div>
  );
}
 
export default App;