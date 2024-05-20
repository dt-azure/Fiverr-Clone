import { formatPaginationParams } from "../utils/util";
import { http, http_access } from "./config";

export const manageUserServ = {
  getUserDataById: (userId) => {
    return http.get(`/users/${userId}`);
  },
  signIn: (data) => {
    return http.post(`/auth/signin`, data);
  },
  signUp: (data) => {
    return http.post(`/auth/signup`, data);
  },
  getUserDataWithPagination: (pageIndex = "", pageSize = "", keyword = "") => {
    let apiParam = formatPaginationParams(pageIndex, pageSize, keyword);
    return http.get(`/users/phan-trang-tim-kiem?${apiParam}`);
  },
  deleteUser: (userId) => {
    return http.delete(`/users?id=${userId}`);
  },
  addUser: (body) => {
    return http.post(`/users`, body);
  },
  updateUserInfo: (userId, body) => {
    return http.put(`/users/${userId}`, body);
  },
  updateAvatar: (body) => {
    return http_access.post(`/users/upload-avatar`, body);
  },
};
