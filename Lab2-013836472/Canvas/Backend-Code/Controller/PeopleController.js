var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");
//limit:2|1 always
//on page 1> skip: 0, limit: 3|1  ... 
//on page 2>  skip: 2|1, limit: 3 ...
//on page 3>  skip: 2+2=4|2, limit: 3  ... 
//on page 4>  skip: 2+2+2|6, limit:3
//find the count of people > count: 6 ...
//on page n> skip: (limit*pageno)
// let limit=2;

// f(pageno=1){
//   skip=0;
// }
// else{
//   skip=(pageno-1)*limit;
// }
controller.displayPeople = function (req, res) {
  console.log("req.query: ", req.query);
  let limit=parseInt(req.query.limit)||2;
  let skip=0;
  if(req.query.pageno=="1"){
    skip=0;
  }
  else{
    skip=(req.query.pageno-1)*limit;
  }
  singletonDb.getInstance().then(db=>{
    db.collection('enrollment').find({
      courseid: req.query.courseid,
      enrollmentstatus: "enrolled"
    })
    .toArray()
    .then((row)=>{
      let a = [];
      for (let i = 0; i < row.length; i++) {
        a.push(row[i].email);
      }
      console.log(a);
      let count=row.length;
      console.log(count);
      db.collection('userdetails').find({
        email:{
          $in:a
        }
      })
      .skip(skip)
      .limit(limit)
      .toArray()
      .then((row1)=>{
        if (row1.length) {
          for (let i = 0; i < row1.length; i++) {
            delete row1[i].password;
          }
          let obj={
            users:row1,
            count:count
          }
          console.log("new z: ",obj);
          console.log("data sent back: ", obj);
          res.status(200).send(obj);
        }
        else {
          console.log("no data rows");
          res.status(400);
        }
      },(err)=>{
        res.status(400);
      })
    }, (err)=>{
      res.status(400);
    })
  })
}

module.exports = controller;