import { https } from "./api";

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return https.post("/api/Users/signin", userLogin);
  },
};
