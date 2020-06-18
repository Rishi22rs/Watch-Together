import React, { useState,useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {socket} from './Operations'
import '../App.css'
import Sky from 'react-sky';

const Landing = () => {
    const [room,setRoom]=useState('')
    const [roomList,setRoomList]=useState([])
    const history=useHistory()

    useEffect(()=>{
        localStorage.clear()
        socket.emit('roomList')
    },[])

    socket.on('rooms',rooms=>{
        setRoomList(rooms)
    })

    const setRoomName=()=>{
        history.push(`/HeyGuys/${room}`)
        socket.emit('addRoom',room,(error)=>{
            alert(error)
            history.push(`/`)
        })
    }

    return (
        <div className="main-landing">
            <Sky
                images={{
                    /* FORMAT AS FOLLOWS */
                    0: "https://lh3.googleusercontent.com/proxy/u6clQpTi1D-EeIfvM_Pmei1zu9w2cT_6KtR9icleGKf6vC0DZ5mtqHnDJnWyTe3gwpQ8I5vUlDoiKQZGwjBoKLc05yTbhkNPYNg5smDUIcS89t4q8lk", 
                }}
                how={40} /* Pass the number of images Sky will render chosing randomly */
                time={5} /* time of animation */
                size={'50px'} /* size of the rendered images */
                background={'black'} /* color of background */
            />
            <div className="intro">
                <h1 className="heading">Quarantine buddies</h1>
                <div className="intro-innerContainer">
                    <h3>What's this?</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <a class="btn" href='#create-room'>Create room</a>
                    <a class="btn" href='#create-room'>Join room</a>
                </div>
            </div>
            <div id='create-room'>
                <h1 className="heading">Create Room</h1>
                <input type='text' placeholder='Enter room name' onChange={e=>setRoom(e.target.value)}/>
                <button onClick={setRoomName}>Create Room</button>
                {roomList.map((x,key)=><><Link key={key} to={`/HeyGuys/${x}`}>{x}</Link><br></br></>)}
            </div>
        </div>
    )
}
export default Landing;