import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBirthdayCake} from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'

import Avatar from '../../components/Avatar/Avatar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import EditProfileDetail from './EditProfileDetail'
import ProfileBio from './ProfileBio'

import './UserProfile.css'

const UserProfile = () => {
    const {id} = useParams() //id of the profile we clicked and got routed to

    const users = useSelector(state => state.usersReducer) //get all users

    const currentProfile = users?.filter((user) => user._id === id)[0]
    // console.log(currentProfile)
    // console.log(users)

    const currentUser = useSelector(state=>state.currentUserReducer)

    const [Switch, setSwitch] = useState(false)

    return (
        <div className='home-container-1'>
            <LeftSidebar/>
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="green" py='28px' px='48px' color='white' borderRadius='6%' fontSize='50px'>{currentProfile?.name.charAt(0).toUpperCase()}</Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake}/> Member for {moment(currentProfile?.joinedOn).fromNow(true)}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result?._id === id && (
                                <button type='button' onClick={()=>setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen}/>
                                    Edit Profile
                                </button>
                            )
                        }
                    </div>
                    {  
                        Switch ? 
                        <EditProfileDetail currentUser={currentUser} setSwitch={setSwitch}/>
                        :
                        <ProfileBio currentProfile={currentProfile}/>
                    }
                </section>
            </div>
        
        </div>
    )
}

export default UserProfile
