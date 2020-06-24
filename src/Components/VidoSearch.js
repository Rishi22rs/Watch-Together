import React, { useState } from 'react'
import axios from 'axios'

const VideoSearch=()=>{
    const [search,setSearch]=useState('')
    const API_KEY='AIzaSyDlLtPYM_8UX034ML_VTAAvmahsjdZ6H5U'
    const getResult=()=>{
        axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=50&q=${search}&key=${API_KEY}`)
        .then(res=>console.log(res))
    }

    return(
        <div>
            <input type='text' onChange={e=>setSearch(e.target.value)}/>
            <button onClick={getResult}>Get me</button>
        </div>
    )
}

export default VideoSearch