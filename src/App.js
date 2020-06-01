import React from 'react'
import Video from './Components/Video'
import Chat from './Components/Chat'

const App = () => {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className="video">
        <Video />
      </div>
      <div className="chat">
        <Chat />
      </div>
    </div>
  );
}
 
export default App;