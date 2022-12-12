let express=require('express');
let router=express.Router();
let mongoose=require('mongoose');

let passport=require('passport');

let surveyController=require('../controllers/survey');
let questionController=require('../controllers/question');

//helper function for guard purposes
function requireAuth(req,res,next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
/*GET Route for the Book List page - READ operation*/
router.get('/',surveyController.displaySurveyList);

/*GET Route for displaying Add page - CREATE operation*/
router.get('/add',requireAuth, surveyController.displayAddPage);

/*GET Route for processing the Add page - CREATE operation*/
router.post('/add',requireAuth, surveyController.processAddPage);

/*GET Route for displaying the Edit page - UPDATE operation*/
router.get('/edit/:id',requireAuth,surveyController.displayEditPage);

/*GET Route for processing the Edit page - UPDATE operation*/
router.post('/edit/:id',requireAuth,surveyController.processEditPage);

/*GET to perform Deletion - DELETE operation*/
router.get('/delete/:id',requireAuth,surveyController.performDelete);

/*GET Route for displaying the Edit page - UPDATE operation*/
router.get('/add-response/:id',surveyController.displayResponsePage);

/*GET Route for processing the Edit page - UPDATE operation*/
router.post('/add-response/:id',surveyController.processResponsePage);

/* GET Route for displaying the question page */
router.get('/questions/:id',requireAuth,questionController.displayQuestionList);

/* GET Route for displaying the MCQ question page */
router.get('/questions-mcq/:id',requireAuth,questionController.displayMCQQuestionList);

/* GET Route for displaying the Attend Short Question Survey page */
router.get('/attend-survey/:id',questionController.displayAttendShortSurveyList);

/* POST Route for processing the Add Answer page - CREATE operation within the questions model. */
router.post('/attend-survey/:id',questionController.processAddAnswerPage);

/* GET Route for displaying the Attend MCQ Question Survey page */
router.get('/attend-mcq/:id',questionController.displayAttendMCQSurveyList);

/* POST Route for processing the Attend MCQ Survey page */
router.post('/attend-mcq/:id',questionController.processAddAnswerPage);

/* GET Route to perform Deletion of question */
router.get('/delete-question/:id/:surveyId',requireAuth,questionController.performDelete);

/* GET Route for processing the Add question page - CREATE operation within the questions model. */
router.get('/add-question/:id',requireAuth,questionController.displayAddQuestionPage);

/* POST Route for processing the Add question page - CREATE operation within the questions model. */
router.post('/add-question/:id',requireAuth, questionController.processAddQuestionPage);

/*GET Route for displaying the Edit Question page - UPDATE operation*/
router.get('/edit-question/:id',requireAuth,questionController.displayEditQuestionPage);

/*GET Route for processing the Edit Question page - UPDATE operation*/
router.post('/edit-question/:id',requireAuth,questionController.processEditQuestionPage);

/* GET Route for processing the Add MCQ question page - CREATE operation within the questions model. */
router.get('/add-mcq/:id',requireAuth,questionController.displayAddMCQQuestionPage);

/* POST Route for processing the Add MCQ question page - CREATE operation within the questions model. */
router.post('/add-mcq/:id',requireAuth, questionController.processAddMCQQuestionPage);

/*GET Route for displaying the Edit MCQ Question page - UPDATE operation*/
router.get('/edit-mcq/:id',requireAuth,questionController.displayEditMCQQuestionPage);

/*GET Route for processing the Edit MCQ Question page - UPDATE operation*/
router.post('/edit-mcq/:id',requireAuth,questionController.processEditMCQQuestionPage);

/* GET Route to perform Deletion of mcq question */
router.get('/delete-mcq/:id/:surveyId',requireAuth,questionController.performMCQDelete);

/* GET Route for displaying the Add Options page */
router.get('/add-options/:id',requireAuth,questionController.displayAddOptionPage);

/* POST Route for processing the Add Options page  */
router.post('/add-options/:id',requireAuth, questionController.processAddOptionPage);


module.exports=router;