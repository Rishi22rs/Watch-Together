import React, { useEffect, useState } from 'react';
import './Styles/styles.css'
import {playVideo,pauseVideo,loadVideo,anchorMovement,clicked,socket} from './Components/Operations'
import Chat from './Components/Chat';

const YouTubeVideo =()=>{

  const[videoId,setVideoId]=useState('')
  const[left,setLeft]=useState(0)

  useEffect(() => {

    if (!window.YT) { 
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }
  },[])
  
  socket.on('play',(clicked)=>{
    setInterval(()=>{
      setLeft(anchorMovement())
    },1000)
  })

  return (
    <div >
      <input type="text" id="video-input" placeholder="Paste the youtube video link here" onChange={e=>setVideoId(e.target.value)}/><br></br>
      <div id={`youtube-player`}/><br></br>
      <button onClick={()=>loadVideo(videoId)}>Show</button>
      <button onClick={()=>{
        playVideo()
        setInterval(()=>{
          setLeft(anchorMovement())
        },1000)
      }}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
      <div id="line" onClick={(e)=>setLeft(clicked(e))}>
        <div id="anchor" style={{left:`${left}%`}}></div>
      </div>
      <div style={{marginTop:100}}>
        <Chat />
      </div>
    </div>
  );
};

export default YouTubeVideo;
