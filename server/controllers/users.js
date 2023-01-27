import user from '../models/auth.js'
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user.find({});
        const allUserDetails = []
        allUsers.forEach(user => {
            allUserDetails.push({ _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn })
        })
        // console.log(allUserDetails)
        res.status(200).json(allUserDetails); //an array of objects
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async(req, res) => {
    const { id } = req.params;
    const {name, about, tags} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('user not found...')
    }

    try {
        const updatedProfile = await user.findByIdAndUpdate(id, {$set: {'name': name, 'about':about, 'tags': tags}}, {new: true})
        //$push: {'tags':{$each: tags}}
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json(error.nessage)
    }
    
}