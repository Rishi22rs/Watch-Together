import React, { useEffect, useState,useRef } from 'react'
import {sendConn,socket} from './Operations'
import {useHistory } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({room}) => {
    const history=useHistory()
    const [msg,setMsg]=useState('')
    const [allChat,setAllChat]=useState([])
    const [disable,setDisable]=useState(false)
    useEffect(()=>{
        if(localStorage.getItem('chats')!==null)
            setAllChat(localStorage.getItem('chats').split(','))
        const name=prompt('What is your name?')
        // const name='Rishi'
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

    
    const appendMsg=(message)=>{
        setAllChat([...allChat,message])
    }

    const sendMsg=(e)=>{
        e.preventDefault()
        setDisable(true)
        appendMsg(`You: ${msg}`)
        socket.emit('send-chat-message',msg)
        setMsg('')
        setTimeout(()=>{
            setDisable(false)
        },3000)
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
        <div className="col-md-6">
        {/* <VideoSearch /> */}
        <form>
        <div className="chat-inp" style={{display:'flex',position:'fixed',width:'100%',zIndex:20}}>
            <input className='inpC' disabled={disable} style={!disable?{margin:0,borderRadius:10,height:45,zIndex:10}:{margin:0,borderRadius:10,height:45,zIndex:10,border:'3px solid black'}} type="text" placeholder="discuss" onChange={e=>setMsg(e.target.value)} value={msg} autoComplete='off'/>
            <button className="btn" style={{height:45,margin:0,zIndex:10}} type="submit" onClick={e=>sendMsg(e)}>Send</button>    
        </div>
        </form> 
        <ScrollToBottom className="chat-box">
        {allChat.map((x,key) =>
            <h6 style={{textAlign:'left'}} key={key}>{x}</h6>
        )}
        </ScrollToBottom>
        </div>
    )
}
 
export default Chat;