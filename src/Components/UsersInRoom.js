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
            <h3 className='headin'>Room members <button className="btn" onClick={handleNav}>&#10006;</button></h3>
            <div className='userList' style={{marginTop:150}}>
            {users.map((x,key)=><><h2 key={key} className="userName">{x.username}</h2><hr /></>)}
            </div>
        </div>
        </>
    );
}
 
export default UsersInRoom;