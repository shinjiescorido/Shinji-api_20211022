const axios = require('axios')
const Product = require('../model/Product')
const _ = require('lodash')

let errorHandler = (message, status, res) => {
    return res.status(status).json({
        status: status,
        message: message
    })
}

module.exports = {

	/**
	 * populates test data to db
	 *
	 * @return {object} success json message
	 */
    populate : async (req,res) => {        
        try {
			let page = 1
			let products = []
			await (async function loop() {
					let result = await axios({
					  method: 'get',
					  url: process.env.POPULATE_API + page,
					  headers: {'apikey': process.env.POPULATE_TOKEN}
					})
					 if(result.status == 200) {
						 if(result.data.products.length){
							products = _.union(products, _.map(result.data.products,p=>p))
							page++;
							await loop()
						 }
					 }
			}());
			await Product.bulkWrite(_.map(products, product => ({
				updateOne: {
					filter: {name: product.name},
					update: product,
					upsert: true,
				}
			})))
			res.status(200).json({ upload: 'ok' })
        } catch (error) {
			console.log(error)
            errorHandler('Server Error', 500, res)
        }
    },

	/**
	 * gets all data in db base on page param
	 *
	 * @param {number} page - current page to be pulled
	 * @return {object} paginate object instance json message
	*/
	get: async( req, res ) => {
		let { page } = req.query
		res.status(200).json( await Product.paginate( {},{
			select: 'code name price',
			leanWithId: false,
			limit: 10,page:page || 1
		}))
	},

	/**
	 * accepts post body params and creates a new data
	 *
	 * @param {string} name - product name
	 * @param {string} code - product code
	 * @param {number} price - product price
	 * @return {object} product json values
	*/
	post: async( req, res ) => {
		let product = new Product(req.body)
		res.status(200).json(await product.save())
	},

	/**
	 * accepts put body params and edits the data found based on params
	 *
	 * @param {string} id - _id to be searched on db
	 * @param {string} name - product name
	 * @param {string} code - product code
	 * @param {number} price - product price
	 * @return {object} product json values
	*/
	put: async( req, res ) => {
		let product = await Product.findById(req.params.id)
		
		product.name = req.body.name
		product.code = req.body.code
		product.price = req.body.price
		
		res.status(200).json(await product.save())
	},

	/**
	 * accepts id params and remove found data
	 *
	 * @param {string} id - _id to be searched on db
	 * @return {object} deleteOne json response
	*/
	trash: async( req, res ) => {
		const product = await Product.deleteOne({_id:req.params.id})
        res.status(200).json(product)
	}
}