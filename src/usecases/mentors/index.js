const Mentor = require('../../models/mentor').model

async function get() {
	const allMentors = await Mentor.find({}).exec()
	return allMentors
}

async function create( mentorData ){
	const existingMentors = await Mentor.find({ ...mentorData }).exec()

	const mentorExists = existingMentors.length > 0

	if (mentorExists) throw new Error('Mentor already exists')

	const mentor = new Mentor(mentorData)
	const mentorCreated = await mentor.save()
	return mentorCreated
}

function del(id) {
	return Mentor.findByIdAndDelete(id).exec()
}

function getById (id) {
	return Mentor.findById(id).exec()
}

module.exports = {
	get,
	create,
	del,
	getById
}