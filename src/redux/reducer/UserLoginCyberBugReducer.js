import { USER_LOGIN } from "../constant/SettingSystem";
import {
  GET_ALL_USER,
  GET_USER_BY_PROJECT_ID,
} from "../constant/UserConstants";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
  listUsers: [],
};

const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  console.log("action get usereqweqweqweqweqwe", action.lstUserSearch);
  switch (action.type) {
    case "GET_USER_SEARCH":
      state.userSearch = action.lstUserSearch;
      // console.log("stateUser", state);
      return { ...state };
    case GET_USER_BY_PROJECT_ID:
      return { ...state, arrUser: action.arrUser };
    case GET_ALL_USER:
      return { ...state, listUsers: action.userList };
    default:
      return { ...state };
  }
};
export default UserLoginCyberBugsReducer;
