import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import Main from './Main';
import Loader from './Loader';
import Error  from './Error';
import { Fragment, useEffect, useReducer } from 'react';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
const SEC_PER_QUES = 30;
const initialState = {
  questions:[],
  status:"loading",
  index :0,
  answer:null,
  points:0,
  heighscore:0,
  RemainingSec:null
};
function reducer(state,action){
  switch(action.type){
    case "dataReceived":
      return {...state,questions: action.payload,status : "ready"}
    case "dataFailed":
      return {...state,status : "error"}
    case "start":
      return {...state,status : "active",RemainingSec:state.questions.length * SEC_PER_QUES}
    case "newAnswer":
      const CurrentQues = state.questions[state.index];
      return {...state,
        answer:action.payload,
        points: action.payload === CurrentQues.correctOption ? state.points + CurrentQues.points : state.points
      }
      case "nextQuestion":
        return {...state,index : state.index+1,answer : null}
      case "finish":
        return {...state,status : "finish",heighscore:state.points > state.heighscore?state.points : state.heighscore}
      case "restart":
        return {...state,status : "ready",answer:null,index:0,points:0,RemainingSec:null}
      case "Counting":
        return {
          ...state,RemainingSec:state.RemainingSec - 1,
          status:state.RemainingSec === 0 ? "finish" : state.status
        }
    default:
      throw new Error("Action Unknown");
  }
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
 
  useEffect(()=>{
    fetch("http://localhost:8000/questions")
    .then(res => res.json())
    .then(data => dispatch({type:"dataReceived",payload:data}))
    .catch(err => dispatch({type:"dataFailed"}))

  },[])
  const {questions,status,index,answer,points,heighscore,RemainingSec} = state;
  const QuestionsLength = questions.length;
  const TotalPoints = questions.reduce((x,y)=>x + y.points,0);
  
  return (
    <div className="app">
      <Header/>
      <Main>
      {status === "loading" && <Loader/>}
      {status === "error" && <Error/>}
      {status === "ready" && <StartScreen QuestionsLength={QuestionsLength} dispatch={dispatch}/>}
      {status === "active" && 
      <Fragment>
      <Progress index={index} QuestionsLength={QuestionsLength} points={points} TotalPoints={TotalPoints} answer={answer}/>
      <Question question = {questions[index]} dispatch={dispatch} answer={answer}/>
      <Footer>
      <Timer dispatch={dispatch} RemainingSec={RemainingSec}/>
      <NextButton dispatch={dispatch} answer={answer} index={index} QuestionsLength={QuestionsLength}/>
      </Footer>
      </Fragment>
    }
    {status === "finish" && <FinishScreen points={points} TotalPoints={TotalPoints} heighscore={heighscore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
