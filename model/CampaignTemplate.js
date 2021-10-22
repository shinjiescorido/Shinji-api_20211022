const mongoose = require('mongoose')

const campaignTemplateSchema = new mongoose.Schema({
	name: {
		type: String,
		max:20,
		default:""
	},
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('CampaignTemplate', campaignTemplateSchema)