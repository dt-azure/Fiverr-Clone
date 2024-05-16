import { formatPaginationParams } from "../utils/util";
import { http, http_access } from "./config";

export const manageGigServ = {
  getGigDetails: (id) => {
    return http.get(`/cong-viec/lay-cong-viec-chi-tiet/${id}`);
  },
  getGigDataWithPagination: (pageIndex = "", pageSize = "", keyword = "") => {
    let apiParam = formatPaginationParams(pageIndex, pageSize, keyword);
    return http.get(`/cong-viec/phan-trang-tim-kiem?${apiParam}`);
  },
  deleteGig: (gigId) => {
    return http_access.delete(`/cong-viec/${gigId}`);
  },
  updateGig: (gigId, body) => {
    return http_access.put(`/cong-viec/${gigId}`, body);
  },
  addGig: (body) => {
    return http_access.post(`/cong-viec`, body);
  },
  updateGigPhoto: (gigId, body) => {
    return http_access.post(`/cong-viec/upload-hinh-cong-viec/${gigId}`, body)
  },
  getOrderDataWithPagination: (pageIndex = "", pageSize = "", keyword = "") => {
    let apiParam = formatPaginationParams(pageIndex, pageSize, keyword);

    return http.get(`/thue-cong-viec/phan-trang-tim-kiem?${apiParam}`);
  },
  deleteOrder: (orderId) => {
    return http_access.delete(`/thue-cong-viec/${orderId}`)
  },
  updateOrder: (orderId, body) => {
    return http_access.put(`thue-cong-viec/${orderId}`, body)
  },
  addOrder: (body) => {
    return http_access.post(`thue-cong-viec`, body)
  },
  getGigCategoryWithPagination: (
    pageIndex = "",
    pageSize = "",
    keyword = ""
  ) => {
    let apiParam = formatPaginationParams(pageIndex, pageSize, keyword);

    return http.get(`/loai-cong-viec/phan-trang-tim-kiem?${apiParam}`);
  },
  getGigSubcategoryWithPagination: (
    pageIndex = "",
    pageSize = "",
    keyword = ""
  ) => {
    let apiParam = formatPaginationParams(pageIndex, pageSize, keyword);

    return http.get(`/chi-tiet-loai-cong-viec/phan-trang-tim-kiem?${apiParam}`);
  },
  deleteGigCategory: (gigId) => {
    return http_access.delete(`/loai-cong-viec/${gigId}`);
  },
  updateGigCategory: (gigId, body) => {
    return http_access.put(`/loai-cong-viec/${gigId}`, body);
  },
  addGigCategory: (body) => {
    return http_access.post(`/loai-cong-viec`, body);
  },
  deleteGigSubcategory: (gigId) => {
    return http_access.delete(`/chi-tiet-loai-cong-viec/${gigId}`);
  },
  updateGigSubcategory: (gigId, body) => {
    return http_access.put(`/chi-tiet-loai-cong-viec/${gigId}`, body);
  },
  addGigSubcategory: (body) => {
    return http_access.post(`/loai-cong-viec`, body);
  },
};
