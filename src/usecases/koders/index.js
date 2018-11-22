const Koder = require('../../models/koder').model

async function get() {
  const allKoders = await Koder.find({}).exec()
  return allKoders
}

async function create ( koderData ) {
  const existingKoders = await Koder.find({ ...koderData }).exec()

  const koderExists = existingKoders.length > 0

  if (koderExists) throw new Error('Koder already exists')
    
  const koder = new Koder (koderData)
  const koderCreated = await koder.save()
  return koderCreated
}

function del (id) {
  return Koder.findByIdAndDelete(id).exec()
}

function getById (id) {
  return Koder.findById(id).exec()
}

module.exports = {
  get,
  create,
  del,
  getById
}