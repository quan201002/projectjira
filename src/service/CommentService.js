import axios, { Axios } from "axios";
import { https } from "./api";

export const commentService = {
  getComments: (taskId) => {
    return https.get(`/api/Comment/getAll?taskId=${taskId}`);
  },
  insertComment: (insertDetail) => {
    return https.post(`/api/Comment/insertComment`, insertDetail);
  },
  updateComment: (updateDetail) => {
    return https.put(
      `/api/Comment/updateComment?id=${updateDetail.id}&contentComment=${updateDetail.contentComment}`
    );
  },
  deleteComment: (deleteDetail) => {
    return https.delete(
      `/api/Comment/deleteComment?idComment=${deleteDetail.id}`
    );
  },
};
