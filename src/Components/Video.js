import React, { useEffect, useState } from 'react';
import '../Styles/styles.css'
import {playVideo,pauseVideo,loadVideo,anchorMovement,clicked,socket} from './Operations'
import axios from 'axios'

const YouTubeVideo =({room})=>{

  const[videoId,setVideoId]=useState('')
  const[result,setResult]=useState([])
  const[left,setLeft]=useState(0)
  const[opa,setOpa]=useState(1)
  const[linkBtn,setLinkBtn]=useState('none')
  const[searchBtn,setSearchBtn]=useState('none')
  const height=window.innerWidth*(9/16)
  let o=false
  const API_KEY='AIzaSyDlLtPYM_8UX034ML_VTAAvmahsjdZ6H5U'

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


  const toggleOpa=()=>{
    setOpa(0.5)
    setTimeout(()=>{
      setOpa(0)
    },2000)
  }

  const getVideoId=()=>{
    socket.emit('getVideoId',room)
  }
 // socket.on('loVideoId',(videoId)=>loadVideoFunc(videoId[0].videoId,room))

  const getResult=(search)=>{
    axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=50&q=${search}&key=${API_KEY}`)
    .then(res=>{
      console.log(res.data.itens)
      setResult(res.data.items)
    })
  }
  return (
    <div className='col-md-6'>
      <div>
        <button className="btn" onClick={()=>{
          setLinkBtn('flex')
          setSearchBtn('none')
        }}>Paste a link</button>
        <button className="btn" onClick={()=>{
          setLinkBtn('none')
          setSearchBtn('flex')
        }}>Search for video</button>
        <button className="btn" onClick={()=>{
          setLinkBtn('none')
          setSearchBtn('none')
        }}>&#8691;</button>
        <button className="btn" style={{position:'relative',top:'40%',left:'25%'}} onClick={getVideoId}>get me</button>
      </div>
      <div style={{display:linkBtn,marginBottom:10}}>
        <input type="text" className='inpC' style={{maxWidth:'100%',margin:0}} placeholder="Paste the youtube video link here" onChange={e=>setVideoId(e.target.value)}/>
        <button className="btn" style={{height:50,margin:0}} onClick={()=>{
          loadYT()
          loadVideo(videoId,room)
        }}>Show</button>
      </div>
      <div style={{display:searchBtn,marginBottom:10}}>
        <input type="text" className='inpC' style={{maxWidth:'100%',margin:0}} placeholder="Search your video" onChange={e=>setVideoId(e.target.value)}/>
        <button className="btn" style={{height:50,margin:0}} onClick={()=>{
          console.log(getResult(videoId))
          setResult(getResult(videoId))
        }}>Show</button>
      </div>
    <div style={{position:'relative'}}>
      <div id={`youtube-player`} style={{width:'100%',maxWidth:'1000px',height:`${height}px`,maxHeight:562.5,position:'absolute'}}/>
      <div style={{position:'absolute',zIndex:40,overflow:'auto',minHeight:0,maxHeight:`${height}px`}}>
        {
          result&&result.map(x=><button onClick={()=>{
            console.log(x.id.videoId)
            loadYT()
            loadVideo(`R=${x.id.videoId}`,room)
            setResult([])
          }}>{x.id.videoId}</button>)
        }
      </div>
      <div className="video-overlay" style={{height:`${height}px`,maxHeight:562.5,opacity:opa}} onMouseOver={toggleOpa}>
        <button className="btn" style={{position:'relative',top:'40%',left:'30%'}} onClick={()=>{
          playVideo()
          setInterval(()=>{
            setLeft(anchorMovement())
          },1000)
        }}>Play</button>
        <button className="btn" style={{position:'relative',top:'40%',left:'25%'}} onClick={pauseVideo}>Pause</button>
      </div>
    </div>
    <div id="line" onClick={(e)=>setLeft(clicked(e))}>
      <div id="anchor" style={{left:`${left}%`}}></div>
    </div>
    </div>
  );
};

export default YouTubeVideo;
