//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var generateToken = require("./tokens").generateToken;
var cors = require("cors");
var multer = require("multer");
app.set("view engine", "ejs");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); //A response that tells the browser to allow requesting code from the origin http://localhost:3000 to access a resource
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

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "canvas_db"
});

//   var con  = mysql.createPool({
//   connectionLimit : 500,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'password',
//   database        : 'canvas_db'
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/student_signup", function (req, res) {
  console.log("Inside post student signup");
  console.log(req.body.name, req.body.email, req.body.password);
  console.log("Student Data accepted");
  var sql_checkifpresent =
    "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      console.log("rows: ", row);
      if (row.length) {
        console.log("student already present");
        res.end(
          "Student details already present in the database. Please login"
        );
      } else {
        console.log("inside else");
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          var sql =
            "INSERT INTO studentdetails (name, email, password) VALUES (" +
            mysql.escape(req.body.name) +
            "," +
            mysql.escape(req.body.email) +
            "," +
            mysql.escape(hash) +
            ")";
          con.query(sql, function (err, row) {
            if (err) {
              console.log("hashed value: ", hash);
              console.log("error in query storing");
              res.status(400);
              //res.writeHead(400, { "Content-Type": "text/plain" });
              //res.end("Error while storing student details");
            } else {
              console.log("hashed value: ", hash);
              res.status(200).send(row[0]);
            }
          });
        });
      }
    }
  });
});

app.post("/teacher_signup", function (req, res) {
  console.log("Inside post teacher signup");
  console.log(req.body.name, req.body.email, req.body.password);
  console.log("Teacher Data accepted");
  var sql_checkifpresent =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      console.log("rows: ", row);
      if (row.length) {
        console.log("teacher already present");
        res.end(
          "Teacher details already present in the database. Please login"
        );
      } else {
        console.log("inside else");
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          var sql =
            "INSERT INTO teacherdetails (name, email, password) VALUES (" +
            mysql.escape(req.body.name) +
            "," +
            mysql.escape(req.body.email) +
            "," +
            mysql.escape(hash) +
            ")";
          con.query(sql, function (err, row) {
            if (err) {
              console.log("hashed value: ", hash);
              console.log("error in query storing");
              res.status(400);
              //res.writeHead(400, { "Content-Type": "text/plain" });
              //res.end("Error while storing teacher details");
            } else {
              console.log("hashed value: ", hash);
              res.status(200).send(row[0]);
            }
          });
        });
      }
    }
  });
});

app.post("/student_login", function (req, res) {
  console.log("Inside post student login");
  console.log(req.body.email, req.body.password);
  console.log("student Data accepted");

  //   var sql_checkpassword =
  //     "SELECT * FROM studentdetails WHERE password=" +
  //     mysql.escape(req.body.password);
  var sql_checkemail =
    "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email);
  con.query(sql_checkemail, function (err, row) {
    if (err) {
      //   res.writeHead(400, { "Content-Type": "text/plain" });
      //   res.end("Error while student login");
      res.status(400)
    } else {
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Student is not present. Please sign up.");
        res.status(400);
      } else {
        bcrypt.compare(req.body.password, row[0].password, function (
          err,
          result
        ) {
          //if (row.length && row[0].password === req.body.password) {
          //if user is present in the db then login
          if (result) {
            delete row[0].password;
            var token = generateToken(row[0].email);
            var type = "student";
            var returnobj = { userdata: row[0], token: token, type: type };
            console.log("returnobj: ",returnobj);
            console.log("Login success");
            res.status(200).send(returnobj);
          } else {
            console.log("Username or password is incorrect");
            res.status(400).send({});
          }
        });
      }
    }
  });
});

app.post("/teacher_login", function (req, res) {
  console.log("Inside post teacher login");
  console.log(req.body.email, req.body.password);
  console.log("teacher Data accepted");

  //   var sql_checkpassword =
  //     "SELECT * FROM teacherdetails WHERE password=" +
  //     mysql.escape(req.body.password);
  var sql_checkemail =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.email);
  con.query(sql_checkemail, function (err, row) {
    if (err) {
      //   res.writeHead(400, { "Content-Type": "text/plain" });
      //   res.end("Error while teacher login");
      res.status(400);
    } else {
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        res.status(400);
      } else {
        bcrypt.compare(req.body.password, row[0].password, function (
          err,
          result
        ) {
          //if (row.length && row[0].password === req.body.password) {
          //if user is present in the db then login
          if (result) {
            delete row[0].password;
            var token = generateToken(row[0].email);
            var type = "teacher";
            var returnobj = { userdata: row[0], token: token, type: type };
            console.log(returnobj);
            console.log("Login success");
            res.status(200).send(returnobj);
          } else {
            console.log("Username or password is incorrect");
            res.status(400);
          }
        });
      }
    }
  });
});

app.post("/home/createcourse", function (req, res) {
  console.log("Inside post Create course");
  console.log("Req Body : ", req.body);
  console.log("email", req.body.em);
  //courses: courseID, courseName, courseDept, courseDesc, courseRoom, courseCapacity, waitlistcapacity, courseTerm
  var sql_checkemail =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.em);
  con.query(sql_checkemail, function (err, row) {
    if (err) {
      //   res.writeHead(400, { "Content-Type": "text/plain" });
      //   res.end("Error while teacher login");
      res.status(400);
    } else {
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        res.status(400);
      } else {
        var sql =
          "INSERT INTO coursedetails (email, courseid, coursename, coursedept, coursedesc, courseroom, coursecapacity, waitlistcapacity, courseterm) VALUES (" +
          mysql.escape(req.body.em) +
          "," +
          mysql.escape(req.body.courseID) +
          "," +
          mysql.escape(req.body.courseName) +
          "," +
          mysql.escape(req.body.courseDept) +
          "," +
          mysql.escape(req.body.courseDesc) +
          "," +
          mysql.escape(req.body.courseRoom) +
          "," +
          mysql.escape(req.body.courseCapacity) +
          "," +
          mysql.escape(req.body.waitlistcapacity) +
          "," +
          mysql.escape(req.body.courseTerm) +
          ")";
        con.query(sql, function (err, row1) {
          if (err) {
            console.log("error in query storing");
            res.status(400);
            //res.writeHead(400, { "Content-Type": "text/plain" });
            //res.end("Error while storing student details");
          } else {
            console.log("data inserted into the database");
            res.status(200).send(row[0]);
          }
        });
      }
    }
  });
});

app.post("/home/displaycourse", function (req, res) {
  console.log("Inside display course");
  console.log("email: ", req.body.email);
  res.status(200);

  var sql_checkifpresent =
    "SELECT * FROM coursedetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      console.log("date sent back: ", row);
      res.status(200).send(row);
    }
  });
});
// console.log("Books : ", JSON.stringify(books));
// res.end(JSON.stringify(books));

app.post("/home/createassignment", function (req, res) {
  console.log("Inside post Create assignment");
  console.log("Req Body : ", req.body);
  console.log("email", req.body.em);
  console.log("courseid: ", req.body.courseid);
  //courses: courseID, courseName, courseDept, courseDesc, courseRoom, courseCapacity, waitlistcapacity, courseTerm
  var sql_checkemail =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.em);
  con.query(sql_checkemail, function (err, row) {
    if (err) {
      //   res.writeHead(400, { "Content-Type": "text/plain" });
      //   res.end("Error while teacher login");
      res.status(400);
    } else {
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        res.status(400);
      } else {
        //GET COURSEID FROM THE FRONTEND URL
        var sql =
          "INSERT INTO assignmentdetails (email, assignmenttitle, assignmentdesc, duedate, courseid, points) VALUES (" +
          mysql.escape(req.body.em) +
          "," +
          mysql.escape(req.body.assignmenttitle) +
          "," +
          mysql.escape(req.body.assignmentdesc) +
          "," +
          mysql.escape(req.body.duedate) +
          "," +
          mysql.escape(req.body.courseid) +
          "," +
          mysql.escape(req.body.points) +
          ")";
        console.log(sql);
        con.query(sql, function (err, row1) {
          if (err) {
            console.log("error in query storing");
            res.status(400);
            //res.writeHead(400, { "Content-Type": "text/plain" });
            //res.end("Error while storing student details");
          } else {
            console.log("data inserted into the database");
            res.status(200).send(row[0]);
          }
        });
      }
    }
  });
});
app.post("/home/displayassignment", function (req, res) {
  console.log("Inside display assignment");
  console.log("email: ", req.body.email);
  console.log("courseid: ", req.body.courseid);
  /*email=" +mysql.escape(req.body.email) + " AND */
  var sql_checkifpresent =
    "SELECT * FROM assignmentdetails WHERE courseid=" + mysql.escape(req.body.courseid); //list of email of all student in the db
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      // console.log("date sent back: ", row);
      // console.log("Date format: ", row[7]);
      // console.log("Date format: ", row[7].duedate);
      // var d = new Date(row[7].duedate).toLocaleString();
      // console.log("DATE: ",d);
      res.status(200).send(row);
    }
  });
});

app.post("/home/createannouncement", function (req, res) {
  console.log("Inside post Create announcement");
  console.log("Req Body : ", req.body);
  console.log("email", req.body.em);
  //courses: courseID, courseName, courseDept, courseDesc, courseRoom, courseCapacity, waitlistcapacity, courseTerm
  var sql_checkemail =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.em);
  con.query(sql_checkemail, function (err, row) {
    if (err) {
      //   res.writeHead(400, { "Content-Type": "text/plain" });
      //   res.end("Error while teacher login");
      res.status(400);
    } else {
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        res.status(400);
      } else {
        var sql =
          "INSERT INTO announcementdetails (email, announcementtitle, announcementdesc, courseid) VALUES (" +
          mysql.escape(req.body.em) +
          "," +
          mysql.escape(req.body.announcementtitle) +
          "," +
          mysql.escape(req.body.announcementdesc) +
          "," +
          mysql.escape(req.body.courseid) +
          ")";
        con.query(sql, function (err, row1) {
          if (err) {
            console.log("error in query storing");
            res.status(400);
            //res.writeHead(400, { "Content-Type": "text/plain" });
            //res.end("Error while storing student details");
          } else {
            console.log("data inserted into the database");
            res.status(200).send(row[0]);
          }
        });
      }
    }
  });
});
app.post("/home/displayannouncement", function (req, res) {
  console.log("Inside display announcements");
  console.log("email: ", req.body.email);
  res.status(200);
/*email=" +mysql.escape(req.body.email) + " AND */
  var sql_checkifpresent =
    "SELECT * FROM announcementdetails WHERE courseid=" + mysql.escape(req.body.courseid); //list of email of all student in the db
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      console.log("date sent back: ", row);
      res.status(200).send(row);
    }
  });
});

// app.get("/studenthome/dashboard", function(req, res) {
//   console.log("Inside display student home dashboard");
//   console.log("email: ", req.query.email);
//   res.status(200);

//   // var sql_checkifpresent =
//   //   "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db

//   var sql_checkifpresent =
//     "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.query.email); //list of email of all student in the db
//   console.log(req.query.email);
//   console.log(sql_checkifpresent);
//   con.query(sql_checkifpresent, function(err, row) {
//     //console.log("rows: " + row);
//     if (err) {
//       res.status(400);
//     } else {
//       // console.log("rows: ", row);
//       delete row[0].password;
//       console.log("data sent back: ", row);
//       res.status(200).send(row);
//     }
//   });
// });

app.post("/studenthome/dashboard", function (req, res) {
  console.log("Inside display student home dashboard");
  console.log("email: ", req.body.email);
  res.status(200);

  // var sql_checkifpresent =
  //   "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db

  var sql_checkifpresent =
    "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      delete row[0].password;
      console.log("data sent back: ", row);
      res.status(200).send(row);
    }
  });
});

app.post("/studenthome/editstudentprofile", function (req, res) {
  console.log("Inside student edit profile");
  console.log("email: ", req.body.email);
  res.status(200);

  var sql_checkifpresent =
    "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db

  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      delete row[0].password;
      console.log("date sent back: ", row);
      res.status(200).send(row);
    }
  });
});

app.get("/home/displayfiles", function (req, res) {
  console.log("Inside displayfile");
  console.log("email: ", req.query.email);
  res.status(200);

  // var sql_checkifpresent =
  //   "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all student in the db
/**email=" + mysql.escape(req.query.email) + " AND */
  var sql_checkifpresent =
    "SELECT * FROM fileuploads WHERE  courseid=" + mysql.escape(req.query.courseid); //list of email of all student in the db
  console.log(req.query.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      console.log("rows: ", row);
      if (row.length) {
        delete row[0].password;
        console.log("data sent back: ", row);
        res.status(200).send(row);
      } else {
        res.status(200).send(row);
      }
    }
  });
});
var storage1 = multer.diskStorage({
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
var upload1 = multer({ storage: storage1 });
app.post("/student/profile/update", upload1.single("imageup"), function (req, res) {
  console.log("Inside post student profile update");
  console.log("req.body", req.body);
  console.log("req.body.em", req.body.em);
  console.log("Student Data accepted");
  // console.log("req.file", req.file);
  // console.log("req.file.path", req.file.path);
  var sql_checkifpresent =
    "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.em); //list of email of all student in the db
  console.log("req.body.email", req.body.em);
  console.log("ql_checkifpresent", sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400).send({});
    } else {
      console.log("rows: ", row);
      if (!row.length) {
        console.log("email is not present in the database");
        res.status(400).send({});
      } else {
        console.log("inside else");
        var sql = "UPDATE studentdetails SET name=" + mysql.escape(req.body.name);
        if (req.file && req.file.path) {
          sql += ",image=" + mysql.escape(req.file.path);
        }
        sql += ", phone=" + mysql.escape(req.body.phone)
          + ", aboutme=" + mysql.escape(req.body.aboutme)
          + ", city=" + mysql.escape(req.body.city)
          + ", company=" + mysql.escape(req.body.company)
          + ", school=" + mysql.escape(req.body.school)
          + ", hometown=" + mysql.escape(req.body.hometown)
          + ", languages=" + mysql.escape(req.body.languages)
          + ", gender=" + mysql.escape(req.body.gender)
          + " WHERE email=" + mysql.escape(req.body.email);
          console.log("sql > ",sql)
        con.query(sql, function (err, row) {
          if (err) {
            console.log("error in update query",err);
            res.status(400).send({});
          } else {
            console.log("row[0]");
            res.status(200).send(row[0]);
          }
        });
      }
    }
  });
});
//var upload = multer({ dest: "uploads/" });
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
var upload = multer({ storage: storage });

app.post("/home/fileupload", upload.single("up"), function (req, res, next) {
  console.log("inside home fileupload");
  let a = { stat: res.statusCode };
  console.log(req.file);
  console.log(req.file.path);

  console.log("Req Body : ", req.body);
  console.log("email", req.body.email);
  console.log("courseid", req.body.courseid);
  var sql_checkemail =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.email);
  con.query(sql_checkemail, function (err, row) {
    if (err) {
      //   res.writeHead(400, { "Content-Type": "text/plain" });
      //   res.end("Error while teacher login");
      res.status(400);
    } else {
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        res.status(400);
      } else {
        var sql =
          "INSERT INTO fileuploads (email, courseid, filepath) VALUES (" +
          mysql.escape(req.body.email) +
          "," +
          mysql.escape(req.body.courseid) +
          "," +
          mysql.escape(req.file.path) +
          ")";
        con.query(sql, function (err, row1) {
          if (err) {
            console.log("error in query storing");
            res.status(400);
            //res.writeHead(400, { "Content-Type": "text/plain" });
            //res.end("Error while storing student details");
          } else {
            console.log("data inserted into the database");
            res.status(200).send(row[0]);
          }
        });
      }
    }
  });
});

// app.post('/search', function(req, res){
//   console.log('Inside Search POST: ', req.body);
//       console.log("Search result : ",JSON.stringify(searchResult));
//       res.end(JSON.stringify(searchResult));
// });

app.post("/search", function (req, res) {
  console.log("Inside post search");
  console.log("Req Body : ", req.body);
  console.log("string: ", req.body.search);
  var str = req.body.search;
  var posofat = str.indexOf("@");
  console.log(posofat);
  var posofcolon = str.indexOf(":");
  console.log(posofcolon);
  var key = str.slice(posofat + 1, posofcolon);
  console.log("key: ", key);
  var value = str.slice(posofcolon + 1);
  console.log("value: ", value);
  // var string="%"+ key+"%";
  // console.log(string);
  if (!value) {
    res.status(200).send([]);
    return;
  }
  if (key === "courseid") {
    console.log("@courseid:");
    var sql = "SELECT * FROM coursedetails WHERE " + key + " LIKE '%" + value + "%'";
    console.log(sql);
    con.query(sql, function (err, row1) {
      if (err) {
        console.log("error in query storing");
        res.status(400);
        //res.writeHead(400, { "Content-Type": "text/plain" });
        //res.end("Error while storing student details");
      } else {
        console.log("rendered search results");
        res.status(200).send(row1);
      }
    });
  }
  else if (key === "courseterm") {
    console.log("@courseterm:");
    var sql = "SELECT * FROM coursedetails WHERE " + key + " LIKE '%" + value + "%'";
    console.log(sql);
    con.query(sql, function (err, row1) {
      if (err) {
        console.log("error in query storing");
        res.status(400);
        //res.writeHead(400, { "Content-Type": "text/plain" });
        //res.end("Error while storing student details");
      } else {
        console.log("rendered search results");
        res.status(200).send(row1);
      }
    });
  }
  else if (key === "coursename") {
    console.log("@coursename:");
    var sql = "SELECT * FROM coursedetails WHERE " + key + " LIKE '%" + value + "%'";
    console.log(sql);
    con.query(sql, function (err, row1) {
      if (err) {
        console.log("error in query storing");
        res.status(400);
        //res.writeHead(400, { "Content-Type": "text/plain" });
        //res.end("Error while storing student details");
      } else {
        console.log("rendered search results");
        res.status(200).send(row1);
      }
    });
  }
  else {
    console.log("general search");
    var sql =
      "SELECT * FROM coursedetails WHERE courseid LIKE '%" + str + "%' OR coursename LIKE '%" + str + "%' OR coursedept LIKE '%" + str + "%' OR courseroom LIKE '%" + str + "%' OR coursecapacity LIKE '%" + str + "%' OR waitlistcapacity LIKE '%" + str + "%' OR courseterm LIKE '%" + str + "%'";
    console.log(sql);
    con.query(sql, function (err, row1) {
      if (err) {
        console.log("error in query storing");
        res.status(400);
        //res.writeHead(400, { "Content-Type": "text/plain" });
        //res.end("Error while storing student details");
      } else {
        console.log("rendered search results");
        res.status(200).send(row1);
      }
    });
  }
});

app.post("/enroll", function (req, res) {
  console.log("Inside student enrollment");
  console.log("Req Body : ", req.body);
  console.log("email", req.body.s_em);
  console.log("courseid", req.body.cid);

  var sql1 =
    "SELECT * FROM enrollment WHERE email= " + mysql.escape(req.body.s_em) + " AND courseid= " + mysql.escape(req.body.cid);
  console.log(sql1);
  let output = {
    status: null,
    waitlistno: null
  }
  con.query(sql1, function (err, row1) {
    if (err) {
      res.status(400);
      return;
    } else {
      console.log("rows: " + row1.length);
      if (row1.length !== 0) {
        console.log("Student already enrolled!");
        res.status(400);
        return;
      } else {
        console.log("Inside student enrollment")
        var sql2 = "select * from coursedetails where email= " + mysql.escape(req.body.t_em) + " AND courseid=" + mysql.escape(req.body.cid);
        console.log(sql2);
        con.query(sql2, function (err, row2) {
          if (err) {
            console.log("error in query storing");
            res.status(400);
          } else {
            console.log("Inside query to check and reduce course capacity and waitlist capacity");
            if (row2[0].currentcapacity > 0) {
              console.log("If there are seats in the classroom");
              var curcoursecap = row2[0].currentcapacity - 1;
              var sql3 = "UPDATE coursedetails SET currentcapacity= " + mysql.escape(curcoursecap) + " WHERE email= " + mysql.escape(req.body.t_em) + " AND courseid= " + mysql.escape(req.body.cid)
              console.log(sql3);
              con.query(sql3, function (err, row3) {
                if (err) {
                  console.log("error in query storing");
                  res.status(400);
                }
                else {
                  console.log("enroll student: update capacity");
                  var sql4 = "INSERT INTO enrollment(courseid, email, enrollmentstatus) VALUES (" + mysql.escape(req.body.cid) + "," + mysql.escape(req.body.s_em) + ",'enrolled')"
                  console.log(sql4);
                  con.query(sql4, function (err, row4) {
                    if (err) {
                      console.log("error in query storing");
                      res.status(400);
                    }
                    else {
                      console.log("enroll student: update enroll status");
                      res.status(200);
                      output.status = "enrolled";
                      res.send(output)
                    }
                  })
                }
              })
            }
            else if (row2[0].currentcapacity === 0 && row2[0].currentwaitlistcapacity > 0) {
              console.log("If there are no seats in the classroom add to waitlist");
              var curwaitlistcap = row2[0].currentwaitlistcapacity - 1;
              var sql5 = "UPDATE coursedetails SET currentwaitlistcapacity= " + mysql.escape(curwaitlistcap) + " WHERE email= " + mysql.escape(req.body.t_em) + " AND courseid= " + mysql.escape(req.body.cid)
              console.log(sql5);
              con.query(sql5, function (err, row3) {
                if (err) {
                  console.log("error in query storing");
                  res.status(400);
                }
                else {
                  console.log("waitlist student: update waitlist capacity");
                  var waitlistno = row2[0].waitlistcapacity - row2[0].currentwaitlistcapacity + 1;
                  var sql6 = "INSERT INTO enrollment(courseid, email, enrollmentstatus, waitlistno) VALUES (" + mysql.escape(req.body.cid) + "," + mysql.escape(req.body.s_em) + ",'waitlist'," + mysql.escape(waitlistno) + ")"
                  console.log(sql6);
                  con.query(sql6, function (err, row4) {
                    if (err) {
                      console.log("error in query storing");
                      res.status(400);
                    }
                    else {
                      console.log("waitlist student: update waitlist status");
                      res.status(200);
                      output.status = "waitlisted";
                      output.waitlistno = waitlistno;
                      res.send(output)
                    }
                  })
                }
              })
            }
            else if (row2[0].currentcapacity === 0 && row2[0].currentwaitlistcapacity === 0) {
              console.log("Class is full cannot enroll");
              res.status(400);
            }
            else {
              console.log("Error che!");
              res.status(400);
            }
          }
        });
      }
    }
  });
});

app.post("/student/displaycourse", function (req, res) {
  console.log("Inside display student enrolled course");
  console.log("email: ", req.body.email);
  var coursedeets = "SELECT * FROM coursedetails;"    //all courses from all profs
  var sql_checkifpresent =
    "SELECT * FROM enrollment WHERE email=" + mysql.escape(req.body.email) + " AND enrollmentstatus='enrolled'"
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    // console.log("date sent back: ", row);
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      console.log("date sent back: ", row);   //the courses from enrollment table that the user has enrolled in
      //console.log("enrollment stat ", row[0].enrollmentstatus);  //enrolled
      //if(row[0].enrollmentstatus='enrolled'){   //if user is enrolled
      console.log("student enrolled");
      con.query(coursedeets, function (err, row1) {   //all rows from coursedetails
        console.log("inside coursedeets");
        if (err) {
          res.status(400);
        } else {
          var a = [];
          for (var i = 0; i < row.length; i++) {
            for (var j = 0; j < row1.length; j++) {
              if (row[i].courseid === row1[j].courseid) {
                console.log(row1[j]);
                a.push(row1[j]);
              }
            }
          }
          console.log("a: ", a);
          res.status(200).send(a);
        }
      });
      //}
      // else{
      //   console.log("student is not enrolled in any course");
      // }
    }
  });
});

//teacher/courses/home

app.post("/teacher/courses/home", function (req, res) {
  console.log("Inside display teacher courses home");
  console.log("email: ", req.body.email);
  console.log("courseid: ", req.body.courseid);
  //send all rows from coursedetails where courseid=248 and email=toshakamath@gmail.com
  /**email=" + mysql.escape(req.body.email) + " AND  */
  var sql_checkifpresent =
    "SELECT * FROM coursedetails WHERE courseid=" + mysql.escape(req.body.courseid)
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    if (err) {
      res.status(400);
    } else {
      console.log("date sent back: ", row);
      res.status(200).send(row);
    }
  });
});

///teacher/courses/people
{/* where courseid=courseid and emailand status is enrolled>
        from enrollment table take student email, using student email take profile image and name */}
{/* send only courseid, from front end, */ }
app.get("/teacher/courses/people", function (req, res) {
  console.log("Inside people");
  console.log("email: ", req.query.email);
  res.status(200);
  var sql_checkifpresent =
    "SELECT email FROM enrollment WHERE courseid=" + mysql.escape(req.query.courseid) + " AND enrollmentstatus='enrolled'";
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {

      // var data=['a','b','c']\
      // data.join(",")
      // "a,b,c"
      //273A,273B,273C
      console.log(row);
      //     [ RowDataPacket { email: 'toshakamath@gmail.com' },
      // RowDataPacket { email: 'sanith.katukuri@gmail.com' } ]
      // console.log(Object.values(row));
      // console.log(Object.values(row[0]));
      // console.log(Object.values(row[1]));
      let a=[];
      for (let i = 0; i < row.length; i++){
        a.push((Object.values(row[i])).toString());
      }
      console.log("a: ",a);
      var queryData=[a];

        var getallenrolled="SELECT * FROM studentdetails WHERE email IN(?)"; //list of email of all student in the db
      console.log(req.body.email);
      console.log(getallenrolled);
      con.query(getallenrolled, queryData, function (err, row) {
        //console.log("rows: " + row);
        if (err) {
          res.status(400);
        } else {
          // console.log("rows: ", row);
          if(row.length){
          delete row[0].password;
          console.log("data sent back: ", row);
          res.status(200).send(row);
          }
          else{
            console.log("no data rows");
            res.status(400);
          }
        }
      });
    }
  });
});

app.post("/teacher/profile", function (req, res) {
  console.log("Inside display teacher profile");
  console.log("email: ", req.body.email);
  res.status(200);

  var sql_checkifpresent =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all teacher in the db
  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      delete row[0].password;
      console.log("data sent back: ", row);
      res.status(200).send(row);
    }
  });
});

app.post("/teacher/profile/edit", function (req, res) {
  console.log("Inside teacher edit profile");
  console.log("email: ", req.body.email);
  res.status(200);

  var sql_checkifpresent =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all teacher in the db

  console.log(req.body.email);
  console.log(sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      delete row[0].password;
      console.log("date sent back: ", row);
      res.status(200).send(row);
    }
  });
});
var storage1 = multer.diskStorage({
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
var upload1 = multer({ storage: storage1 });
app.post("/teacher/profile/update", upload1.single("imageup"), function (req, res) {
  console.log("Inside post teacher profile update");
  console.log("req.body", req.body);
  console.log("req.body.em", req.body.em);
  console.log("Teacher Data accepted");
  // console.log("req.file", req.file);
  // console.log("req.file.path", req.file.path);
  var sql_checkifpresent =
    "SELECT * FROM teacherdetails WHERE email=" + mysql.escape(req.body.em); //list of email of all teacher in the db
  console.log("req.body.email", req.body.em);
  console.log("sql_checkifpresent", sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      console.log("rows: ", row);
      if (!row.length) {
        console.log("email is not present in the database");
        res.status(400);
      } else {
        console.log("inside else");
        var sql = "UPDATE teacherdetails SET name=" + mysql.escape(req.body.name);
        if (req.file && req.file.path) {
          sql += ",image=" + mysql.escape(req.file.path);
        }
        sql += ", phone=" + mysql.escape(req.body.phone)
          + ", aboutme=" + mysql.escape(req.body.aboutme)
          + ", city=" + mysql.escape(req.body.city)
          + ", company=" + mysql.escape(req.body.company)
          + ", school=" + mysql.escape(req.body.school)
          + ", hometown=" + mysql.escape(req.body.hometown)
          + ", languages=" + mysql.escape(req.body.languages)
          + ", gender=" + mysql.escape(req.body.gender)
          + "WHERE email=" + mysql.escape(req.body.email);
        console.log("QUERy -- ",sql);
        con.query(sql, function (err, row) {
          if (err) {
            console.log("error in update query1",err);
            res.status(400).send({});
          } else {
            console.log("row[0]");
            res.status(200).send(row[0]);
          }
        });
      }
    }
  });
});

app.post("/teacher/assignment/view", function (req, res) {
  //Student name from email, submission id, filepath
  console.log("Inside upload assignment");
  console.log("email: ", req.body.email);
  console.log("assignmentid", req.body.assignmentid);
  console.log("courseid", req.body.courseid)
  //email=" + mysql.escape(req.body.email)+" AND
  var sql_checkifpresent = "SELECT * FROM submissions WHERE courseid=" + mysql.escape(req.body.courseid)+ "AND assignmentid=" + mysql.escape(req.body.assignmentid)+ "AND submissionid=" + mysql.escape(req.body.submissionid)+" ORDER BY submissionid DESC";
  console.log(sql_checkifpresent);
      
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      console.log("data sent back: ", row);
      let emails=[];
      for (let i = 0; i < row.length; i++){
        emails.push(row[i].studentemail);
      }
      console.log("row: ",row);
      console.log("emails: ",emails);
      var studentnames="SELECT name, email from studentdetails WHERE email IN('"+emails.join("','")+"')";
      console.log(studentnames);
      con.query(studentnames, emails, function (err, row1) {
        if(err){
          console.log("error in query",err);
          res.status(200);
        }
        else{
          console.log("row1: ", row1)
          for (var i = 0; i < row1.length; i++) {
            row1[i].submissions=[];
            for (var j = 0; j < row.length; j++) {
              if (row1[i].email === row[j].studentemail) {
                //row[j].studentname=[];
                //row[j].studentname.push(emails[i]);
                row1[i].submissions.push(row[j]);
              }
            }
          }
          console.log(JSON.stringify(row1,null,2));
          res.status(200).send(row1);
    }
  });
}
});

  // var sql_checkifpresent =
  //   "SELECT assignmenttitle, duedate, points FROM assignmentdetails WHERE assignmentid="+ mysql.escape(req.body.assignmentid);
  // console.log(sql_checkifpresent);
  // con.query(sql_checkifpresent, function (err, row) {
  //   if (err) {
  //     console.log("Error in sql query")
  //     res.status(400);
  //   } else {
  //     console.log("data sent back: ", row);
  //     res.status(200).send(row);
  //   }
  // });
});

app.post("/teacher/assignment/grade", function (req, res) {
  //Student name from email, submission id, filepath
  console.log("Inside grade assignment");
  console.log("req.bodyyyyy: ", req.body);
  // { email: 'sanith.katukuri@gmail.com',
  // courseid: '257',
  // assignmentid: '13',
  // submissionid: 24,
  // grade: null }
  console.log("UPDATE submissions SET grade=grade WHERE studentemail=req.body.email AND courseid=courseid AND assignmentid=assignmentid AND submissionid=submissionid");
  var sql_checkifpresent = "UPDATE submissions SET grade="+ mysql.escape(req.body.grade)+" WHERE studentemail="+mysql.escape(req.body.email)+" AND courseid=" + mysql.escape(req.body.courseid)+ " AND assignmentid=" + mysql.escape(req.body.assignmentid)+ " AND submissionid=" + mysql.escape(req.body.submissionid);
  console.log(sql_checkifpresent);
      
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      res.status(200).send(row);
    }
});
});

var storage2 = multer.diskStorage({
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
var upload2 = multer({ storage: storage2 });
app.post("/assignment/submit", upload2.single("subup"), function (req, res) {
  console.log("Inside assignment submit");
  console.log("req.body", req.body);
  console.log("req.body.courseid", req.body.courseid);
  console.log("req.body.assignmentid", req.body.assignmentid);
  console.log("req.body.email", req.body.email);
  console.log("req.file", req.file);
  console.log("req.file.path", req.file.path);
  //courseid, assignmentid, studentemail, filepath
  var sql_checkifpresent =
    "SELECT * FROM studentdetails WHERE email=" + mysql.escape(req.body.email); //list of email of all teacher in the db
  console.log("req.body.email", req.body.email);
  console.log("sql_checkifpresent", sql_checkifpresent);
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      console.log("rows: ", row);
      if (!row.length) {
        console.log("email is not present in the database");
        res.status(400);
      } else {
        console.log("inside else");
        //insert into submissions (courseid, assignmentid, studentemail, filepath) VALUES(req.body.courseid, req.body.assignmentid, req.body.em, )
        var sql = "INSERT INTO submissions (courseid, assignmentid, studentemail, filepath) VALUES(" 
        + mysql.escape(req.body.courseid)
        +","
        + mysql.escape(req.body.assignmentid)
        +","
        + mysql.escape(req.body.email)
        if (req.file && req.file.path) {
          sql += "," + mysql.escape(req.file.path)+");";
        }
        console.log(sql);
        con.query(sql, function (err, row2) {
          if (err) {
            console.log("error in query2");
            res.status(400);
          } else {
            console.log("row1", row2);
            console.log("row1[0]", row2[0]);
            req.body.filepath=req.file.path;
            console.log(req.body);
            res.status(200).send(req.body);
          }
        });
      }
    }
  });
});
///teacher/viewsubmissions
app.post("/teacher/viewsubmissions", function (req, res) {
  console.log("Inside view submissions");
  console.log("email: ", req.body.email);
  //check whether teacher present> if present
  //select studentemail, from submissions 
  //where courseid=courseid, assignmentid=assignmentid
  //student email, filepath, to give marks a input field + button to grade
  // > from student email get name from studentdetails table
  // var namesql="SELECT name from studentdetails WHERE email=studentemail"
  //console.log(namesql);
  var sql_checkifpresent = "SELECT * FROM submissions WHERE courseid=" + mysql.escape(req.body.courseid)+ "AND assignmentid=" + mysql.escape(req.body.assignmentid)+" ORDER BY submissionid DESC";
  console.log(sql_checkifpresent);
      
  con.query(sql_checkifpresent, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      console.log("data sent back: ", row);
      let emails=[];
      for (let i = 0; i < row.length; i++){
        emails.push(row[i].studentemail);
      }
      console.log("row: ",row);
      console.log("emails: ",emails);
      var studentnames="SELECT name, email from studentdetails WHERE email IN('"+emails.join("','")+"')";
      console.log(studentnames);
      con.query(studentnames, emails, function (err, row1) {
        if(err){
          console.log("error in query",err);
          res.status(200);
        }
        else{
          console.log("row1: ", row1)
          for (var i = 0; i < row1.length; i++) {
            row1[i].submissions=[];
            for (var j = 0; j < row.length; j++) {
              if (row1[i].email === row[j].studentemail) {
                row1[i].submissions.push(row[j]);
              }
            }
          }
          console.log(JSON.stringify(row1,null,2));
          res.status(200).send(row1);
    }
  });
}
});
});
// console.log("inside coursedeets");
//         if (err) {
//           res.status(400);
//         } else {
//           var a = [];
//           for (var i = 0; i < row.length; i++) {
//             for (var j = 0; j < row1.length; j++) {
//               if (row[i].courseid === row1[j].courseid) {
//                 console.log(row1[j]);
//                 a.push(row1[j]);
//               }
//             }
//           }
//           console.log("a: ", a);
//           res.status(200).send(a);
//         }
//       });
/**
 * var a = [];
          for (var i = 0; i < row.length; i++) {
            for (var j = 0; j < row1.length; j++) {
              if (row[i].courseid === row1[j].courseid) {
                console.log(row1[j]);
                a.push(row1[j]);
              }
            }
          }
 */

// Grades - student - title, marks, total/points :
// Select assignmenttitle, marks, total/points from assignment
// SELECT assignmentid, grade FROM submissions
// WHERE studentemail=studentemail AND courseid=courseid
// Sanith:14,13
// SELECT assignment title, points FROM assignmentdetails
// WHERE assignmentid=assignmentid

//select courseid, assignmenttitle, points from assignmentdetails
//where courseid=courseid
//2 assignments, 10, 20
//select grade where courseid=courseid and email=email

app.post("/student/displaygrade", function (req, res) {
  console.log("Inside display grade");
  console.log("bodaaayyyy: ", req.body);
  var sql1 = "SELECT assignmentid, grade FROM submissions WHERE courseid=" + mysql.escape(req.body.courseid)+ " AND studentemail=" + mysql.escape(req.body.email)+" ORDER BY submissionid DESC";
  console.log(sql1);
      
  con.query(sql1, function (err, row) {
    //console.log("rows: " + row);
    if (err) {
      res.status(400);
    } else {
      // console.log("rows: ", row);
      console.log("data sent back: ", row); 
  let assignmentid=[];
  let grade=[];
      for (let i = 0; i < row.length; i++){
        assignmentid.push(row[i].assignmentid);
        grade.push(row[i].grade);
      }
      console.log("row: ",row);
      console.log("assignmentid: ",assignmentid);
      //select assignmenttitle, points from assignmentdetails where assignmentid IN()
      var sql2="SELECT assignmentid, assignmenttitle, points from assignmentdetails WHERE assignmentid IN('"+assignmentid.join("','")+"')";
      console.log(sql2);
      con.query(sql2, assignmentid, function (err, row1) {
        if(err){
          console.log("error in query",err);
          res.status(200);
        }
        else{
          console.log("row1: ", row1)
          for (var i = 0; i < row1.length; i++) {
            row1[i].additional=[];
            for (var j = 0; j < row.length; j++) {
              if (parseInt(row1[i].assignmentid) === parseInt(row[j].assignmentid)) {
                row1[i].additional.push(row[j]);
              }
            }
          }
          console.log(JSON.stringify(row1,null,2));
          res.status(200).send(row1);
    }
  });
}
});
});

app.post("/student/dropcourse", function (req, res) {
  console.log("Inside drop course");
  console.log("bodaaayyyy: ", req.body);
  //delete from enrollment where courseid=courseid and email=email
    //update coursedetails set currentcapacity=currentcapacity+1 where courseid=courseid
  var sql1 = "DELETE FROM enrollment WHERE courseid=" + mysql.escape(req.body.courseid)+ " AND email=" + mysql.escape(req.body.email);
  console.log(sql1);
  con.query(sql1, function (err, row) {
    if (err) {
      console.log("error");
      res.status(400);
    } else {
      console.log("row: ", row);
      var sql2="UPDATE coursedetails SET currentcapacity=currentcapacity+1 WHERE courseid="+ mysql.escape(req.body.courseid);
      console.log(sql2);
      con.query(sql2, function (err, row1) {
        if(err){
          console.log("error in query",err);
          res.status(200);
        }
        else{
          console.log("row1: ", row1);
          res.status(200).send(row1);
    }
  });
}
});
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
module.exports=app;
