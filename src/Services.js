import axios from "axios";
import { baseURL } from "../Env_Config";

const service = axios.create({
  baseURL: baseURL.API_ENDPOINT_URL,
  timeout: 60000,
});

export default service;
