import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {socket} from './Operations'

const Landing = () => {
    const [room,setRoom]=useState('')
    const [roomList,setRoomList]=useState([])

    useEffect(()=>{
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
        <div>
            <h1>Rooms</h1>
            <input type='text' placeholder='Enter room name' onChange={e=>setRoom(e.target.value)}/>
            <button onClick={setRoomName}>Create Room</button>
            {roomList.map((x,key)=><><Link key={key} to={`/HeyGuys/${x}`}>{x}</Link><br></br></>)}
        </div>
    )
}
export default Landing;