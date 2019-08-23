/*
server token gen: user details, secret key, expiry date in sec > json web token
login req>login res has your user obj and token
everytime you login, save your token and user obj in local storage (local storage.settoken check)
then done!
now in every get or post check whether the token is stored in the local storage in front end and also check the backend
*/
/**
 *create token using login email
 send token to front end
 save in local storage

 validate token on frontend without using secret key in every axios.get

 decoded tken's email == local storage email > then load page else logouts

 */
var jwt = require("jsonwebtoken");

module.exports.generateToken = (email) => {
  var token = jwt.sign(
    {
      email: email
    },
    "shhhhh"
  ); //{foo:"bar"}   is actually going to be the object we get from our db
  return token; //make token in the backend and send (token+user obj) to the front end
};
// var decodeToken = (token) => {
//   //var decoded = jwt.decode(token); //frontend
//   var decoded = jwt.verify(token, "shhhhh"); //if you change the secret key then it will give an error
// };
//if the token that we've given is decoding to the same user obj

//console.log(decoded.foo); // bar
// sign verify decode 3 functions and put in exports
// frontend > verify
// backend > decode
