const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        max:255
    },
	description: {
        type: String,
        max:255
    },
    code: {
        type: String,
        max:255
    },
	price:{
		type: Number,
        default:0
	},
    campaignTemplates:[{
		campaignTemplate: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CampaignTemplate' 
		},
		id: {
			type: Number,
			default:null
		}
	}],
	attributes: [{
		isRequired: {
			type: Boolean,
			default: true
		},
		entity: {
			type: String,
			max:255
		},
		key: {
			type: String,
			max:255
		}
	}]
})
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', productSchema)