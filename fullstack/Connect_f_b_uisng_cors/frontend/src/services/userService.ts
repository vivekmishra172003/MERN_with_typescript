import axios from "axios";
const API_URL:string = 'http://localhost:5000/api/users';

export const getUsers = async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
};

export const createUser = async(user:{name:string,email:string})=>{
    const response = await axios.post(API_URL,user);
    return response.data;
}