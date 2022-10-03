/* index.js Tse Hoi Cheung 301234975 2OCT2022--> */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: "Home" });
});


/* GET About Me page. */
router.get("/about", function(req, res, next){
  res.render("index", { title: 'About'});
});

/* GET Project page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects' });
});

/* GET Service page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

/* GET Contact page. */
router.get("/contact", function(req, res, next){
  res.render("index", {title: 'Contact'});
});


module.exports = router;
