import { USER_LOGIN } from "../constant/SettingSystem";
import { GET_USER_BY_PROJECT_ID } from "../constant/UserConstants";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
};

const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_USER_SEARCH":
      state.userSearch = action.lstUserSearch;
      // console.log("stateUser", state);
      return { ...state };
    case GET_USER_BY_PROJECT_ID:
      return { ...state, arrUser: action.arrUser };
    default:
      return { ...state };
  }
};
export default UserLoginCyberBugsReducer;
