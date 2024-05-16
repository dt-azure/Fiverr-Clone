import { getLocalStorage } from "../utils/util";
import axios from "axios";

const user = getLocalStorage("user");
const token = user ? user.data.content.token : null;

export const http = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDEiLCJIZXRIYW5TdHJpbmciOiIxNy8xMC8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MjkxMjMyMDAwMDAiLCJuYmYiOjE3MTE2NDUyMDAsImV4cCI6MTcyOTI3MDgwMH0.eZHFmA2-LPiTU4hhprKRbSSPHBM77j9yic31O97Z0rc",
  },
  timeout: 50000,
});

export const http_access = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDEiLCJIZXRIYW5TdHJpbmciOiIxNy8xMC8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MjkxMjMyMDAwMDAiLCJuYmYiOjE3MTE2NDUyMDAsImV4cCI6MTcyOTI3MDgwMH0.eZHFmA2-LPiTU4hhprKRbSSPHBM77j9yic31O97Z0rc",
    token: token ? token : "",
  },
  timeout: 50000,
});
