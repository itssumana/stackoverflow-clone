import * as api from '../api/index'

export const askQuestion = (questionData, navigate) => async(dispatch)=>{
    try {
        const { data } = await api.postQuestion(questionData)
        dispatch({ type: "POST_QUESTION", payload: data}) //retrieve data from the backend
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllQuestions = () => async (dispatch) => {
    try {
        const { data } = await api.getAllQuestions() //getting error here as of now cus in the baackend we did router.post() instead of .get()
        dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data}) //retrieve data from the backend
    } catch (error) {
        console.log(error)
    }
}

export const deleteQuestion = (id,navigate) => async(dispatch) => {
    try {
        await api.deleteQuestion(id);
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const postAnswer = (answerData) => async(dispatch) => {
    const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData
    try {
        const { data } = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId);
        dispatch({type: 'POST_ANSWER', payload: data});
        dispatch(fetchAllQuestions());
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async(dispatch) => {
    console.log(`deleteData: \nid: ${id} answerId: ${answerId} noOfAnswers: ${noOfAnswers}`);
    try {
        await api.deleteAnswer(id, answerId, noOfAnswers);
        dispatch(fetchAllQuestions()) //noOfAnswers changed so after the change we are fetching all data else the changes won't show up
    } catch (error) {
        console.log(error);
    }

}

export const voteQuestion = (id, userId, voteType) => async(dispatch) => {
    // const {id, userId, voteType} = voteData => there are three parameters in the passing of function
    console.log(id+" "+userId+" "+voteType);
    try {
        await api.voteQuestion(id, userId, voteType)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }

}
