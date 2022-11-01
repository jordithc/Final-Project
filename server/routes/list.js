/* list.js Tse Hoi Cheung 301234975 31CT2022--> */

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');


//connect to our login user model
//let list = require('../models/list');

let listController = require('../controllers/list');

//helper function
function requireAuth(req, res, next){
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

//Get contact list
router.get('/',requireAuth, listController.displayContactList);
//Get add page
router.get('/add',requireAuth, listController.displayAddPage);
//Process add page
router.post('/add',requireAuth, listController.processAddPage);
//Get Edit page
router.get('/edit/:id',requireAuth, listController.displayEditPage);
//Process edit page
router.post('/edit/:id',requireAuth, listController.processEditPage);
//Perform delete
router.get('/delete/:id',requireAuth, listController.performDelete);






module.exports = router;