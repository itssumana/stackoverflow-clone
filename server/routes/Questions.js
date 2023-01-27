import express from 'express'
import {AskQuestion, getAllQuestions,deleteQuestion, voteQuestion} from '../controllers/Questions.js'

import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/Ask', auth, AskQuestion)
router.get('/get', getAllQuestions) //it would've been router.get()... that's why getting error => now resolved
router.delete('/delete/:id', auth, deleteQuestion);
router.patch('/vote/:id', auth, voteQuestion)

export default router