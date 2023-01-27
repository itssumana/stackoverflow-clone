import React, { useState} from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question.js'

import moment from 'moment'
import copy from 'copy-to-clipboard' 

import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswers from './DisplayAnswers'

import upvote from '../../assets/upVote.svg'
import downvote from '../../assets/downVote.svg'

import './Questions.css'


const QuestionsDetails = () => {

	const User = useSelector((state)=>state.currentUserReducer)
	const questionsList =  useSelector((state)=>state.questionsReducer)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	//console.log(location); => returns an object. it has a pathname field where we get the url path. 
	// Hence, we need to do location.pathname. But pathname does not have our baseUrl so whole path is (url+location.pathname)
    
	const {id} = useParams()
	console.log(id);
	
	const [Answer, setAnswer] = useState('')
	
	
	const handlePostAns = (e, length)=> {
		e.preventDefault();
		if (User===null) {
			alert('Login or signup to answer a question')
			navigate('/Auth')
		}else{
			if(Answer === ''){
                alert('Enter an answer before submitting')
            } else{
                dispatch(postAnswer({ id, noOfAnswers: length + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id }))
            }
		}
	}

	const handleShare = () => {
		const url = 'https://stackoverflow-clone-app-sumana.netlify.app'
		console.log('share url '+url+location.pathname);
		copy(url+location.pathname)
		alert(`Copied url: ${url+location.pathname}`);
	}

	const handleUpVote = () =>{
		dispatch(voteQuestion(id, User.result._id, 'upVote'))
	}

	const handleDownVote = () => {
		dispatch(voteQuestion(id, User.result._id, 'downVote'))
	}

	const handleDelete = () => {
		dispatch(deleteQuestion(id, navigate))
	}

    // var questionsList = [{ 
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // },{ 
    //     _id: '2',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // },{ 
    //     _id: '3',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }]
	// const [Answer, setAnswer] = useState('')
    // const Navigate = useNavigate()
    // const dispatch = useDispatch()
    // const User = useSelector((state) => (state.currentUserReducer))
    
  return (
		
    <div className='question-details-page'>
        { questionsList.data === null ?
            <h1>Loading...</h1> :
            <>
                { questionsList.data.filter(question => question._id === id).map(question =>(
                    <div key={question._id}>
						<section className='question-details-container'>
							<h1>{question.questionTitle}</h1>
							<div className='question-details-container-2'>
								<div className="question-votes">
									<img src={upvote} alt="up-vote" width='32' className='votes-icon' onClick={handleUpVote}/>
									<p>{question.upVote.length - question.downVote.length}</p>
									<img src={downvote} alt="down-vote" width='32' className='votes-icon' onClick={handleDownVote}/>
								</div>
								<div style={{width: "100%"}}>
									<p className='question-body'>{question.questionBody}</p>
									<div className="question-details-tags">
										{
											question.questionTags.map((tag) => (
												<p key={tag}>{tag}</p>
											))
										}
									</div>
									<div className="question-actions-user">
										<div>
											<button type='button' onClick={handleShare}>Share</button>
											{
												User?.result?._id === question?.userId && (
													<button type='button' onClick={handleDelete}>Delete</button>
												)
											}
										</div>
										<div>
											<p>asked {moment(question.askedOn).fromNow()}</p>
											<Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
												<Avatar backgroundColor="orange" px='8px' py='5px' borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
												<div>
													{question.userPosted}
												</div>
											</Link>
										</div>
									</div>
								</div>
							</div>	
						</section>
						{
							question.noOfAnswers !== 0 && (
								<section>
									<h3>{question.noOfAnswers} Answers</h3>
									<DisplayAnswers key={question._id} question={question} handleShare={handleShare}/>
								</section>
							)
						}
						<section className='post-ans-container'>
							<h3>Your Answer</h3>
							<form onSubmit={ (e) => { handlePostAns(e, question.answer.length) }}>
								<textarea name="answer" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br />
								<button type="Submit" className='post-ans-btn'>Post Your Answer</button>
							</form>
							<p>
								Not the answer you're looking for? Browse other Question tagged
								{
									question.questionTags.map((tag) => (
										<Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
									))
								} or 
								<Link to='/AskQuestion' style={{textDecoration: "none", color:"#009dff"}}> ask your own question.</Link>
							</p>
						</section>
                	</div>
					))
                }
            </>
        }
      
    </div>
  )
}

export default QuestionsDetails
