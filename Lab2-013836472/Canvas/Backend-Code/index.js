//import the require dependencies

var express = require("express");
var ROOT_URL2 = "http://localhost:3000";
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var generateToken = require("./tokens").generateToken;
var cors = require("cors");
var multer = require("multer");
app.set("view engine", "ejs");
app.use(cors({ origin: `${ROOT_URL2}`, credentials: true }));
app.use("/uploads", express.static("uploads"));
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `${ROOT_URL2}`); //A response that tells the browser to allow requesting code from the origin http://localhost:3000 to access a resource
  res.setHeader("Access-Control-Allow-Credentials", "true"); //to allow cookies
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("WhILE SETTING FILE DIR  ", file);
    cb(null, "./uploads/profile");
  },
  filename: function (req, file, cb) {
    let name = file.originalname;
    let pos = name.lastIndexOf(".");
    var ext = name.slice(pos);
    let newName = file.fieldname + "-" + Date.now() + ext;
    console.log("WhILE SETTING FILE NAME  ", file, newName);
    cb(null, newName);
  }
});
var multerUploadProfileUpdate = multer({ storage: imageStorage });

var assignmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("WhILE SETTING FILE DIR  ", file);
    cb(null, "./uploads/submissions");
  },
  filename: function (req, file, cb) {
    let name = file.originalname;
    let pos = name.lastIndexOf(".");
    var ext = name.slice(pos);
    let newName = file.fieldname + "-" + Date.now() + ext;
    console.log("WhILE SETTING FILE NAME  ", file, newName);
    cb(null, newName);
  }
});
var multerAssignmentUpload = multer({ storage: assignmentStorage });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "./uploads/filesteacher");
  },
  filename: function (req, file, cb) {
    let a = file;
    let name = file.originalname;
    let pos = name.lastIndexOf(".");
    var ext = name.slice(pos);
    console.log(ext); //.ext
    console.log(a);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
});
var multerFileUpload = multer({ storage: storage });

var rpc = new (require('./Kafka/kafkarpc'))();
let makeReq = (req,res) =>{
  console.log("check")
  let topic_queue=req.topic_queue;
  let payload={
    body:req.body,
    params:req.params,
    query:req.query,
    files:req.files,
    file:req.file,
    type:req.topic_subtype
  };
  let cb=(err, kafka_res)=>{
    if(err){
      res.status(400);
    }
    else{
      res.status(200).send(kafka_res);
    }
  };
  //cb will get called after we get the response of makeRequest
  rpc.makeRequest(topic_queue, payload, cb);  //this indirectly calls kafka backend
  
}

var auth=require("./Controller/AuthController");
app.post("/user_signup",(req,res, next)=>{
  req.topic_queue="users";
  req.topic_subtype="signupUser";
  next();
} ,makeReq);  //registerRequest


let makeReq2 =(topic_queue,topic_subtype)=>{
  return (req,res) =>{
    let payload={
      body:req.body,
      params:req.params,
      query:req.query,
      files:req.files,
      file:req.file,
      type:topic_subtype
    };
    let cb=(err, kafka_res)=>{
      if(err){
        res.status(400);
      }
      else{
        res.status(200).send(kafka_res);
      }
    };
    //cb will get called after we get the response of makeRequest
    rpc.makeRequest(topic_queue, payload, cb);  //this indirectly calls kafka backend
    
  }
}




app.post("/user_login", makeReq2('users','loginUser'));  //loginRequest

var profile=require("./Controller/ProfileController");
// app.post("/profile", profile.fetchProfile);
app.post("/profile", makeReq2('users','fetchProfile'));
// app.post("/profile/update", multerUploadProfileUpdate.single("imageup"), profile.updateProfile);
app.post("/profile/update", multerUploadProfileUpdate.single("imageup"), makeReq2('users','updateProfile'));

var courses=require("./Controller/CoursesController");
// app.post("/student/displaycourse", courses.studentDisplayCourses);  //displayCourses  CoursesAction
app.post("/student/displaycourse", makeReq2('courses','studentDisplayCourses'));
// app.post("/teacher/courses/home", courses.teacherDisplayCourses); //getCourseDetails  CourseDetailsAction
app.post("/teacher/courses/home", makeReq2('courses','teacherDisplayCourses'));
// app.post("/home/createcourse", courses.createCourse);
app.post("/home/createcourse", makeReq2('courses','createCourse'));
// app.post("/home/displaycourse", courses.displayCourse);
app.post("/home/displaycourse", makeReq2('courses','displayCourse'));
// app.post("/student/dropcourse", courses.dropCourse);
app.post("/student/dropcourse", makeReq2('courses','dropCourse'));

var assignment=require("./Controller/AssignmentController");
// app.post("/home/createassignment", assignment.createAssignment);
app.post("/home/createassignment", makeReq2('courses','createAssignment'));
// app.post("/home/displayassignment", assignment.displayAssignment);
app.post("/home/displayassignment", makeReq2('courses','displayAssignment'));
// app.post("/teacher/assignment/view", assignment.teacherViewAssignments);  //viewSingleSubmission
app.post("/teacher/assignment/view", makeReq2('courses','teacherViewAssignments'));
// app.post("/teacher/assignment/grade", assignment.teacherGradeAssignments);  //giveGrade
app.post("/teacher/assignment/grade", makeReq2('courses','teacherGradeAssignments'));
// app.post("/assignment/details", assignment.assignmentDetails);  //getAssignmentDetails
app.post("/assignment/details", makeReq2('courses','assignmentDetails'));
// app.post("/teacher/viewsubmissions", assignment.teacherViewSubmissions);  //viewAllSubmissions
app.post("/teacher/viewsubmissions", makeReq2('courses','teacherViewSubmissions'));
// app.post("/assignment/submit", multerAssignmentUpload.single("subup"), assignment.submitAssignment); //uploadFile
app.post("/assignment/submit", multerAssignmentUpload.single("subup"), makeReq2('courses','submitAssignment'));

var announcement=require("./Controller/AnnouncementController");
// app.post("/home/createannouncement", announcement.createAnnouncement);
app.post("/home/createannouncement", makeReq2('courses','createAnnouncement'));
// app.post("/home/displayannouncement", announcement.displayAnnouncement);
app.post("/home/displayannouncement", makeReq2('courses','displayAnnouncement'));

var enroll=require("./Controller/EnrollmentController");
// app.post("/search", enroll.searchCourse);
app.post("/search", makeReq2('courses','searchCourse'));
// app.post("/enroll", enroll.enrollCourse);
app.post("/enroll", makeReq2('courses','enrollCourse'));

var people=require("./Controller/PeopleController");
// app.get("/teacher/courses/people", people.displayPeople);
app.get("/teacher/courses/people", makeReq2('courses','displayPeople'));

var grades=require("./Controller/GradeController");
// app.post("/student/displaygrade", grades.displayGrades);
app.post("/student/displaygrade", makeReq2('courses','displayGrades'));

var files=require("./Controller/FileController");
// app.get("/home/displayfiles", files.displayFiles);
app.get("/home/displayfiles", makeReq2('courses','displayFiles'));
// app.post("/home/fileupload", multerFileUpload.single("up"), files.fileUpload);
app.post("/home/fileupload", multerFileUpload.single("up"), makeReq2('courses','fileUpload'));

var msg=require("./Controller/MessageController");
// app.get("/inbox/peopledetails", msg.getPeopleDetails);
app.get("/inbox/peopledetails", makeReq2('inbox','getPeopleDetails'));
// app.post("/inbox/sendmessage", msg.sendMessage);
app.post("/inbox/sendmessage", makeReq2('inbox','sendMessage'));
// app.post("/inbox/displaymessages", msg.displayMessages);
app.post("/inbox/displaymessages", makeReq2('inbox','displayMessages'));
// app.post("/inbox/reply", msg.replyMessages);
app.post("/inbox/reply", makeReq2('inbox','replyMessages'));

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
module.exports = app;
