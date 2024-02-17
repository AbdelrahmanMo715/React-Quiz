import React, { Fragment } from 'react'

function FinishScreen({points,TotalPoints,heighscore,dispatch}) {
    const percentage = Math.ceil((points / TotalPoints) * 100);
  return (
    <Fragment>
    <p className='result'>
        Your Score is {points} out of {TotalPoints} ({percentage}%)
    </p>
    <p className='highscore'>(Highscore is : {heighscore} points )</p>
    <button className='btn btn-ui' onClick={()=>dispatch({type:"restart"})}>Restart Quiz</button>
    </Fragment>
    
  )
}

export default FinishScreen
