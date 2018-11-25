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
				courses: courseCreated
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

router.delete('/:id', async (req,res) => {
	try {
		const { id } = req.params
		const courseDeleted = await courses.del(id)

		res.json({
			success: true,
			message: 'Course deleted',
			payload: { courses: courseDeleted }
		})
	} catch (error) {
		res.status(400)
		res.json ({
			success: false,
			message: 'Course could not be deleted',
			payload: [
				error
			]
		})
	}
})

module.exports = router