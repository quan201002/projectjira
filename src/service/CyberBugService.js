import axios, { Axios } from "axios";
import { https } from "./api";
import { TOKEN } from "../redux/constant/SettingSystem";

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return https.post("/api/Users/signin", userLogin);
  },
  getAllProjectCategory: () => {
    return https.get("/api/ProjectCategory");
  },
  createProject: (newProject) => {
    return https.post("/api/Project/createProject", newProject);
  },
  createProjectAuthorization: (newProject) => {
    console.log();
    let http = axios.create({
      baseURL: "https://jiranew.cybersoft.edu.vn",
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1OCIsIkhldEhhblN0cmluZyI6IjExLzA2LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxODA2NDAwMDAwMCIsIm5iZiI6MTY5MDM5MDgwMCwiZXhwIjoxNzE4MjExNjAwfQ.631rl3EwTQfz6CuufNTJlys36XLVmoxo29kP-F_PDKU",
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
    return http.post("/api/Project/createProjectAuthorize", newProject);
  },
};
