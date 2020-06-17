import React, { useState } from 'react'

const MyVideo = () => {
    const [show,setShow]=useState(false)
    const [videoLink,setVideoLink]=useState('')

    return ( 
        <div>
            <input type='text' onChange={e=>setVideoLink(e.target.value)} value={videoLink}/>
            <button onClick={()=>setShow(true)}>Show</button>
            {show?
            <video  width='400' controls>
                <source src={videoLink} type="video/ogg" />
                Your browser does not support HTML video.
            </video>:<></>}
        </div>
    )
}
 
export default MyVideo;