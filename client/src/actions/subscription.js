import * as api from '../api/index.js'

export const stripeSubscription = async(priceValue,navigate) => {
    try {
        const {data} = await api.stripeSubscription(priceValue)
        //dispatch in reducer
        navigate("/")
    } catch (error) {
        console.log(error)
    }
    
}