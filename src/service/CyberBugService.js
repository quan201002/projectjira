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
    return https.post("/api/Project/createProjectAuthorize", newProject);
  },
  getListProject: () => {
    return https.get("/api/Project/getAllProject");
  },
  updateProject: (projectUpdate) => {
    return https.put(
      `/api/Project/updateProject?projectId=${projectUpdate.id}`,
      projectUpdate
    );
  },
  deleteProject: (id) => {
    return https.delete(
      `https://jiranew.cybersoft.edu.vn/api/Project/deleteProject?projectId=${id}`
    );
  },
  getUserfromAPI: (keyWord) => {
    return https.get(
      `https://jiranew.cybersoft.edu.vn/api/Users/getUser?keyword=${keyWord}`
    );
  },
  addUserProject: (userProject) => {
    return https.post(
      `https://jiranew.cybersoft.edu.vn/api/Project/assignUserProject`,
      userProject
    );
  },
  getProjectDetail: (projectId) => {},
  getAllProject: () => {
    return https.get(`
    /api/Project/getAllProject`);
  },
  getUserByProjectId: (idProject) => {
    return https.get(`/api/Users/getUserByProjectId?idProject=${idProject}`);
  },
  getAllUsers: () => {
    return https.get(`/api/Users/getUser`);
  },
  editUserSaga: (editUser) => {
    return https.put("/api/Users/editUser", editUser);
  },
  deleteUserSaga: (userId) => {
    return https.delete(
      `https://jiranew.cybersoft.edu.vn/api/Users/deleteUser?id=${userId}`
    );
  },
};
