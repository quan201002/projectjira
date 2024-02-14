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

    return https.post("/api/Project/createProjectAuthorize", newProject);
  },
  getListProject: () => {
    return https.get("/api/Project/getAllProject");
  },
};
