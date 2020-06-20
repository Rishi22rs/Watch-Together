import React, { useState } from 'react'
import { socket } from './Operations'

const UsersInRoom = ({handleNav}) => {
    const [users,setUsers]=useState([])

    socket.on('roomData',(data)=>{
        console.log(data)
        setUsers(data.users)
    })

    return (
        <>
        <div className='room-members'>
            <h3 style={{position:'fixed',background:'#0c0a0a',padding:20,width:300}}>Room members <button className="btn" onClick={handleNav}>&#10006;</button></h3>
            <div style={{marginTop:150}}>
            {users.map(x=><><h2 className="userName">{x.username}</h2><hr /></>)}
            </div>
        </div>
        </>
    );
}
 
export default UsersInRoom;