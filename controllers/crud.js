const bodyParser = require('body-parser')
const {Product} = require('../models/Product');


exports.getProduct = () =>{
    return async (req, res, next) => {
        try {
        let results = await Product.find()
            .sort({ _id: 1 })
            // .exec();
        res.paginatedResults = results;
        next();
        } catch (e) {
            console.log(e)
            res
            .status(500)
            .json({ message: "Error Occured while fetching the data" });
        }
    };
}

exports.addProduct = async (req, res) => {
	productname = req.body.productname,
	description = req.body.description,
	price = req.body.price

	let newProduct = new Product({
		productname : productname,
        description : description,
        price : price
	})

	newProduct.save().then((product) => {
		res.send(product)
	}).catch((err) => {
		res.send(err)
	})
}


exports.updateProduct= async (req, res) => {
	let product = {}
	if (req.body.productname) product.productname = req.body.productname
	if (req.body.description) product.desciption = req.body.description
	if (req.body.price) product.price = req.body.price

	product = { $set: product }

	Product.updateOne({_id: req.params.id}, product).then(() => {
		res.send(product)
	}).catch((err) => {
		res.send(err)
	})
}


exports.deleteProduct= async (req, res) => {
	Product.deleteOne({_id: req.params.id}).then(() => {
		res.json({"msg":"product deleted"})
	}).catch((err) => {
		res.send(err)
	})
}
