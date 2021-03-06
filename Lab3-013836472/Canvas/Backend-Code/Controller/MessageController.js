var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });
var singletonDb = require("../Connection");
var controller = {}

controller.getPeopleDetails = function (req, res) {
    console.log("inside getPeopleDetails")
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({}).toArray((err, row) => {
      if (err) {
        res.status(400);
      } else {
        console.log("rows: ", row);
        for(var i=0; i<row.length; i++)
        delete row[i].password;
        console.log("data sent back: ", row);
        res.status(200).send(row);
      }
    })
  })
};
// const data = {
//     //sender: em, receiver, subject, message, date
//     sender: em,
//     receiver: this.props.message.messagedetails.receiver,
//     subject: this.props.message.messagedetails.subject,
//     message: this.props.message.messagedetails.message,
//     date: Date(Date.now())
// };

//insert into inboxdetails (sender, receiver, subject, message, date) VALUES ();

controller.sendMessage = function (req, res) {
  singletonDb.getInstance().then(db => {
      console.log("req.bod: ",req.body);
      let message=[{sender: req.body.sender, receiver: req.body.receiver, date: req.body.date, message:req.body.message}]
    db.collection('inboxdetails').insertOne({
        originalreceiver: req.body.receiver,
        originalsender:req.body.sender,
        subject: req.body.subject,
        messages: message,
        date: req.body.date
      }, (err, row)=>{
        if (err) {
          console.log("error in query storing");
          res.status(400);
          //res.writeHead(400, { "Content-Type": "text/plain" });
          //res.end("Error while storing student details");
        } else {
          console.log("data inserted into the database");
          res.status(200).send(row[0]);
        }
      }
      );
  })
}
// where receiver=em or sender=em
//{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
controller.displayMessages=function (req, res) {
    console.log("display messages: ",req.body);
    singletonDb.getInstance().then(db=>{
      db.collection('inboxdetails').find({
          $or:[
                {"messages.sender": req.body.email},
                {"messages.receiver": req.body.email}
            ]
          })
      .toArray()
      .then((row)=>{
          console.log("data sent back: ", row);
          res.status(200).send(row);
      },(err)=>{
          res.status(400);
      })
    })
  };
//reply:
//select * from inboxdetails
//if (_id==req.body._id){
    // append req.body.message to message
// }

///inbox/reply
// db.users.findOne({ _id: new ObjectId("5580c79aa11e7310b2985ab1") })
// replyMessages
//update inboxdetails set messages=messages+newmessage where _id=_id
// let message=[{sender: req.body.sender, receiver: req.body.receiver, date: req.body.date, message:req.body.message}]
//     db.collection('inboxdetails').insertOne({
//         person: req.body.receiver,
//         subject: req.body.subject,
//         messages: message
//       }

var ObjectId = require('mongodb').ObjectID
controller.replyMessages=function (req, res) {
    console.log(req.body);
    let x=req.body._id;
    console.log("req.body._id:: ",req.body);
    // const data = 
    // { email: email, 
    //     _id: _id, 
    //     date: Date(Date.now()), 
    //     newmessage: this.props.message.newmessagedetails.message, 
    //     sender: this.props.message.viewmessages.sender, 
    //     receiver: this.props.message.viewmessages.receiver };
    let newmessage={
        sender:req.body.sender,
        receiver:req.body.receiver,
        date:req.body.date,
        message:req.body.newmessage
    }
    // let newmessage=req.body.newmessage;
    // console.log("newmessage: ",newmessage);
    // singletonDb.getInstance().then(db=>{
    //   db.collection('inboxdetails').find({
    //       _id: ObjectId(req.body._id)
    //   })
    //   .toArray()
    //   .then((row)=>{
    //       console.log("kdsfn;afnmv ", row);
    //       console.log("row.message: ", row[0].messages);
    //       let newestmessage=row[0].messages;
    //       console.log("newestmessage: ", newestmessage);
    //     newestmessage.push(newmessage);
    //     console.log("newestmessage", newestmessage);
    singletonDb.getInstance().then(db=>{
        db.collection('inboxdetails').findOneAndUpdate({
            _id:ObjectId(req.body._id)
        }, {
            $push:{
                messages: newmessage
            }
        }, {returnOriginal:false})
        .then((row1)=>{
            console.log("rowwwwwwadkfmfs: ",row1);
            console.log("data sent backkkkkkaidskn: ",row1.value);
            console.log("row.value.message: ",row1.value.messages);
            res.status(200).send(row1);
        }, (err)=>{
            res.status(400);
        })
    //   },(err)=>{
    //       res.status(400);
    //   })
    })
  };

  module.exports = controller;