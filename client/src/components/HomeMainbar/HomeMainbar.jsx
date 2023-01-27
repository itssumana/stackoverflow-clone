import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QuestionList from './QuestionList'
import './HomeMainbar.css'
import {useSelector} from 'react-redux'

const HomeMainbar = () => {
  	const location = useLocation()
	const navigate = useNavigate()
	const questionList = useSelector(state=>state.questionsReducer)

	// const questionList = [{ 
	// _id: '1',
	// upVotes: 3,
	// downVotes: 2,
	// noOfAnswers: 2,
	// questionTitle: "What is a function?",
	// questionBody: "It meant to be",
	// questionTags: ["java", "node js", "react js", "mongo db", "express js"],
	// userPosted: "mano",
	// userId: 1,
	// askedOn: "jan 1",
	// answer: [{
	// 	answerBody: "Answer",
	// 	userAnswered: 'kumar',
	// 	answeredOn: "jan 2",
	// 	userId: 2,
	// }]
	// },
	// { 
	// _id: '2',
	// upVotes: 3,
	// downVotes: 4,
	// noOfAnswers: 0,
	// questionTitle: "What is a function?",
	// questionBody: "It meant to be",
	// questionTags: ["javascript", "R", "python"],
	// userPosted: "mano",
	// askedOn: "jan 1",
	// userId: 1,
	// answer: [{
	// 	answerBody: "Answer",
	// 	userAnswered: 'kumar',
	// 	answeredOn: "jan 2",
	// 	userId: 2,
	// }]
	// },
	// { 
	// _id: '3',
	// upVotes: 3,
	// downVotes: 2,
	// noOfAnswers: 0,
	// questionTitle: "What is a function?",
	// questionBody: "It meant to be",
	// questionTags: ["javascript", "R", "python"],
	// userPosted: "mano",
	// askedOn: "jan 1",
	// userId: 1,
	// answer: [{
	// 	answerBody: "Answer",
	// 	userAnswered: 'kumar',
	// 	answeredOn: "jan 2",
	// 	userId: 2,
	// }]
	// }]

	// const user = null
	const user = useSelector((state)=>state.currentUserReducer);

	const handleClick = ()=>{
		if(user ===  null){
			alert("Login to ask question")
			navigate('/Auth')
		}
		else{
			navigate('/AskQuestion')
		}
	}
    return (
      
      <div className='main-bar'>
        <div className='main-bar-header'>
          { location.pathname === '/Questions' ? 
            <h1>All Questions</h1> : 
            <h1>Top Questions</h1> 
          }
          <button onClick={handleClick} className='ask-btn'>Ask Question</button>
        </div>
        <div>
			{ questionList === null || questionList.data === null? 
				<h2>Loading...</h2> : (
				<>
					<p>{questionList.data.length} questions</p>
					<p>
						<QuestionList questionsList={questionList.data}/>
					</p>
				</>)
			}
        </div>
        
      </div>
    )
}

export default HomeMainbar
