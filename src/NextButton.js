import React from 'react'

function NextButton({dispatch,answer,index,QuestionsLength}) {
    if(answer === null) return null;
    if(index < QuestionsLength -1)return <button onClick={()=>dispatch({type:"nextQuestion"})} className='btn btn-ui'>Next</button>
    if(index == QuestionsLength -1)return <button onClick={()=>dispatch({type:"finish"})} className='btn btn-ui'>Finish</button>

}

export default NextButton
