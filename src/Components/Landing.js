import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {socket} from './Operations'
import '../App.css'

const Landing = () => {
    const [room,setRoom]=useState('')
    const [roomList,setRoomList]=useState([])

    useEffect(()=>{
        localStorage.clear()
        socket.emit('roomList')
    },[])

    socket.on('rooms',rooms=>{
        setRoomList(rooms)
    })

    const setRoomName=()=>{

        socket.emit('addRoom',room,(error)=>{
            alert(error)
        })
    }

    return (
        <div className="main-landing">
            <div className="intro">
                <h1 className="heading">Quarantine buddies</h1>
                <div className="intro-innerContainer">
                    <h3>What's this?</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <a class="btn btn-primary" href='#create-room'>Create room</a>
                    <a class="btn btn-primary" href='#create-room'>Join room</a>
                </div>
            </div>
            <div id='create-room'>
                <h1>Rooms</h1>
                <input type='text' placeholder='Enter room name' onChange={e=>setRoom(e.target.value)}/>
                <button onClick={setRoomName}>Create Room</button>
                {roomList.map((x,key)=><><Link key={key} to={`/HeyGuys/${x}`}>{x}</Link><br></br></>)}
            </div>
        </div>
    )
}
export default Landing;