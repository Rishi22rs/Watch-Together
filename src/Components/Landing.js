import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    const [room,setRoom]=useState('')
    return ( 
        <div>
            <h1>Rooms</h1>
            <input type='text' placeholder='Enter room name' onChange={e=>setRoom(e.target.value)}/>
            <Link to={room!=''?`/HeyGuys/${room}`:'/'}><button>Create Room</button></Link>
        </div>
    )
}
export default Landing;