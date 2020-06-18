import React, { useEffect, useState,useRef } from 'react'
import {sendConn,socket} from './Operations'
import { Redirect,useHistory } from 'react-router-dom'

const Chat = ({room}) => {
    const history=useHistory()
    const messagesEndRef = useRef(null)
    const [msg,setMsg]=useState('')
    const [allChat,setAllChat]=useState([])
    useEffect(()=>{
        if(localStorage.getItem('chats')!==null)
            setAllChat(localStorage.getItem('chats').split(','))
        const name=prompt('What is your name?')
        sendConn({name,room},(error)=>{
            if(error){
                console.log(error)
                alert(error)
                history.push('/')
            }
        })
        if(localStorage.getItem('chats')===null)
            appendMsg(`You joined`)
    },[])

    const scrollToBottom = () => {
        if(messagesEndRef.current!==null)
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    
    const appendMsg=(message)=>{
        setAllChat([...allChat,message])
        localStorage.setItem('chats',allChat)
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