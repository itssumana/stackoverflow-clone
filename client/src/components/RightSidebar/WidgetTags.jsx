import React from 'react'
import { useSelector } from 'react-redux';

const WidgetTags = () => {
    var User = useSelector(state=>state.currentUserReducer)
    console.log(User);
    // User?.result?.tags.map()

    // const tags = ['c++', 'visual-studio', 'css',  'express', 'html', 'python', 'dsa', 'javascript','mern',
    // 'mongodb', 'mongoose', 'mysql','node.js','php','reactjs']

    return (
        <div className='widget-tags'>
            <h4>Watched tags</h4>
            <div className='widget-tags-div'>
                {
                    User?.result?.tags.length !== 0 ?
                    User?.result?.tags.map((tag)=>(
                        <p key={tag}>{tag}</p>
                    ))
                    :
                    <p>
                        no-watched-tags
                    </p>
                }
            </div>
        </div>
    )
}

export default WidgetTags
