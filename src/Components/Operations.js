import io from "socket.io-client";

export const socket = io("https://watchtogetherapp.herokuapp.com/");
 //export const socket = io("http://localhost:8080/");
 
let player=''
let n=0
let videoReady=false


const loadVideoFunc = (videoId) => {

  player = new window.YT.Player(`youtube-player`, {
    videoId:videoId.split('=')[1],
    playerVars:{
      'rel':0,
      'controls':0,
      'disablekb':0,
    },
    events: {
      'onReady': makeItReady,
    }
  });
};

////////////////////////////////////////////////////

const makeItReady=()=>{
  videoReady=true
}

socket.on('play',(play)=>{
  loadVideoFunc("https://www.youtube.com/watch?v=je_R3gEtDbw")
  if(videoReady)
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

export const loadVideo=(thisVideo)=>{
  loadVideoFunc(thisVideo)
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