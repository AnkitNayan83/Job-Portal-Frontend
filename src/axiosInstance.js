import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1"; //devlopment
// const BASE_URL = "https://forum-app-server.vercel.app/api"; //production

axios.defaults.withCredentials = true;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
