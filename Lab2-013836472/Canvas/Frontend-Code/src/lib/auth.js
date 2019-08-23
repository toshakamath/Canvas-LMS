import jwt from "jsonwebtoken";

let auth=()=>{
    if(localStorage.length!==0)
{
    let userdata = localStorage.getItem("userdata");
    let token = localStorage.getItem("token");
    let type=localStorage.getItem("type");
    let lsuserdata = JSON.parse(userdata);
    // let lstoken = JSON.parse(token);
    // let lstype = JSON.parse(type);
    //var b = JSON.parse(a);
    var lsemail = lsuserdata.email;
    console.log("this is userdata", userdata); //string obj
    console.log("this is lsuserdata", lsuserdata); //parsed obj
    console.log("this is lsemail", lsemail); //email that was stored in ls
    console.log("this is token", token); //string token
    //console.log("this is lstoken", lstoken); //parsed token
    console.log("this is type", type);
    //console.log("this is lstype", lstype);
    var decodedToken = jwt.decode(token); //decoding token from response backend
    console.log(decodedToken);
    console.log("email: ", decodedToken.email);
    if (decodedToken.email === lsemail && type==="student") {
      console.log("student home");
      return "student";     //returning whether student is logged in
    }
    else if(decodedToken.email === lsemail && type==="teacher"){
      console.log("teacher home");
      return "teacher";     //returning whether teacher is logged in
    }else {
      console.log("error");
      return "false";
    }
  }
}
export default auth;