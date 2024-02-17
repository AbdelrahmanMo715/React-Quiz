import React from 'react'

function Progress({index,QuestionsLength,points,TotalPoints,answer}) {
  return (
    <header className='progress'>
    <progress max={QuestionsLength} value={index + Number(answer != null)}></progress>
    <p>Question <strong>{index+1}</strong> / {QuestionsLength}</p>
    <p>Points <strong>{points}</strong> / {TotalPoints}</p>
    </header>
  )
}

export default Progress
