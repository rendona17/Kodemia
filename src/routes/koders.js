const express = require('express')

const router = express.Router()

const koder = require('../usecases/koders')

router.get('/', async(req, res) => {
	const koders = await koder.get()
	res.json({
		success: true,
		message: 'Done!',
		payload: {
			koders
		}
	})
})

router.post('/', async(req, res) => {
	try {
		const koderData = req.body
		console.warn('koderData: ', koderData)
		const newKoder = await koder.create(koderData)
		res.json({
			success: true,
			message: 'New Koder created',
			payload: { koder: newKoder }
		})
	} catch (error) {
		res.status(400)
		res.json({
			success: false,
			message: 'Koder could not be created',
			error: [
				error
			]
		})
	}
})

router.delete('/:id', async (req,res) => {
	try {
		const { id } = req.params
		const koderDeleted = await koder.del(id)
		
		res.json({
			success: true,
			message: 'Koder deleted',
			payload: { koder: koderDeleted }
		})
	} catch (error) {
		res.status(400)
		res.json({
			success: false,
			message: 'Koder could not be deleted',
			error: [
				error
			]
		})
	}
})

module.exports = router