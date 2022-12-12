let express=require('express');
let router=express.Router();
let mongoose=require('mongoose');
const survey = require('../models/survey.js');

let Survey=require('../models/survey.js');

module.exports.displaySurveyList=(req,res,next)=>{
    Survey.find((err,surveyList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('survey/list',{title:'Active Surveys',SurveyList:surveyList,displayName: req.user?req.user.displayName:''});
        }
    })
}

module.exports.displayAddPage=(req,res,next)=>{
    res.render('survey/add',{title:'Create Survey',displayName: req.user?req.user.displayName:''});
}
module.exports.processAddPage=(req,res,next)=>{
    let newSurvey = Survey({
        "title": req.body.title,
        "type": req.body.type,
        "author": req.body.author,
        "activeDate": req.body.activeDate,
        "expiryDate": req.body.expiryDate,
        "responses":req.body.responses

    });
    Survey.create(newSurvey,(err,Survey)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });
}
module.exports.displayEditPage=(req,res,next)=>{
    let id=req.params.id;

    Survey.findById(id,(err,surveyToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/edit',{title:'Edit Survey',survey: surveyToEdit,displayName: req.user?req.user.displayName:''});
        }
    });
}
module.exports.processEditPage=(req,res,next)=>{
    let id=req.params.id;

    let updateSurvey=Survey({
        "_id": id,
        "title": req.body.title,
        "type": req.body.type,
        "author": req.body.author,
        "activeDate": req.body.activeDate,
        "expiryDate": req.body.expiryDate,
        "responses":req.body.responses
    });
    Survey.updateOne({_id:id},updateSurvey,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    });
}
module.exports.performDelete=(req,res,next)=>{
    let id=req.params.id;

    Survey.remove({_id: id}, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-list');
        }
    })
}
module.exports.displayResponsePage=(req,res,next)=>{
    let id=req.params.id;

    Survey.findById(id,(err,surveyToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/response',{title:'Thank you!',survey: surveyToEdit});
        }
    });
}
module.exports.processResponsePage=(req,res,next)=>{
    let id=req.params.id;

    let updateSurvey=Survey({
        "_id": id,
        "title": req.body.title,
        "type": req.body.type,
        "responses":req.body.responses
    });
    Survey.updateOne({_id:id},updateSurvey,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            survey.responses++;
            res.redirect('/survey-list');
        }
    });
}