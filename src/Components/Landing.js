import React, { useState,useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {socket} from './Operations'
import '../Landing.css'
import Sky from 'react-sky';
import Top from '../Grapics/top.svg'
import Footer from './Footer'

const Landing = () => {
    const [room,setRoom]=useState('')
    const [roomList,setRoomList]=useState([])
    const [top,setTop]=useState(1)
    const history=useHistory()

    useEffect(()=>{
        window.addEventListener('scroll', isScroll)
        localStorage.clear()
        socket.emit('roomList')
    },[])

    const isScroll=()=>{
        if(top!=window)
            setTop(window.pageYOffset);
    }

    socket.on('rooms',rooms=>{
        setRoomList(rooms)
    })

    const setRoomName=()=>{
        socket.emit('addRoom',room,(error)=>{
            alert(error)
            history.push(`/`)
        })
        window.scrollTo(0,window.innerHeight*2)
    }

    return (
        <div id="main-landing">
            <Sky
                images={{
                    0: "https://securityapp22.000webhostapp.com/yt.png", 
                }}
                how={40} 
                time={5} 
                size={'100px'} 
                background={'black'} 
            />
            <div className="intro">
                <h1 className="heading main" style={{fontFamily: 'Notable, sans-serif'}}>watchXP</h1>
                <div className="intro-innerContainer">
                    <h3>What's this?</h3>
                    <p>WatchXP has a simple goal: to make it easy for friends and family to watch videos together, no matter where they are in the world. The whole idea of watchXP is to give you a cool place where you can relax and have fun with your friends adn family.</p>
                    <a class="btn" href='#create-room'>Create room</a>
                    <a class="btn" href='#room-list'>Join room</a>
                </div>
            </div>
            <div id='create-room'>
                <h1 className="heading">Create Room</h1>
                <input className='inpC' type='text' placeholder='Enter room name' onChange={e=>setRoom(e.target.value)}/><br />
                <button style={{margin:'0 auto',maxWidth:'400px'}} className='btn' id='create-btn' onClick={setRoomName}>Create Room</button><br />
                <a style={{margin:'0 auto',maxWidth:'400px'}} class="btn" href='#room-list'> Or just join a room</a>
            </div>
            <div id='room-list'>
                <h1 className='active-room'>Active Rooms</h1>
                {roomList.length>0?
                <div className='room-div'>
                {roomList.map((x,key)=><div className='room-list-container'><h5 className='room-list'>{x}</h5><Link className='join' key={key} to={`/HeyGuys/${x}`}>Join</Link></div>)}
                </div>:<div><p>No active rooms</p><br/><p>You must create one</p><br/></div>}
                <div>
                    <Footer />
                </div>
            </div>
            {window.pageYOffset>40?<a className='top-btn' href='#main-landing'><img height='50' src={Top} alt='top'/></a>:<></>}
        </div>
    )
}
export default Landing;