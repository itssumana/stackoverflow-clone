import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Subscription.css'
import freeLogo from '../../assets/free-plan-logo.png'
import silverLogo from '../../assets/silver-plan-logo.jpg'
import goldLogo from '../../assets/gold-plan-logo.jpg'

import { stripeSubscription } from '../../actions/subscription'
import { useNavigate } from 'react-router-dom'

const Subscription = () => {
    const [priceValue, setPriceValue] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(stripeSubscription(priceValue, navigate))
    }
  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
            <h2>Choose the plan that's right for you</h2>
            <div className='display-subscription-plan'>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td><img src={freeLogo} className='subscription-icon' alt="free-plan-icon" /></td>
                        <td><img src={silverLogo} className='subscription-icon' alt="silver-plan-icon" /></td>
                        <td><img src={goldLogo} className='subscription-icon' alt="gold-plan-icon" /></td>
                        
                    </tr>
                    <tr className='table-row'>
                        <td>Monthly Price</td>
                        <td>&#8377; 0.00</td>
                        <td>&#8377; 100.00</td>
                        <td>&#8377; 1000.00</td>
                    </tr>
                    <tr className='table-row'>
                        <td>Questions you can ask per month</td>
                        <td>1</td>
                        <td>5</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>(Default)</td>
                        <td><button className='select-btn' onClick={()=>setPriceValue('price_1MUBxvSH1bka93GXu71RlNHd')}>Select</button></td>
                        <td><button className='select-btn' onClick={()=> setPriceValue('price_1MUC0eSH1bka93GXuitg7jpg')}>Select</button></td>
                    </tr>
                    </tbody>
                </table>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="priceId" value={priceValue} />
                    <button type="submit" className='checkout-btn'>Checkout</button>
                </form>
            </div>
            
        </div>      
    </div>
  )
}

export default Subscription
