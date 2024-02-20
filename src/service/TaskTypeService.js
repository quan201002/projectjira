import React from "react";
import { https } from "./api";

export const TaskTypeService = {
  getAllTaskType: () => {
    return https.get(`/api/TaskType/getAll`);
  },
};
