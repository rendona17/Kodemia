const express = require('express')

const router = express.Router()

const mentor = require('../usecases/mentors')

router.get('/', async (req, res) => {
	const mentors = await mentor.get()
	res.json({
		success: true,
		message: 'Done!',
		payload: {
			mentors
		}
	})
})

router.post('/', async (req, res) =>{
	try {
		 const mentorData = req.body
		 console.warn('mentorData: ', mentorData)
		 const newMentor = await mentor.create(mentorData)
		 res.json({
		 	success: true,
		 	message: 'New mentor created',
		 	payload: { mentor: newMentor }
		 })
	} catch (error) {
		res.status(400)
		res.json({
			success: false,
			message: 'Mentor could not be created',
			error: [
				error
			]
		})
	}
})

router.delete('/:id', async (req, res) =>{
	try {
		const { id } = req.params
		const mentorDeleted = await mentor.del(id)

		res.json({
			success: true,
			message: 'Mentor deleted',
			payload: { mentor: mentorDeleted}
		})
	} catch (error) {
		res.status(400)
		res.json({
			success: false,
			message: 'Mentor could not be deleted',
			error: [
				error
			]
		})
	}
})

module.exports = router