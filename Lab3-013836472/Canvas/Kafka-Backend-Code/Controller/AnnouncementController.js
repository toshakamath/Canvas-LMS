var singletonDb = require("../Connection");
var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller={}

controller.createAnnouncement=function (req, cb) {
    singletonDb.getInstance().then(db=>{
      db.collection('userdetails').find({
        email: req.body.email
      }).toArray((err,row)=>{
        if(err){
          cb(true,null)
        }
        else{
          db.collection('announcementdetails').insertOne({
            email: req.body.em,
            title: req.body.announcementtitle,
            description: req.body.announcementdesc,
            courseid: req.body.courseid
          }, (err, row1)=>{
            if (err) {
              console.log("error in query storing");
              cb(true,null)
            } else {
              console.log("data inserted into the database");
              cb(null,row1[0]);
            }
          }
          );
        }
        }
    )
  });
}
  controller.displayAnnouncement=function (req, cb) {
    singletonDb.getInstance().then(db=>{
      console.log(req.body.courseid);
      db.collection('announcementdetails').find({
        courseid:req.body.courseid
      })
      .toArray()
      .then((row)=>{
          // console.log("rows: ", row);
          console.log("date sent back: ", row);
          cb(null,row);
      },(err)=>{
          cb(true,null)
      })
    })
  };
  module.exports=controller;