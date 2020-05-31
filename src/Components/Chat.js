import React, { useEffect, useState } from 'react'
import {sendConn,socket} from './Operations'

const Chat = () => {
    const [msg,setMsg]=useState('')
    const [allChat,setAllChat]=useState([])
    useEffect(()=>{
        const name=prompt('What is your name?')
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
            <input type="text" placeholder="discuss" onChange={e=>setMsg(e.target.value)} value={msg}/>
            <button type="submit" onClick={e=>sendMsg(e)}>Send</button>    
        </form> 
        <div id='msg-container'>
        {allChat.map(x =>
            <h1>{x}</h1>
        )}
        </div>
        </>
    )
}
 
export default Chat;