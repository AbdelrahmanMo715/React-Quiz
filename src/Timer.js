import React, { useEffect } from 'react'

function Timer({dispatch,RemainingSec}) {
const mins = Math.floor(RemainingSec / 60);
const secs = RemainingSec % 60;

    useEffect(()=>{
       const id = setInterval(()=>{
        dispatch({type:"Counting"})
        },1000)
        return ()=>clearInterval(id);
    },[dispatch])
  return (
    <div className='timer'>
        {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs} 
    </div>
  )
}

export default Timer
