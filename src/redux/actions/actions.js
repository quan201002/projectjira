import { USER_SIGIN_API } from "../constant/CyberBugsConstant";

export const signinCyberbugAction = (email, passWord, history) => {
  return {
    type: USER_SIGIN_API,
    userLogin: {
      email: email,
      password: passWord,
      history: history,
    },
  };
};
