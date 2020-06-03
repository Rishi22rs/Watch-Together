import React, { useEffect, useState,useRef } from 'react'
import {sendConn,socket} from './Operations'

const Chat = ({room}) => {
    const messagesEndRef = useRef(null)
    const [msg,setMsg]=useState('')
    const [allChat,setAllChat]=useState([])
    useEffect(()=>{
       const name=prompt('What is your name?')
        // const name='Rishi'
        sendConn({name,room})
        appendMsg(`You joined`)
    },[])

    const scrollToBottom = () => {
        if(messagesEndRef.current!==null)
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    
    const appendMsg=(message)=>{
        setAllChat([...allChat,message])
        scrollToBottom()
    }

    const sendMsg=(e)=>{
        e.preventDefault()
        appendMsg(`You: ${msg}`)
        socket.emit('send-chat-message',msg)
        setMsg('')
    }

    socket.on('user-connected',name=>{
        console.log(name)
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
            <input className="form-control" type="text" placeholder="discuss" onChange={e=>setMsg(e.target.value)} value={msg} autoComplete='off'/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit" onClick={e=>sendMsg(e)}>Send</button>    
            </div>
        </div>
        </form> 
        <div className="chat-box">
        {allChat.map((x,key) =>
            <h6 key={key}>{x}</h6>
        )}
        <div ref={messagesEndRef} style={{marginTop:40}}/>
        </div>
        </>
    )
}
 
export default Chat;