let mongoose=require('mongoose');

let surveyModel=mongoose.Schema({
    title: String,
    type:String,
    author:String,
    activeDate:String,
    expiryDate:String,
    responses:{
        type:Number,
        default:0
    }
    
},
{
    collection:"surveys"
});
module.exports=mongoose.model('Survey',surveyModel);