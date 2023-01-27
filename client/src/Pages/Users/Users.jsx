import React from 'react'
import {useSelector} from 'react-redux'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import User from './User'

import './Users.css'

const Users = () => {

    const users = useSelector((state) => state.usersReducer)
    
    return (
        <div className='home-container-1'>
            <LeftSidebar/>
            <div className="home-container-2" style={{marginTop: "32px"}}>
                <h1 style={{fontWeight: "400"}}>Users</h1>
                <div className='user-list-container'>
                    { users !== null &&
                        users.map((user) => (
                            <User user={user} key={user?._id} />
                        ))
                    }
                </div>
            </div>
        
        </div>
  )
}

export default Users
