/* index.js Tse Hoi Cheung 301234975 31CT2022--> */

var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

router.get('/',indexController.displayHomePage);
router.get('/home',indexController.displayHomePage);
router.get('/about',indexController.displayAboutPage);
router.get('/projects',indexController.displayProjectsPage);
router.get('/services',indexController.displayServicePage);
router.get('/contact',indexController.displayContactPage);

//Get login page
router.get('/login', indexController.displayLoginPage);
//Process login page
router.post('/login', indexController.processLoginPage);

//Get register page
router.get('/register', indexController.diplayRegisterPage);
//Process register page
router.post('/register', indexController.processRegisterPage);
//Perform logout
router.get('/logout',indexController.performLogout);


module.exports = router;
