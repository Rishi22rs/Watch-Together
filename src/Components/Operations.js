import io from "socket.io-client";

export const socket = io("https://watchtogetherapp.herokuapp.com/");
//  export const socket = io("http://localhost:8080/");
 
let player=''
let n=0
let videoReadyHai=false

export const loadVideoFunc = (videoId,room) => {
  player = new window.YT.Player(`youtube-player`, {
    videoId:videoId.split('=')[1],
    playerVars:{
      'rel':0,
      'controls':0,
      'disablekb':0,
    }
  });
  console.log(player)
  if(room!==undefined)
    socket.emit('addVideoId',{roomName:room,videoId}) 
};

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
  console.log(player)
	player.playVideo()
}

const pauseVideoFunc=()=> {
  console.log(player)
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