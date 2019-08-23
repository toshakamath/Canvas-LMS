var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");

controller.searchCourse = function (req, cb) {
  console.log("Inside post search");
  console.log("Req Body : ", req.body);
  console.log("string: ", req.body.search);
  var str = req.body.search.search;
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
    cb(null,[]);
    return;
  }
  singletonDb.getInstance().then(db => {
    if (key === "courseid" || key === "courseterm" || key === "coursename") {
      console.log("going inside")
      let query = {}
      query[key] = { $regex: ".*" + value + ".*" }
      console.log(query)
      db.collection('coursedetails').find(query)
        // db.collection('coursedetails').find({
        //   [key]:{$regex: ".*"+value+".*"}
        // })
        .toArray()
        .then((row) => {
          cb(null, row);
        }, (err) => {
          cb(true,null);
        })
    }
    else {
      console.log("general search");
      db.collection('coursedetails').find({
        $or: [
          { courseid: { $regex: ".*" + str + ".*" } },
          { coursename: { $regex: ".*" + str + ".*" } },
          { coursedept: { $regex: ".*" + str + ".*" } },
          { courseroom: { $regex: ".*" + str + ".*" } },
          { coursecapacity: { $regex: ".*" + str + ".*" } },
          { waitlistcapacity: { $regex: ".*" + str + ".*" } },
          { courseterm: { $regex: ".*" + str + ".*" } }
        ]
      })
        .toArray()
        .then((row) => {
          console.log("rowwwwww", row)
          cb(null, row);
        }, (err) => {
          console.log("errorrrr", err)
          cb(true,null);
        })
    }
  })
};

controller.enrollCourse = function (req, cb) {
  let output = {
    status: null,
    waitlistno: null
  }
  singletonDb.getInstance().then(db => {
    db.collection('enrollment').find({
      email: req.body.s_em,
      courseid: req.body.cid
    })
      .toArray()
      .then((row1) => {
        if((row1||[]).length){
          cb(true,null);
        }else{
          console.log("Inside student enrollment ", row1)
        db.collection('coursedetails').find({
          email: req.body.t_em,
          courseid: req.body.cid
        })
          .toArray()
          .then((row2) => {
            {
              console.log("Inside query to check and reduce course capacity and waitlist capacity ",row2);
              if (row2[0].currentcapacity > 0) {
                console.log("If there are seats in the classroom");
                var curcoursecap = row2[0].currentcapacity - 1;
                db.collection('coursedetails').findOneAndUpdate({
                  email: req.body.t_em,
                  courseid: req.body.courseid
                }, {
                    $set: {
                      currentcapacity: curcoursecap
                    }
                  }, {
                    returnOriginal: false
                  })
                  .then((row3) => {
                    console.log("enroll student: update capacity");
                    db.collection('enrollment').insertOne({
                      courseid: req.body.cid,
                      email: req.body.s_em,
                      enrollmentstatus: "enrolled"
                    })
                      .then((row4) => {
                        console.log("enroll student: update enroll status");
                        output.status = "enrolled";
                        cb(null, output)
                      }, (err) => {
                        cb(true,null);
                      })
                  }, (err) => {
                    cb(true,null);
                  })
              }
              else if (row2[0].currentcapacity === 0 && row2[0].currentwaitlistcapacity > 0) {
                console.log("If there are no seats in the classroom add to waitlist");
                var curwaitlistcap = row2[0].currentwaitlistcapacity - 1;
                db.collection('coursedetails').findOneAndUpdate({
                  email: req.body.t_em,
                  courseid: req.body.courseid
                }, {
                    $set: {
                      currentwaitlistcapacity: curwaitlistcap
                    }
                  }, {
                    returnOriginal: false
                  })
                  .then((row3) => {
                    console.log("waitlist student: update waitlist capacity ", row3);
                    var waitlistno = row2[0].waitlistcapacity - row2[0].currentwaitlistcapacity + 1;
                    db.collection('enrollment').insertOne({
                      courseid: req.body.cid,
                      email: req.body.s_em,
                      enrollmentstatus: "waitlist",
                      waitlistno: waitlistno
                    })
                      .then((row4) => {
                        console.log("waitlist student: update waitlist status ", row4);
                        output.status = "waitlisted";
                        output.waitlistno = waitlistno;
                        cb(null, output)
                      }, (err) => {
                        cb(true,null);
                      })
                  }, (err) => {
                    cb(true,null);
                  })
              }
              else if (row2[0].currentcapacity === 0 && row2[0].currentwaitlistcapacity === 0) {
                console.log("Class is full cannot enroll");
                cb(true,null);
              }
              else {
                console.log("Error che!");
                cb(true,null);
              }
            }
          }, (err) => {
            cb(true,null);
          })
        }
      })
  })
}


module.exports = controller;