import React from "react";
import { https } from "./api";

export const StatusService = {
  getAllStatus: () => {
    return https.get("/api/Status/getAll");
  },
};
