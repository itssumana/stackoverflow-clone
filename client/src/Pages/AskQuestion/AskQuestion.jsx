import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {askQuestion} from '../../actions/question.js'
import './AskQuestion.css'

const AskQuestion = () => {
    const [ questionTitle, setQuestionTitle ] = useState('')
    const [ questionBody, setQuestionBody ] = useState('')
    const [ questionTags, setQuestionTags ] = useState('')

    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        console.log("inside handle submit");
        e.preventDefault();
        //dispatch an action
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id }, navigate))
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setQuestionBody(questionBody + '\n')
        }
    }

  return (
    <div className="ask-question">
        <div className="ask-ques-container">
            <h1>Ask a public question</h1>
        
            <div className='question-writing-guide'>
                <h2>Writing a good question</h2>
                <p>
                    You're ready to ask a programming-related question and this 
                    form will help guide you through the process.
                </p>
                <p>
                    Looking to ask a non-programming question? See the topics here 
                    to find a relevant site. 
                </p>
                <h5>Steps</h5>
                <ul>
                    <li>Summarize your problem in a one-line title.</li>
                    <li>Describe your problem in more detail.</li>
                    <li>Describe what you tried and what you expected to happen.</li>
                    <li>Add “tags” which help surface your question to members of the community.</li>
                    <li>Review your question and post it to the site.</li>
                </ul>
            </div>

            <form onSubmit={handleSubmit}>

                <div className='ask-form-container'>
                    <label htmlFor="ask-ques-title" >
                        <h4>Title</h4>
                        <p>Be specific and imagine you're asking a question to another person.</p>
                        <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g. Is there an R function for finding the index of an element in a vector?'/>
                    </label>
                </div>
                <div className='ask-form-container'>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea id="ask-ques-body" cols="30" rows="10" onChange={(e) => {setQuestionBody(e.target.value)}} onKeyDown={handleEnter}></textarea>
                    </label>
                </div>
                
                <div className='ask-form-container'>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type="text" id='ask-ques-tags' onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. (xml typescript wordpress)'/>
                    </label>
                    <input type="submit" value='Reivew your question' className='review-btn'/>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default AskQuestion

/*
    format th eform as it is...but the button down by 1 block
    (here, div tag) 
    when next button is clicked. in the end it changes its text to become review question
*/ 
