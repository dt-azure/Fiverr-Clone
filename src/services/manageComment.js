import { http, http_access } from "./config";

export const manageCommentServ = {
  getCommentsByGigId: (id) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${id}`);
  },
  getComments: () => {
    return http.get(`/binh-luan`);
  },
  deleteComment: (commentId) => {
    return http_access.delete(`/binh-luan/${commentId}`);
  },
  updateComment: (commentId, body) => {
    return http_access.put(`/binh-luan/${commentId}`, body);
  },
  postComment: (body) => {
    return http_access.post(`/binh-luan`, body);
  },
};
