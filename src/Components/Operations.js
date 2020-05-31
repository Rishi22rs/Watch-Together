import io from "socket.io-client";

export const socket = io("https://watchtogetherapp.herokuapp.com/");

let player=''
let n=0


const loadVideoFunc = (videoId) => {

  player = new window.YT.Player(`youtube-player`, {
    videoId:videoId.split('=')[1],
    playerVars:{
      'rel':0,
      'controls':0,
      'disablekb':0,
    }
  });
};

////////////////////////////////////////////////////

socket.on('play',(play)=>{
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

export const sendConn=(name)=>{
  socket.emit('new-user',name)
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