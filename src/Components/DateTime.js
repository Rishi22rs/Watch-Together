//porps:
// dateObj={new Date()}
// dateTime={true}
// prevDateAllowed={true}
// interval={15} 15min or 30min
// onSelect={this.getData}

import React,{useState,useEffect} from 'react'
const DateTime = (props) =>{
    let noOfDays=31
    const [moveMonth,setMoveMonth]=useState(window.innerWidth/4)
    const [moveDay,setMoveDay]=useState(window.innerWidth/2.7)
    const [activeDay,setActiveDay]=useState(1)
    const [activeMonth,setActiveMonth]=useState(1)
    const [activeTime,setActiveTime]=useState(0)
    const [moveTime,setMoveTime]=useState(window.innerWidth/3.2)
    const timeArr=[]
    const btnStyle={
        outline:"none",
        background:"#f7f7f7",
        border:"none",
        fontSize:20,
        borderRadius:"4%",
        width:200,
        height:70,
        color:"#494949",
        opacity:1,
    }
    const btnTimeStyle={
        outline:"none",
        background:"white",
        border:"none",
        fontSize:20,
        borderRadius:"10px",
        width:150,
        height:50,
        color:"#494949",
        opacity:1,
    }
    const opacityBtnStyle={
        outline:"none",
        background:"white",
        border:"none",
        fontSize:20,
        borderRadius:"4%",
        width:100,
        height:70,
        color:"#494949",
        opacity:0.5,
    }
    const daysBtn={
        outline:"none",
        background:"white",
        border:"none",
        fontSize:25,
        borderRadius:"4%",
        width:100,
        height:70,
        color:"#494949",
        transition:"0.5s",
    }
    const subBtn={
        position:"absolute",
        top:300,
        outline:"none",
        background:"#3daeff",
        border:"none",
        fontSize:20,
        borderRadius:"4%",
        width:"90%",
        height:50,
        marginLeft:"5%",
        color:"#f7f7f7",
    }
    const monthContainer={
        position:"absolute",
        left:moveMonth,
        display:"flex",
        flexDirection:"row",
        width:2400,
        transition:"1s",
    }
    const daysContainer={
        position:"absolute",
        left:moveDay,
        top:100,
        display:"flex",
        flexDirection:"row",
        width:3100,
        transition:"1s",
    }
    const timeContainer={
        position:"absolute",
        left:moveTime,
        top:200,
        display:"flex",
        flexDirection:"row",
        width:50000,
        transition:"1s",
    }
    const leftBtn={
        position:"absolute",
        top:400,
        left:"5%",
    }
    const rightBtn={
        position:"absolute",
        top:400,
        right:"5%",
    }
    const rightBtnDay={
        position:"absolute",
        top:450,
        right:"5%",
    }
    const leftBtnDay={
        position:"absolute",
        top:450,
        left:"5%",
    }
    const leftBtnTime={
        position:"absolute",
        top:500,
        left:"5%",
    }
    const rightBtnTime={
        position:"absolute",
        top:500,
        right:"5%",
    }
    const active={
        outline:"none",
        background:"#494949",
        border:"none",
        fontSize:25,
        borderRadius:"10px",
        width:200,
        height:70,
        color:"#f7f7f7",
        transition:"1s",
        fontWeight:"bold",
    }
    const activeDayBtn={
        outline:"none",
        background:"#494949",
        border:"none",
        fontSize:25,
        borderRadius:"10px",
        width:100,
        height:70,
        color:"#f7f7f7",
        transition:"1s",
        fontWeight:"bold",
    }
    const activeTimeBtn={
        outline:"none",
        background:"#494949",
        border:"none",
        fontSize:22,
        borderRadius:"10px",
        width:150,
        height:50,
        color:"#f7f7f7",
        transition:"1s",
        fontWeight:"bold",
    }
    const opacityTimeBtn={
        outline:"none",
        background:"white",
        border:"none",
        fontSize:20,
        borderRadius:"4%",
        width:150,
        height:50,
        color:"#494949",
        transition:"1s",
        opacity:0.5,
    }
    const shortMon=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"]
    const months=["January","February","March","April","May","June","July","August","September","October","November","Decemeber"]
    const initialState={
        dateTime:props.dateTime,
        interval:props.interval,
        prevDateAllowed:props.prevDateAllowed,
        maxTimeAllowed:props.maxTimeAllowed,
        minTimeAllowed:props.minTimeAllowed,
        defaultDate:props.defaultDate,
        defaultMonth:props.defaultMonth,
        dateObj:props.dateObj,
    }
    const dateTime=new Date()
    const currentHr = dateTime.getHours()
    const currentMin = dateTime.getMinutes()
    const date = initialState.dateObj.getDate()
    const month = initialState.dateObj.getMonth() + 1
    const year = initialState.dateObj.getYear()
    let hr=initialState.dateObj.getHours()
    let min=initialState.dateObj.getMinutes()
    if(hr==0){
        min=currentMin
        hr=currentHr
    }
    if(min===0){
        min=0
    }
    else if(min<=30){
       min=30
    }
    else if(min>30){
        min=0
        hr+=1
    }     
    const [activeMin,setActiveMin]=useState(min)
    const [activeHr,setActiveHr]=useState(hr)
    const [shortMonth,setShortMonth]=useState(shortMon[0])
    const [selectedMonth,setMonth]=useState(1)
    const [selectedDay,setDay]=useState(1)
    const clickHandler = () => {
        let d=new Date()
        d.setFullYear(year,activeMonth-1,activeDay)
        d.setHours(activeHr)
        d.setMinutes(activeMin)
        //props.onSelect(d)
    }
    const MoveDayRight=()=>{
        if(activeDay<noOfDays){
            setMoveDay(moveDay-100)
            setActiveDay(activeDay+1)
            setDay(activeDay+1)
        }   
    }
    const MoveDayLeft=()=>{
        if(activeDay>1){
            setMoveDay(moveDay+100)
            setActiveDay(activeDay-1)
            setDay(activeDay-1)
        }
    }
    const MoveMonthLeft=()=>{
        if(activeMonth>1){
           setMoveMonth(moveMonth+200)
           setActiveMonth(activeMonth-1)
           setMonth(activeMonth-1)
           setShortMonth(shortMon[activeMonth-2]) 
        }   
    }
    const MoveMonthRight=()=>{
        if(activeMonth<12){
            setMoveMonth(moveMonth-200)
            setActiveMonth(activeMonth+1)
            setMonth(activeMonth+1)
            setShortMonth(shortMon[activeMonth])
        }
    }
    const [counter,setCounter]=useState(((60-activeMin)/initialState.interval)+1)
    if(counter>4){
        setCounter(1)
    }
    console.log(counter)
    const MoveTimeRight=()=>{
        if(activeTime<timeArr.length){
            setMoveTime(moveTime-150)
            setActiveTime(activeTime+1)   
            if(counter<60/initialState.interval){
                setActiveMin(activeMin+initialState.interval)
                setCounter(counter+1)
            }  
            else{
                setActiveMin(0)
                setActiveHr(activeHr+1)
                setCounter(1)
            }
        }      
    }
    const MoveTimeLeft=()=>{
        if(activeTime>0){
            setMoveTime(moveTime+150)
            setActiveTime(activeTime-1)  
            if(counter===1){
                setActiveMin(60-initialState.interval)
                setActiveHr(activeHr-1)
                setCounter(60/initialState.interval)
                console.log(counter)
            } 
            else{
                setActiveMin(activeMin-initialState.interval)
                setCounter(counter-1)
                console.log(counter)
            } 
        }
    }
    const Days=({prevDateAllowed})=>{
        const dates=[]
        switch(Number(selectedMonth)){
            case 1:
                noOfDays=31
                break
            case 2:
                if ((!(year % 4) && (year % 100)) || ! (year % 400))
                return 29
            else 
                return 28
                break
            case 3:
                noOfDays=31
                break    
            case 4:
                noOfDays=30
                break
            case 5:
                noOfDays=31
                break
            case 6:
                noOfDays=30
                break
            case 7:
                noOfDays=31
                break
            case 8:
                noOfDays=31
                break
            case 9:
                noOfDays=30
                break
            case 10:
                noOfDays=31
                break
            case 11:
                noOfDays=30
                break
            case 12:
                noOfDays=31
                break
        }
        const dateHandler=(e)=>{
            if(e.target.value>activeDay){
                if(e.target.value>activeDay+1){
                    setMoveDay(moveDay-200)
                    setActiveDay(activeDay+2)
                    setDay(activeDay+2)
                }
                else{
                    if(e.target.value<activeDay-1){
                        setMoveDay(moveDay+200)
                        setActiveDay(activeDay-2)
                        setDay(activeDay-2)
                    }
                    MoveDayRight()
                }    
            }
            else{
                MoveDayLeft()      
            }
        }
            if(!prevDateAllowed){
                for (let i = 1; i < date; i++) {
                    if(i===activeDay){
                    dates.push(<button key={i} style={activeDayBtn} 
                        value={i} key={i}>{i}<br/><span style={{fontSize:15,fontWeight:"initial"}}>{shortMonth}</span></button>)
                    }
                    else if(i===activeDay-1||i===activeDay+1){
                        dates.push(<button key={i} style={daysBtn} 
                            value={i} key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>);
                    }
                    else{
                        dates.push(<button key={i} style={daysBtn} 
                             value={i} disabled key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>)
                    }
                }
                for (let i = date; i <= noOfDays; i++) {
                    if(i===activeDay){
                        dates.push(<button key={i} style={activeDayBtn} value={i} key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>)
                    }
                    else if(i===activeDay-1||i===activeDay+1){
                        dates.push(<button key={i} style={daysBtn} 
                            onClick={e=>dateHandler(e)} value={i} key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>);
                    }
                    else{
                        dates.push(<button key={i} style={opacityBtnStyle}  
                            onClick={e=>dateHandler(e)} value={i} key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>)
                    }
                }
                return dates
            }
            else{
                for (let i = 1; i <= noOfDays; i++) {
                if(i===activeDay){
                    dates.push(<button key={i} style={activeDayBtn} value={i} key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>);
                }
                else if(i===activeDay-1||i===activeDay+1){
                    dates.push(<button key={i} style={daysBtn} 
                        onClick={e=>dateHandler(e)} value={i} key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>);
                }
                else{
                    dates.push(<button key={i} style={opacityBtnStyle} 
                        onClick={e=>dateHandler(e)} value={i} key={i}>{i}<br/><span style={{fontSize:15}}>{shortMonth}</span></button>);
                }
                }
                return dates
            }
        }
    const monthHandler=(e)=>{
        if(e.target.value>activeMonth){
            MoveMonthRight()
        }
        else{
            MoveMonthLeft()
        }
    }
    const Months=({prevDateAllowed})=>{
        const mon=[]
        if(!prevDateAllowed){
            for(let j=1;j<month;j++){
                if(j===activeMonth){
                    mon.push(<button key={j} style={active} id={j} value={j}>{months[j-1]}</button>)
                }
                else{
                    mon.push(<button key={j} style={btnStyle} disabled id={j} value={j} key={j}>{months[j-1]}</button>)
                }
            }
            for(let j=month;j<=12;j++){
                if(j===activeMonth){
                    mon.push(<button key={j} style={active} id={j} value={j}>{months[j-1]}</button>)
                }
                else{
                    mon.push(<button key={j} style={btnStyle} id={j} value={j} key={j}>{months[j-1]}</button>)
                }
            }
            return mon
        }
        else{
            for(let j=1;j<=12;j++){
                if(j===activeMonth){
                    mon.push(<button key={j} style={active} id={j} value={j}>{months[j-1]}</button>)
                }
                else{
                    mon.push(<button key={j} style={btnStyle} id={j} onClick={e=>monthHandler(e)} value={j}>{months[j-1]}</button>)
                }
            }
            return mon
        }
    }
    const timeHandler=(e)=>{
        if(e.target.value<activeTime){
            MoveTimeLeft()
        }
        else{
            MoveTimeRight()
        }
    }
    let defTime=0
    const Time=({interval,enabled})=>{
        if(!enabled){
            return null
        }
        const time=[]
        let z=0
        for(let l=1;l<25;l++){
            for(let k=0;k<60;z++){
                if(l<13){
                    if(k===0){
                        if(l===activeHr&&k===activeMin){
                    time.push(<button value={z} key={String(hr)+":"+String(k)+"0 amX"} style={activeTimeBtn}>{l}:0{k} am</button>)
                    defTime=z
                    setActiveTime(z)
                        }
                        else if(z===activeTime||z===activeTime-1){
                    time.push(<button value={z} key={String(l)+":"+String(k)+"0 am"} onClick={e=>timeHandler(e)} style={btnTimeStyle}>{l}:0{k} am</button>)
                        }
                        else{
                    time.push(<button value={z} key={String(l)+":"+String(k)+"0 am"} onClick={e=>timeHandler(e)} style={opacityTimeBtn}>{l}:0{k} am</button>)
                        }
                        timeArr.push(String(l)+":"+String(k)+"0 am")
                    }
                    else{
                        if(l===activeHr&&k===activeMin){
                    time.push(<button value={z} key={String(l)+":"+String(k)+" am"} style={activeTimeBtn}>{l}:{k} am</button>)
                    defTime=z
                    setActiveTime(z)
                        }
                        else if(z===activeTime||z===activeTime-1){
                    time.push(<button value={z} key={String(l)+":"+String(k)+" amF"} onClick={e=>timeHandler(e)} style={btnTimeStyle}>{l}:{k} am</button>)
                        }
                        else{
                    time.push(<button value={z} key={String(l)+":"+String(k)+" am"} onClick={e=>timeHandler(e)} style={opacityTimeBtn}>{l}:{k} am</button>)  
                        }
                        timeArr.push(String(l)+":"+String(k)+" am")
                    }
                }
                else{
                    if(k===0){
                        if(l===activeHr&&k===activeMin){
                time.push(<button value={z} key={String(l-12)+":"+String(k)+" pm"} style={activeTimeBtn}>{l-12}:{k}0 pm</button>)
                        defTime=z
                        setActiveTime(z)
                        }
                        else if(z===activeTime||z===activeTime-1){
                time.push(<button value={z} key={String(l-12)+":"+String(k)+"0 pm"} onClick={e=>timeHandler(e)} style={btnTimeStyle}>{l-12}:0{k} pm</button>)
                        }
                        else{
                time.push(<button value={z} key={String(l-12)+":"+String(k)+"0 pm"} onClick={e=>timeHandler(e)} style={opacityTimeBtn}>{l-12}:0{k} pm</button>)
                        }
                        timeArr.push(String(l-12)+":"+String(k)+"0 pm")
                    }
                    else{
                        if(l===activeHr&&k===activeMin){
                    time.push(<button value={z} key={String(l-12)+":"+String(k)+" pm"} style={activeTimeBtn}>{l-12}:{k} pm</button>)
                    defTime=z
                    setActiveTime(z)
                        }
                        else if(z===activeTime||z===activeTime-1){
                    time.push(<button value={z} key={String(l-12)+":"+String(k)+" pm"} onClick={e=>timeHandler(e)} style={btnTimeStyle}>{l-12}:{k} pm</button>)
                        }
                        else{
                time.push(<button value={z} key={String(l-12)+":"+String(k)+" pm"} onClick={e=>timeHandler(e)} style={opacityTimeBtn}>{l-12}:{k} pm</button>)  
                            timeArr.push(String(l-12)+":"+String(k)+" pm")
                        }     
                    }           
                }
                k+=interval
            } 
        }
        return time
    }
    useEffect(()=>{
        if(month!==null&&date!==null&&defTime!==null){
            setMoveMonth(moveMonth-(200*(month-1)))
            setActiveMonth(month)
            setMoveDay(moveDay-((date-1)*100))
            setActiveDay(date)
            setMoveTime(moveTime-(150*defTime))
        }  
    },[])
    //document.body.style.overflow = "hidden"
    return(
        <div>
            <div style={monthContainer} id="months">
                <Months prevDateAllowed={initialState.prevDateAllowed} />
            </div>
            <div style={daysContainer} id="days">
                <Days prevDateAllowed={initialState.prevDateAllowed} defaultDate={initialState.defaultDate}/>
            </div>
            <div style={timeContainer}>
                <Time enabled={initialState.dateTime} interval={initialState.interval}/>
            </div>
            <button style={subBtn} onClick={clickHandler}>Schedule Here</button>
            {/* Month Mover */}
            <button style={rightBtn} onClick={MoveMonthRight}>Right</button>
            <button style={leftBtn} onClick={MoveMonthLeft}>left</button>
            {/* Days Mover */}
            <button style={rightBtnDay} onClick={MoveDayRight}>Right</button>
            <button style={leftBtnDay} onClick={MoveDayLeft}>left</button>
            {/* Time Mover */}
            <button style={rightBtnTime} onClick={MoveTimeRight}>Right</button>
            <button style={leftBtnTime} onClick={MoveTimeLeft}>left</button>
        </div>
    )
}
export default DateTime