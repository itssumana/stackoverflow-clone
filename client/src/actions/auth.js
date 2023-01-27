//we use axios to handle all the request relatedto sending and retrieving data from the backend.
import * as api from '../api/index.js'
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate)=> async (dispatch)=>{
    try{
        const {data} = await api.signUp(authData)
        dispatch({ type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        // dispatch(setCurrentUser(JSON.parse(localStorage.setItem('Profile'))))
        navigate('/')
    }catch(error){
        console.error(error.response);
        // console.log(error);
    }
}

export const login = (authData, navigate)=> async (dispatch)=>{
    try{
        const {data} = await api.logIn(authData);
        dispatch({ type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))
        navigate('/')
    }catch(error){
        console.error(error.response);
        // console.error(error.response.data);
        // console.error(error.response.status);
        // console.error(error.response.headers);
    }
}