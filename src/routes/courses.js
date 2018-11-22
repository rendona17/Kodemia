const express = require('express')

const router = express.Router()

const courses = require('../usecases/courses')

router.get('/', async (req, res) => {
	const allCourses = await courses.get()
	res.json({
		succes: true,
		message: 'Done!',
		payload: {
			courses: allCourses
		}
	})
})

router.post('/', async (req, res) => {
	try {
		const courseData = req.body
		const courseCreated = await courses.create(courseData)
		console.warn('courseData: ', courseCreated)
		res.json ({
			succes: true,
			message: 'New course created',
			payload: {
				course: courseCreated
			}
		})
	} catch(error) {
		res.status(400)
		res.json ({
			success: false,
			message: 'Could not create course',
			error: [ error ]
		})
	}
})

module.exports = router