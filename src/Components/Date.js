import React from 'react'
import DateTime from './DateTime';

const DateIS = () => {
    const getData=(d)=>{
        console.log(d);
    }
    
    return ( 
        <DateTime dateTime={true} dateObj={new Date()} interval={15} />
    )
}
 
export default DateIS;