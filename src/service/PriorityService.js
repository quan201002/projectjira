import React from "react";
import { https } from "./api";

export const PriorityService = {
  getAllPriority: () => {
    return https.get("/api/Priority/getAll");
  },
};
