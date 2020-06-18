import React, { useEffect, useState } from 'react';
import '../Styles/styles.css'
import {playVideo,pauseVideo,loadVideo,anchorMovement,clicked,socket, loadVideoFunc} from './Operations'

const YouTubeVideo =({room})=>{

  const[videoId,setVideoId]=useState('')
  const[left,setLeft]=useState(0)
  const[isVideoId,setIsVideoId]=useState(false)
  const height=window.innerWidth*(9/16)

  useEffect(() => {
    loadYT()
  },[])
  
  socket.on('play',(clicked)=>{ 
    setInterval(()=>{
      setLeft(anchorMovement())
    },1000)
  })

  const loadYT=()=>{
    if (!window.YT) { 
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }


  // const refreshPage=()=> {
  //   socket.emit('refresh')
  //   window.location.reload(false);
  // }

  // socket.on('doRefresh',()=>{
  //   refreshPage()
  //   console.log('refresh')
  // })

  const getVideoId=()=>{
    socket.emit('getVideoId',room)
  }
  socket.on('loVideoId',(videoId)=>loadVideoFunc(videoId[0].videoId,room))

  return (
    <div style={{width:'100%',position:'absolute',height:'50%'}}>
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="Paste the youtube video link here" aria-label="Recipient's username" onChange={e=>setVideoId(e.target.value)} aria-describedby="button-addon2" />
      <div className="input-group-append">
      <button onClick={()=>{
        loadYT()
        loadVideo(videoId,room)
      }} className="btn btn-outline-secondary">Show</button>
      </div>
    </div>
    {/* <div style={{width:'100%',height:`${height}px`,zIndex:100}}></div> */}
    <div id={`youtube-player`} style={{width:'100%',height:`${height}px`}}/><br></br>
    <button className="btn btn-outline-success" onClick={()=>{
      playVideo()
      setInterval(()=>{
        setLeft(anchorMovement())
      },1000)
    }}>Play</button>
    <button className="btn btn-outline-danger" onClick={pauseVideo}>Pause</button>
    {/* <button className="btn btn-outline-danger" onClick={getVideoId}>Get VideoId</button> */}
    <div id="line" onClick={(e)=>setLeft(clicked(e))}>
      <div id="anchor" style={{left:`${left}%`}}></div>
    </div>
    </div>
  );
};

export default YouTubeVideo;
