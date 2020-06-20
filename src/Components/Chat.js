import React, { useEffect, useState,useRef } from 'react'
import {sendConn,socket} from './Operations'
import {useHistory } from 'react-router-dom'

const Chat = ({room}) => {
    const history=useHistory()
    const messagesEndRef = useRef(null)
    const [msg,setMsg]=useState('')
    const [allChat,setAllChat]=useState([])
    useEffect(()=>{
        if(localStorage.getItem('chats')!==null)
            setAllChat(localStorage.getItem('chats').split(','))
        // const name=prompt('What is your name?')
        const name='Rishi'
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
        window.scrollTo(0,window.innerHeight)
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
        <div style={{display:'flex',position:'fixed',width:'100%',bottom:0}}>
            <input className='inpC' style={{margin:0,borderRadius:10,height:45,zIndex:10}} type="text" placeholder="discuss" onChange={e=>setMsg(e.target.value)} value={msg} autoComplete='off'/>
            <button className="btn" style={{height:45,margin:0,zIndex:10}} type="submit" onClick={e=>sendMsg(e)}>Send</button>    
        </div>
        </form> 
        <div className="chat-box">
        {allChat.map((x,key) =>
            <h6 ref={messagesEndRef} style={{textAlign:'left'}} key={key}>{x}</h6>
        )}
        <div  style={{marginTop:40}}/>
        </div>
        </>
    )
}
 
export default Chat;