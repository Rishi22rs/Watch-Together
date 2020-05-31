import React, { useEffect, useState } from 'react'
import {sendConn,socket} from './Operations'

const Chat = () => {
    const [msg,setMsg]=useState('')
    const [allChat,setAllChat]=useState([])
    useEffect(()=>{
        const name=prompt('What is your name?')
        // const name='Rishi'
        sendConn(name)
        appendMsg(`You joined`)
    },[])
    
    const appendMsg=(message)=>{
        setAllChat([...allChat,message])
    }

    const sendMsg=(e)=>{
        e.preventDefault()
        appendMsg(`You: ${msg}`)
        socket.emit('send-chat-message',msg)
        setMsg('')
    }

    socket.on('user-connected',name=>{
        appendMsg(`${name} connected`)
    })
    socket.on('chat-message',data=>{
        appendMsg(`${data.name}: ${data.message}`)
    })
    socket.on('user-disconnected',name=>{
        appendMsg(`${name} disconnected`)
    })

    return (
        <>
        <form>
        <div className="input-group mb-3">
            <input className="form-control" type="text" placeholder="discuss" onChange={e=>setMsg(e.target.value)} value={msg}/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit" onClick={e=>sendMsg(e)}>Send</button>    
            </div>
        </div>
        </form> 
        <div id='msg-container'>
        {allChat.map((x,key) =>
            <h1 key={key}>{x}</h1>
        )}
        </div>
        </>
    )
}
 
export default Chat;