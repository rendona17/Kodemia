const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
	name: {
		required: true,
		type: String,
		trim: true,
		maxlength: 20,
		minlength: 1
	}, 
	age: {
		type: Number,
		required: true,
		min: 0
	},
	city: {
		type: String,
		required: true,
		maxlength: 50
	}
})

module.exports = {
	model: mongoose.model('Koder', schema),
	schema
}