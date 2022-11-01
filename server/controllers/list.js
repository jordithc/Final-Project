/* list.js Tse Hoi Cheung 301234975 31CT2022--> */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let list = require('../models/list');

module.exports.displayContactList = (req, res, next) => {

    list.find((err, contactList) => {
      if (err) {
        return console.error(err);
      } else {
        //console.log(ContactList);
        res.render('contact/list', {
          title: 'Contact List',
          ContactList: contactList,
          displayName: req.user ? req.user.displayName:''
        });
      }
    });
  };

module.exports.displayAddPage = (req,res,next) =>{
    res.render('contact/add', {
      title: 'Add Contact',
      displayName: req.user ? req.user.displayName:''
    });
  };

module.exports.processAddPage = (req,res,next) =>{
    let newContact = list({
      "contactName": req.body.contactName,
      "contactNumber": req.body.contactNumber,
      "emailAddress": req.body.emailAddress,
    });
  
    list.create(newContact, (err, List) =>{
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
        res.redirect('/contact-list');
      }
    });
  };

module.exports.displayEditPage = (req,res,next) =>{
    let id = req.params.id;
    list.findById(id, (err, listToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('contact/edit', {title: 'Edit Contact List', list: listToEdit,
          displayName: req.user ? req.user.displayName:''})
      }
  });
  };

module.exports.processEditPage = (req,res,next) =>{
    let id = req.params.id
  
      let updatedList = list({
        "_id": id,
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "emailAddress": req.body.emailAddress,
      });
  
      list.updateOne({_id: id}, updatedList, (err) => {
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              res.redirect('/contact-list');
          }
      });
  };

module.exports.performDelete = (req,res,next) =>{
    let id = req.params.id;
  
    list.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the contact list
             res.redirect('/contact-list');
        }
    });
  
  };