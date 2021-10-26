const mongoose = require('mongoose')

// Schema for product
const ProductSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true,
        maxLength: 50
    },
	description: {
		type: String,
		required: true,
        maxLength: 256
	},
	price: {
		type: String
	}
})

//Creating the collection Address
const Product = mongoose.model('Product', ProductSchema)

exports.Product = Product;