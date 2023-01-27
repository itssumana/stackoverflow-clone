import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async(req,res)=>{
    const {id} = req.params;
    console.log(req.params);
    console.log(req.body);
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('question unavailable...')
    }
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(id, { 
            $addToSet: {'answer': [{answerBody, userAnswered, userId}]}
        })
        updateNoOfQuestions(id, noOfAnswers);
        return res.status(200).json(updatedQuestion)

    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: {'noOfAnswers' : noOfAnswers}})
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = async(req,res) => {
    const {id: _id} = req.params;
    const { answerId, noOfAnswers } = req.body;
    console.log(`req.body: ${req.body.answerId}`);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('answer unavailable...')
    }
    try {
        updateNoOfQuestions(_id, noOfAnswers)
        await Questions.updateOne({_id}, {$pull: { 'answer': {_id: answerId}}}, (err,docs)=>{
            if (err){
                console.log(err)
                return res.status(404).json("error: unable to delete fugg")
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        })
        
        return res.status(200).json("Answer has been deleted...")
    } catch (error) {
        res.status(405).json(error)
    }
}