const express = require ('express')

const app = express()

const kodersRoutes = require ('./routes/koders')
const mentorsRoutes = require('./routes/mentors')
const coursesRoutes = require('./routes/courses')

app.use(express.json())

app.use('/koders', kodersRoutes)
app.use('/mentors', mentorsRoutes)
app.use('/courses', coursesRoutes)

app.get('/', (req, res) => {
	mentor.get()
	res.json({
		success: true,
		message: 'Kodemia running'
	})
})

module.exports = app