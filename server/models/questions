let mongoose = require('mongoose');

// create a model class
let questionModel = mongoose.Schema({
    surveyId: mongoose.Schema.Types.ObjectId,
    question1:String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer:String,
    
},
{
    collection: "questions"
});

module.exports = mongoose.model('Question', questionModel);