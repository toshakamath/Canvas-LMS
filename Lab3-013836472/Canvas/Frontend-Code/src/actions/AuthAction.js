import axios from "axios";
import {ROOT_URL} from '../lib/constants';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR";
export const SET_LOGIN_VALUES = "SET_LOGIN_VALUES";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const SET_REGISTER_VALUES = "SET_REGISTER_VALUES";

// const ROOT_URL = "http://18.191.157.136:3001";

export async function loginRequest(data, cb) {
        const response = await axios.post(`${ROOT_URL}/user_login`, data).catch(e=>{})
        if(!!response){
            cb(null, response);
            //console.log("lkensinwklsdmklds: ",response);
            return {
                type: LOGIN_REQUEST,
                payload: {}
            };
        }else{
            cb("ERROR",null);
            return {
                type: LOGIN_REQUEST_ERROR,
                payload: "Invalid Credentials"
            };
        }
}
export function setLoginValues(data) {
    return {
        type: SET_LOGIN_VALUES,
        payload: data
    }
}
// export async function registerRequest(data, cb) {
//     const response = await axios.post(`${ROOT_URL}/student_signup`, data);
//     cb(null, response);
//     return {
//         type: REGISTER_REQUEST,
//         payload: {}
//     };
// }

export async function registerRequest(data, history) {
        const response = await axios.post(`${ROOT_URL}/user_signup`, data);
        if (response.status === 200)
            history.push("/login");
        else if (response.status === 400)
            history.push("/login");
        return {
            type: REGISTER_REQUEST,
            payload: {}
        };
}

export function setRegisterValues(data) {
    return {
        type: SET_REGISTER_VALUES,
        payload: data
    }
}


