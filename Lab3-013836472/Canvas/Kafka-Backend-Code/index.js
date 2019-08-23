var connection = new require('./Kafka/Connection');
var auth = require("./Controller/AuthController");
var profile=require("./Controller/ProfileController");
var courses=require("./Controller/CoursesController");
var assignment=require("./Controller/AssignmentController");
var announcement=require("./Controller/AnnouncementController");
var enroll=require("./Controller/EnrollmentController");
var people=require("./Controller/PeopleController");
var grades=require("./Controller/GradeController");
var files=require("./Controller/FileController");
var msg=require("./Controller/MessageController");

var consumer = connection.getConsumer();
var producer = connection.getProducer();

console.log('server is running ');
consumer.on('message', function (message) {
    try {
        console.log(JSON.stringify(message.value));
    //payload.messages from kafkarpc in backend
    var data = JSON.parse(message.value);
    let functionToCall = null;
    if (data.replyTo.split('-')[1] == 'users') {
        switch (data.data.type) {
            case 'signupUser':
                functionToCall = auth.signupUser;
                break;
            case 'loginUser':
                functionToCall = auth.loginUser;
                break;
            case 'fetchProfile':
                functionToCall = profile.fetchProfile;
                break;
            case 'updateProfile':
                functionToCall = profile.updateProfile;
                break;
            default:
                 functionToCall= (req, cb)=>{
                    cb(true, null);
                 };
            break;
        }
    }else if(data.replyTo.split('-')[1] == 'courses'){
        switch (data.data.type){
            case 'studentDisplayCourses':
                functionToCall = courses.studentDisplayCourses;
                break;
            case 'teacherDisplayCourses':
                functionToCall = courses.teacherDisplayCourses;
                break;
            case 'createCourse':
                functionToCall = courses.createCourse;
                break;
            case 'displayCourse':
            console.log("DISPLAY COURSE")
                functionToCall = courses.displayCourse;
                break;
            case 'dropCourse':
                functionToCall = courses.dropCourse;
                break;
            case 'createAssignment':
                functionToCall = assignment.createAssignment;
                break;
            case 'displayAssignment':
                functionToCall = assignment.displayAssignment;
                break;
            case 'teacherViewAssignments':
                functionToCall = assignment.teacherViewAssignments;
                break;
            case 'teacherGradeAssignments':
                functionToCall = assignment.teacherGradeAssignments;
                break;
            case 'assignmentDetails':
                functionToCall = assignment.assignmentDetails;
                break;
            case 'teacherViewSubmissions':
                functionToCall = assignment.teacherViewSubmissions;
                break;
            case 'submitAssignment':
                functionToCall = assignment.submitAssignment;
                break;
            case 'createAnnouncement':
                functionToCall = announcement.createAnnouncement;
                break;
            case 'displayAnnouncement':
                functionToCall = announcement.displayAnnouncement;
                break;
            case 'searchCourse':
                functionToCall = enroll.searchCourse;
                break;
            case 'enrollCourse':
                functionToCall = enroll.enrollCourse;
                break;
            case 'displayPeople':
                functionToCall = people.displayPeople;
                break;
            case 'displayGrades':
                functionToCall = grades.displayGrades;
                break;
            case 'displayFiles':
                functionToCall = files.displayFiles;
                break;
            case 'fileUpload':
                functionToCall = files.fileUpload;
                break;
            default:
                functionToCall= (req, cb)=>{
                   cb(true, null);
                };
           break;
        }
    }
    else if(data.replyTo.split('-')[1] == 'inbox'){
        switch (data.data.type){
            case 'getPeopleDetails':
                functionToCall = msg.getPeopleDetails;
                break;
            case 'sendMessage':
                functionToCall = msg.sendMessage;
                break;
            case 'displayMessages':
                functionToCall = msg.displayMessages;
                break;
            case 'replyMessages':
                functionToCall = msg.replyMessages;
                break;
            default:
                functionToCall= (req, cb)=>{
                   cb(true, null);
                };
           break;
        }
    }
    
    functionToCall(data.data, function (err, res) {
        console.log('after handle' + res);
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res,
                    error: err
                }),
                partition: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
        return;
    });
    } catch (error) {
        console.log(error)
    }
    
});