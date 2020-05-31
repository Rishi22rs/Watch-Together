import React from 'react'
import Video from './Components/Video'
import Chat from './Components/Chat'

const App = () => {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <Video />
      <Chat />
    </div>
  );
}
 
export default App;