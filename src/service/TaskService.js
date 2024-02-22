import React from "react";
import { https } from "./api";

export const TaskService = {
  createTask: (taskObject) => {
    return https.post(`/api/Project/createTask`, taskObject);
  },
};
