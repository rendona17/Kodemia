const Course = require('../../models/course').model

const mentor = require('../mentors')

const get = () => Course.find({}).exec()

const create = async (courseData) => {

	const { mentors = [] } = courseData

	const mentorPromises = mentors.map((mentorId) => {
		return mentor.getById(mentorId)
	})

	const mentorPromisesResult = await Promise.all(mentorPromises)

	const invalidMentors = mentorPromisesResult.reduce((reducer, current, index) => {
		if (current == null ) return [ ...reducer, mentors[index] ]
		return reducer
	}, [])

	if(invalidMentors.length > 0 )throw new Error(`Invalid Mentors: ${ invalidMentors.join(',') } `)

	const newCourse = new Course(courseData)
	return newCourse.save()
}

module.exports = {
	get,
	create
}