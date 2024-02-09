import { USER_SIGIN_API } from "../constant/CyberBugsConstant";

export const signinCyberbugAction = (email, passWord) => {
  return {
    type: USER_SIGIN_API,
    userLogin: {
      email: email,
      password: passWord,
    },
  };
};
