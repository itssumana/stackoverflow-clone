import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users.js'

const EditProfileDetail = ({currentUser, setSwitch}) => {

	console.log(currentUser)
	const dispatch = useDispatch()

	const [name, setName] = useState(currentUser?.result?.name)
	const [about, setAbout] = useState(currentUser?.result?.about)
	const [tags, setTags] = useState([])
	
	const handleSubmit = (e) => {
		e.preventDefault()
		const allTags = currentUser?.result?.tags
		console.log(allTags)
		console.log(tags)
		console.log(tags.length)
		if(tags.length !== 0){
			tags.forEach( (tag) =>
				allTags.push(tag)
			)
		}
		console.log(allTags)
		dispatch(updateProfile(currentUser?.result?._id, {name, about, tags: allTags}))
		setSwitch(false)
	}

 	return (
		<div>
			<h1 className="edit-profile-title">Edit your Profile</h1>
			<h2 className="edit-profile-title-2">
				Public information
			</h2>
			<form className="edit-profile-form" onSubmit={handleSubmit}>
				<label htmlFor="name">
					<h3>Display name</h3>
					<input name='name' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
				</label>
				<label htmlFor="about">
					<h3>About me</h3>
					<textarea name="about" id="about" cols="30" rows="10" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
				</label>
				<label htmlFor="tags">
					<h3>Watched tags</h3>
					<p>Add tags separated by 1 space</p>
					<input type="text" onChange={(e)=>setTags(e.target.value.split(' '))}/>
				</label>
				<br />
				<input type="submit" value="Save Profile" className='user-submit-btn'/>
				<button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
				
			</form>
		
		</div>
  	)
}

export default EditProfileDetail
