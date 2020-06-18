import io from "socket.io-client";

// export const socket = io("https://watchtogetherapp.herokuapp.com/");
 export const socket = io("http://localhost:8080/");
 
let player=''
let n=0
let videoReadyHai=false
let i=false

export const loadVideoFunc = (videoId,room) => {
  if(!i&&videoId){
    player = new window.YT.Player(`youtube-player`, {
      videoId:extractVideoId(videoId),
      playerVars:{
        'rel':0,
        'controls':0,
        'disablekb':0,
        'autoplay': 0
      }
    });
    console.log(player)
    if(room!==undefined)
      socket.emit('addVideoId',{roomName:room,videoId}) 
  }
  console.log(i)
  if(i&&videoId){  
    loadThis(extractVideoId(videoId))
  }
  if(videoId)i=true
};


const extractVideoId=(video_id)=>{
  var ampersandPosition = video_id.indexOf('&');
  if(ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
    video_id=video_id.split('=')[1]
    return video_id
  }
}

const loadThis=(videoId)=>{
  player.loadVideoById({'videoId': videoId});
  pauseVideoFunc()
}
////////////////////////////////////////////////////

socket.on('play',(play)=>{
  console.log(player)
  playVideoFunc()
})

socket.on('pause',(pause)=>{
  pauseVideoFunc()
})
socket.on('click',(clicked)=>{
  player.seekTo(clicked/100*player.getDuration(),true);
})

socket.on('thisVideo',(thisVideo)=>{
  loadVideoFunc(thisVideo)
})

////////////////////////////////////////////////////

export const sendConn=(data,callback)=>{
  let err=null
  socket.emit('join',data,(error)=>{
    callback(error)
  })
}

export const loadVideo=(thisVideo,room)=>{
  loadVideoFunc(thisVideo,room)
  socket.emit('videoUrl',thisVideo)
}

export const pauseVideo=()=> {
  pauseVideoFunc()
  socket.emit('pauseUser','pause')     
}

export const playVideo=()=> { 
  playVideoFunc()
  socket.emit('playUser','play')  
}

export const clicked=(event)=>{
  let value=clickedFunc(event)
  socket.emit('clicked',value)
}

////////////////////////////////////////////////////

const playVideoFunc=()=>{
	player.playVideo()
}

const pauseVideoFunc=()=> {
	player.pauseVideo();
}

export const anchorMovement=()=>{
	n = player&&player.getCurrentTime()/player.getDuration()*100;
	return n
}
  
const clickedFunc=(event)=>{
  var value=event.clientX/window.innerWidth*100
  player.seekTo(value/100*player.getDuration(), true);
  return value;
} 