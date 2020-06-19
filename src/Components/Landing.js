import React, { useState,useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {socket} from './Operations'
import '../App.css'
import Sky from 'react-sky';
import Top from '../Grapics/top.svg'

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
                {roomList.map((x,key)=><div className='room-list-container'><h6 className='room-list'>{x}</h6><Link className='join' key={key} to={`/HeyGuys/${x}`}>Join</Link></div>)}
            </div>
            {window.pageYOffset>40?<a className='top-btn' href='#main-landing'><img height='50' src={Top} alt='top'/></a>:<></>}
        </div>
    )
}
export default Landing;