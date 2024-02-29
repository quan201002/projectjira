import React from "react";
import { https } from "./api";

export const TaskService = {
  createTask: (taskObject) => {
    return https.post(`/api/Project/createTask`, taskObject);
  },
  getTask: (taskId) => {
    return https.get(`/api/Project/getTaskDetail?taskId=${taskId}`);
  },
  updateStatusTask: (taskStatusUpdate) => {
    return https.put(`/api/Project/updateStatus`, taskStatusUpdate);
  },
  updateTaskSaga: (taskUpdate) => {
    return https.post(`/api/Project/updateTask`, taskUpdate);
  },
};
