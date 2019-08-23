const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect('mongodb://localhost:27017/canvas_db', (err, client) => {
//     if (err) {
//         console.log("Error in connecting to Mongodb: ", err);
//     }
//     else {
//         console.log("Connection successful");
//         const db = client.db('canvas_db');
//         db.collection('studentdetails').insertOne({
//             name: 'Vinit',
//             email: 'Dholakia'
//         }, (err, res) => {
//             if (err) {
//                 console.log("Error: ", err);
//             }
//             else {
//                 console.log(JSON.stringify(res.ops, undefined, 2));
//             }
//         })
//         client.close();
//     }
// })
var singletonDb = (function () {
    var db;
    function init() {
        console.log("inside db connection")
        return new Promise((resolve, reject) => {
            MongoClient.connect('mongodb://localhost:27017/canvas_db', (err, client) => {
                if (err) {
                    console.log("Error in connecting to Mongodb: ", err);
                }
                else {
                    console.log("Connection successful");
                    resolve(client.db('canvas_db'));
                }
            })
        })
    };
    return {
        getInstance: function (cb) {

            return new Promise(async (resolve, reject) => {
                if (!db) {
                    db = await init();

                } resolve(db);

            })

        }
    };
})();

module.exports=singletonDb;

// singletonDb.getInstance().then(x => {
//     x.collection('studentdetails').insertOne({
//         name: 'Tosha',
//         email: 'toshakamath@gmail.com'
//     }, (err, res) => {
//         if (err) {
//             console.log("Error: ", err);
//         }
//         else {
//             console.log(JSON.stringify(res.ops, undefined, 2));
//         }
//     })
// });
