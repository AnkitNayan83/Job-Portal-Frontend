import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/v1"; //devlopment
const BASE_URL =
  "https://job-portal-backend-dmxdw3skr-ankitnayan83.vercel.app/api/v1"; //production

axios.defaults.withCredentials = true;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
