// import mongoose from 'mongoose'
import mongoose from 'mongoose';
import questions from '../models/Questions.js'

export const AskQuestion = async(req,res)=>{

    const postQuestionData = req.body;
    // console.log(req.body);

    // const userId = new mongoose.Types.ObjectId(req.body.userId);
    // console.log(userId);

    //contrary to the OG code, user id has been passed but it passed as a string
    const postQuestion = new questions({ ...postQuestionData});
    try {
        await postQuestion.save();
        // console.log("posted question succesfully");
        res.status(200).json("Posted a question successfully")
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post a new question")        
    }
}

export const getAllQuestions = async(req,res) => {
    try {
        const questionList = await questions.find({});
        res.status(200).json(questionList);        
    } catch (error) {
        res.status(404).json(error.message);
    }

}

export const deleteQuestion = async(req,res) => {
    const {id} = req.params;
    // console.log(req.params);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("Invalid question id")
    }
    try {
        await questions.findByIdAndRemove(id)
        res.status(200).json("successfully deleted...")
    } catch (error) {
        res.status(404).json(`could not delete question... ${error.message}`)
    }

}

export const voteQuestion = async(req,res) => {
    const {id} = req.params; //q id
    const { userId, voteType } = req.body;
    //userId, which is a mongodb doc id, gets passed as a string

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("Invalid question id")
    }

    try {
        const question = await questions.findById(id)
        // console.log(`question: ${question}`);

        const upIndex = question.upVote.findIndex((element) => element === (userId))

        const downIndex = question.downVote.findIndex((element) => element === (userId))
        
        if(voteType === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((element)=> element !== (userId)) //keep all element except the userId
            }
            if(upIndex !== -1){
                console.log('upIndex !==-1')
                question.upVote = question.upVote.filter((element)=> element !== (userId))
                console.log("upvote aray "+question.upVote)
            } else {
                question.upVote.push(userId)
            }
            // await question.save()
        }else if(voteType === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((element)=> element !== (userId))
            }
            if(downIndex === -1){
                question.downVote.push((userId))
                
            }else {
                question.downVote = question.downVote.filter((element)=> element !== (userId)) //keep all element except the userId
            }
        }
        await question.save() //we need to save else it will not only not-save but also throw an errror as that request could not be completed
        //however, after error was resolved i commented this line but i faced no error, which is strange cuz I was doing the exact thing before
        res.status(200).json("Voted successfully") //we need to send a status code like this to frontend else the dispatch to get all question again wasnt executing without refreshing
    } catch (error) {
        return res.status(404).json('Could not vote the question...')
    }
}