import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './HomeMainbar.css'

const Questions = ({questions}) => {
  return (
    <div className='display-question-container'>
        <div className='display-votes-ans'>
            <p>
                <span>{questions.upVote.length-questions.downVote.length}</span> 
                <span>votes</span>
            </p>
            <p className='set-text-color'>
                <span>{questions.noOfAnswers}</span> 
                <span>answers</span>
            </p>
        </div>
        <div className='display-question-details'>
            <Link to={`/Questions/${questions._id}`} className='question-title-Link'>{questions.questionTitle}</Link>
            <div className='display-tags-time'>
                <p className='display-tags'>
                    {
                        questions.questionTags.map( tag=> 
                            <p key={tag}>{tag}</p> 
                    )}
                </p>
                <p className='display-time set-text-color'>
                    asked {moment(questions.askedOn).fromNow()} { questions.userPosted }
                </p>
            </div>
        </div>
    </div>
  )
}

export default Questions
