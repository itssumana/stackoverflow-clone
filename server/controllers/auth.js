import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'

export const signup = async (req,res) => {
    const {name, email, password } = req.body;
    console.log(req.body);
    try{
        const existingUser = await users.findOne({email});
        // console.log(`existingUser: ${existingUser}`);
        if(existingUser){
            return res.status(404).json("User already exist.")
        }
        const hashPassword = await bcrypt.hash(password,12)
        const newUser = await users.create({name, email, password: hashPassword})
        // console.log(users.findOne({email}));
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({result: newUser, token})
    }catch(error){
        res.status(500).json("Something went wrong...")
    }
}

export const login = async(req,res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try{
        // console.log("before findone");
        const existingUser = await users.findOne({email})
        // console.log(`existingUser: ${existingUser}`);
        if(!existingUser){
            return res.status(404).json("User does not exist.")
        }
        const isPasswordCrt = await bcrypt.compare(password,existingUser.password)
        // console.log(isPasswordCrt);
        if(!isPasswordCrt){
            res.status(400).json("Invalid Credentials")
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "1hr"})
        return res.status(200).json({ result: existingUser, token })
    }catch(error){
        return res.status(500).json("Something went wrong...")
    }

}