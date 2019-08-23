var singletonDb = require("../Connection");
var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller={}

controller.createAnnouncement=function (req, res) {
    singletonDb.getInstance().then(db=>{
      db.collection('userdetails').find({
        email: req.body.email
      }).toArray((err,row)=>{
        if(err){
          res.status(400);
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
              res.status(400);
              //res.writeHead(400, { "Content-Type": "text/plain" });
              //res.end("Error while storing student details");
            } else {
              console.log("data inserted into the database");
              res.status(200).send(row1[0]);
            }
          }
          );
        }
        }
    )
  });
}
  controller.displayAnnouncement=function (req, res) {
    singletonDb.getInstance().then(db=>{
      console.log(req.body.courseid);
      db.collection('announcementdetails').find({
        courseid:req.body.courseid
      })
      .toArray()
      .then((row)=>{
          // console.log("rows: ", row);
          console.log("date sent back: ", row);
          res.status(200).send(row);
      },(err)=>{
          res.status(400);
      })
    })
  };
  module.exports=controller;