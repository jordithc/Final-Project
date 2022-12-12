let Question = require('../models/questions');

module.exports.displayQuestionList = (req, res, next) => {
    const localSurveyId = req.params.id;
    Question.find({surveyId: localSurveyId}, (err, questionList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('question/list', {
                title: 'Question', 
                QuestionList : questionList,
                surveyId: localSurveyId,
                displayName: req.user?req.user.displayName:''
            });
        }
    });
};
module.exports.displayMCQQuestionList = (req, res, next) => {
    const localSurveyId = req.params.id;

    Question.find({surveyId: localSurveyId}, (err, questionList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('question/mcqlist', {
                title: 'Question', 
                QuestionList : questionList,
                surveyId: localSurveyId,
                displayName: req.user?req.user.displayName:''
            });
        }
    });
};
module.exports.displayAttendShortSurveyList = (req, res, next) => {
    const localSurveyId = req.params.id;

    Question.find({surveyId: localSurveyId}, (err, questionList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('question/attend_short', {
                title: 'Attend Survey', 
                QuestionList : questionList,
                surveyId: localSurveyId
            });
        }
    });
};
module.exports.displayAttendMCQSurveyList = (req, res, next) => {
    const localSurveyId = req.params.id;

    Question.find({surveyId: localSurveyId}, (err, questionList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('question/attend_mcq', {
                title: 'Attend Survey', 
                QuestionList : questionList,
                surveyId: localSurveyId
            });
        }
    });
};
module.exports.performDelete =  (req, res, next) => {
    let id = req.params.id;
    let surveyId = req.params.surveyId;

    Question.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            res.redirect('/survey-list/questions/' + surveyId);
        }
    });
}

module.exports.displayAddQuestionPage = (req, res, next) => {
    const localSurveyId = req.params.id;

    res.render('question/add', {title: 'Add New Question', surveyId: localSurveyId,displayName: req.user?req.user.displayName:''});
}

module.exports.processAddQuestionPage = (req, res, next) => {
    const localSurveyId = req.params.id;

    const newQuestion = Question({
        question1: req.body.question1,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        surveyId: localSurveyId,
        answer:req.body.answer
    })

    Question.create(newQuestion, (err, Question) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the question list for the selected survey
            res.redirect('/survey-list/questions/' + localSurveyId);
        }
    });

}
module.exports.displayEditQuestionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;

    Question.findById(localSurveyId,(err,questionToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('question/edit',{title:'Edit Question',question:questionToEdit,displayName: req.user?req.user.displayName:''});
        }
    });
}
module.exports.processEditQuestionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;
    let surveyId=req.params.surveyId;
    
    const updateQuestion=Question({
        _id:localSurveyId,
        surveyId: req.body.surveyId,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        question1: req.body.question1,
        answer:req.body.answer
    });
    Question.updateOne({_id:localSurveyId},updateQuestion,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the list
            res.redirect('/survey-list');
          
        }
    });
}
//mcq question list section

module.exports.displayAddMCQQuestionPage = (req, res, next) => {
    const localSurveyId = req.params.id;

    res.render('question/addMcq', {title: 'Add New Question', surveyId: localSurveyId,displayName: req.user?req.user.displayName:''});
}

module.exports.processAddMCQQuestionPage = (req, res, next) => {
    const localSurveyId = req.params.id;

    const newQuestion = Question({
        question1: req.body.question1,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer,
        surveyId: localSurveyId
    })

    Question.create(newQuestion, (err, Question) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the question list for the selected survey
            res.redirect('/survey-list/questions-mcq/' + localSurveyId);
        }
    });

}
module.exports.displayEditMCQQuestionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;

    Question.findById(localSurveyId,(err,questionToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('question/editMcq',{title:'Edit Question',question:questionToEdit,displayName: req.user?req.user.displayName:''});
        }
    });
}
module.exports.processEditMCQQuestionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;
    let surveyId=req.params.surveyId;
    
    const updateQuestion=Question({
        _id:localSurveyId,
        surveyId: req.body.surveyId,
        question1: req.body.question1,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer
    });
    Question.updateOne({_id:localSurveyId},updateQuestion,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the list
            res.redirect('/survey-list');
          
        }
    });
}
module.exports.performMCQDelete =  (req, res, next) => {
    let id = req.params.id;
    let surveyId = req.params.surveyId;

    Question.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            res.redirect('/survey-list/questions-mcq/' + surveyId);
        }
    });
}
//Display option page
module.exports.displayAddOptionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;

    Question.findById(localSurveyId,(err,questionToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('question/option',{title:'Edit Options',question:questionToEdit,displayName: req.user?req.user.displayName:''});
        }
    });
}
module.exports.processAddOptionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;
    let surveyId=req.params.surveyId;
    
    const updateQuestion=Question({
        _id:localSurveyId,
        surveyId: req.body.surveyId,
        question1: req.body.question1,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer
    });
    Question.updateOne({_id:localSurveyId},updateQuestion,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the list
            res.redirect('/survey-list');
          
        }
    });
}
//process add answer section

module.exports.processAddAnswerPage=(req,res,next)=>{
    const localSurveyId = req.params.id;
    let surveyId=req.params.surveyId;
    
    const updateQuestion=Question({
        _id:localSurveyId,
        surveyId: req.body.surveyId,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        question1: req.body.question1,
        answer:req.body.answer
    });
    Question.updateOne({_id:localSurveyId},updateQuestion,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the list
            res.redirect('/survey-list/add-response/'+localSurveyId);
          
        }
    });
}