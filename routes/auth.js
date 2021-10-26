const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const authController = require('../controllers/auth');
const CRUDController = require('../controllers/crud');

const isAuth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.get('/crud/', [isAuth], CRUDController.getProduct(), (req, res) => {
    res.json(res.paginatedResults);
});
router.post('/crud/', [isAuth, isAdmin], CRUDController.addProduct);
router.patch('/crud/:id', [isAuth, isAdmin], CRUDController.updateProduct);
router.delete('/crud/:id', [isAuth, isAdmin], CRUDController.deleteProduct);

router.post('/signup', authController.signup);


router.post('/login',bodyParser, authController.login);



module.exports = router; 
