/* controller/index.js Tse Hoi Cheung 301234975 31CT2022--> */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName:''});
}
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About', displayName: req.user ? req.user.displayName:''});
}
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', {title: 'Projects', displayName: req.user ? req.user.displayName:''});
}
module.exports.displayServicePage = (req, res, next) => {
    res.render('index', {title: 'Services', displayName: req.user ? req.user.displayName:''});
}
module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {title: 'Contact', displayName: req.user ? req.user.displayName:''});
}

module.exports.displayLoginPage = (req, res, next) =>{
    if (!req.user){
        res.render('auth/login',{
            title:"Login",
            message: req.flash('loginMessage'),
            displayName: req.user ?req.user.displayName:''
        })
    }
    else{
        return res.redirect('/contact-list');
    }
}
module.exports.processLoginPage = (req, res, next) =>{
    passport.authenticate('local',
    (err, user, info)=>{
        if(err){
            return next(err);
        }
        if(!user){
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err)=>{
            if(err){
                return next(err);
            }
            return res.redirect('/survey-list')
        });
    })(req, res, next);
}

module.exports.diplayRegisterPage = (req, res, next) =>{
    if(!req.user){
        res.render('auth/register',{
            title: 'Register',
            message:req.flash('registerMessage'),
            displayName: req.user ?req.user.displayName: ''
        });
    }
    else{
        return res.redirect('/');
    }
}
module.exports.processRegisterPage = (req, res, next) =>{
    let newUser = new  User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err)=>{
        if(err){
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError"){
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists'
                );
                console.log('Error: User Already Exist')
            }
            return res.render('auth/register',{
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ?req.user.displayName: ''
            });
        }
        else{
            //no error, redirect user
            return passport.authenticate('local')(req, res, ()=>{
                res.redirect('/survey-list')
            });
        }
    });
}
module.exports.performLogout =(req, res, next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
    res.redirect('/');
    })
}