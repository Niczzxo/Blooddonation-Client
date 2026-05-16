// useAxios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blood-donation-server-lilac.vercel.app",
});

const useAxios = () => axiosInstance;

export default useAxios;
