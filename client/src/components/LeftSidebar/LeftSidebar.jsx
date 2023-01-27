import React from 'react'
import './LeftSidebar.css'
import {NavLink} from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import star from '../../assets/star.png'

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
        <nav className='side-nav'>
            <NavLink to='/' className='side-nav-links' activeclassname='active'>
                <p>Home</p>
            </NavLink>
            <div className='side-nav-div'>
                <p>PUBLIC</p>
                <NavLink to='/Questions' className='side-nav-links' activeclassname='active'> 
                    <img src={Globe} alt="globe icon" /> 
                    <p style={{paddingLeft: "10px"}}>Questions</p>
                </NavLink>
                <NavLink to='/Tags' className='side-nav-links' activeclassname='active'><p>Tags</p></NavLink>
                <NavLink to='/Users' className='side-nav-links' activeclassname='active'><p>Users</p></NavLink>
                <NavLink to='/Subscription' className='side-nav-links' activeclassname='active'><p>Subscription</p></NavLink>
                <p>COLLECTIVES</p>
                <NavLink to='/ExploreCollectives' className='side-nav-links nav-link' activeclassname='active'>
                    <img src={star} alt="star icon" className='star-img'/>
                    <p>Explore Collectives</p>
                </NavLink>
                <p>TEAMS</p>
                <p>Create Free Team</p> 
            </div>
        </nav>
    </div>
  )
}

export default LeftSidebar

