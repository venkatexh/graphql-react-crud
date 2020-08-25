const mongoose = require("mongoose")
const Schema = mongoose.Schema

const brandSchema = new Schema({
	name: String,
	country: String
})

module.exports = mongoose.model('Brand', brandSchema)