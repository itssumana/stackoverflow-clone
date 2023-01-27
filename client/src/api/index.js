import axios from 'axios'

const API = axios.create({ baseURL: 'https://stackoverflow-clone-sumana.onrender.com'}) //base url after rendering backend on render.com

// const API = axios.create({ baseURL: 'http://localhost:5000'}) //we use the ip of the backend so its 5000 not 3000

// we are using axios API to talk to the backend. To make every req more secure, to see that all the req has been sent by valid user with valid token, we use the following code... to iuse interceptors
API.interceptors.request.use( req => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
    
}) 


export const logIn = (authData)=>API.post('/user/login', authData)
export const signUp = (authData)=>API.post('/user/signup', authData)

export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get')
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)

export const getAllUsers = () => API.get('/user/getAllUsers');

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, {noOfAnswers, answerBody, userAnswered, userId})
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

export const voteQuestion = (id, userId, voteType) => API.patch(`/questions/vote/${id}`, {userId, voteType})

export const stripeSubscription = (priceValue) => API.post('/subscription/create-checkout-session',priceValue)