const mongoose = require('mongoose');

module.exports = {
	connect : async () => {
		await mongoose.connect(process.env.DB_CONNECT,{ 
			useNewUrlParser: true, 
			useUnifiedTopology: true 
		})
	},
	close : async () => {
		await mongoose.connection.close()
	}
}