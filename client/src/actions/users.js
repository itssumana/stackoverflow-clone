import * as api from '../api/index.js'

export const fetchAllUsers = ()=> async(dispatch)=>{
    try {
        const { data } = await api.getAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data})
        // learned from error : if we do not export the reducer fn where our action.type is (in this eg., type: 'FETCH_USERS') our dispatch wont work, it wont get dispatched
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try{
        const { data } = await api.updateProfile(id, updateData)
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: data })
    }catch(error){
        console.log(error)
    }
}