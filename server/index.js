import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// import uuid from 'uuid'

//for payment subscription
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
console.log(stripe)

import userRouter from './routes/users.js'
import questionRouter from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import subscriptionRoutes from './routes/Subscription.js'

dotenv.config();
const app = express();
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;
const  DATABASE_URL = process.env.CONNECTION_URL 

app.get('/',(req,res)=>{
    res.send("<h4>server is working</h4>");
    })
    
app.use('/user',userRouter)
app.use('/questions',questionRouter)
app.use('/answer',answerRoutes)
app.use('/subscription',subscriptionRoutes)

mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=> {console.log(`Server Running on PORT ${PORT}`)}))
.catch((err)=> console.log(err.message))





