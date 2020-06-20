import React, { useEffect, useState } from 'react';
import '../Styles/styles.css'
import {playVideo,pauseVideo,loadVideo,anchorMovement,clicked,socket, loadVideoFunc} from './Operations'

const YouTubeVideo =({room})=>{

  const[videoId,setVideoId]=useState('')
  const[left,setLeft]=useState(0)
  const[opa,setOpa]=useState(0)
  const[isVideoId,setIsVideoId]=useState(false)
  const height=window.innerWidth*(9/16)
  let o=false

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

  const toggleOpa=()=>{
    console.log('toggling')
    setOpa(0.5)
    setTimeout(()=>{
      setOpa(0)
    },2000)
  }

  const getVideoId=()=>{
    socket.emit('getVideoId',room)
  }
  socket.on('loVideoId',(videoId)=>loadVideoFunc(videoId[0].videoId,room))

  return (
    <div style={{width:'100%',position:'absolute',height:'50%'}}>
    <div style={{display:'flex',marginTop:-20}}>
      <input type="text" className='inpC' style={{margin:0,borderRadius:10,height:45}} placeholder="Paste the youtube video link here" aria-label="Recipient's username" onChange={e=>setVideoId(e.target.value)} aria-describedby="button-addon2" />
      <div>
      <button className="btn" style={{margin:0}} onClick={()=>{
        loadYT()
        loadVideo(videoId,room)
      }}>Show</button>
      </div>
    </div>
    {/* <div style={{width:'100%',height:`${height}px`,zIndex:100}}></div> */}
    <div id={`youtube-player`} style={{width:'100%',height:`${height}px`}}/><br></br>
    <div className="video-overlay" style={{height:`${height}px`,opacity:`${opa}`}} onMouseOver={toggleOpa} >
    <div style={{position:'absolute',width:'100%',height:`${height}px`}}>
    <button className="btn" style={{position:'relative',top:'40%',left:'30%'}} onClick={()=>{
      playVideo()
      setInterval(()=>{
        setLeft(anchorMovement())
      },1000)
    }}>Play</button>
    <button className="btn" style={{position:'relative',top:'40%',left:'25%'}} onClick={pauseVideo}>Pause</button>
    </div>
    </div>
    {/* <button className="btn btn-outline-danger" onClick={getVideoId}>Get VideoId</button> */}
    <div id="line" onClick={(e)=>setLeft(clicked(e))}>
      <div id="anchor" style={{left:`${left}%`}}></div>
    </div>
    </div>
  );
};

export default YouTubeVideo;
