var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

let a = "";
let password = "password123";
bcrypt.hash(password, saltRounds, function(err, hash) {
  console.log("My encrypted password is", hash);
  a = hash;
});

bcrypt.compare(a, hash, function(err, res) {
  if (res) {
    console.log("Passwords match");
  } else {
    console.log("Passwords match");
  }
});
