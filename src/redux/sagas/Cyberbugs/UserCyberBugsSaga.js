import React from "react";
import {
  call,
  delay,
  fork,
  take,
  takeLatest,
  put,
  takeEvery,
  all,
} from "redux-saga/effects";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  USER_SIGIN_API,
} from "../../constant/CyberBugsConstant";
import { cyberbugsService } from "../../../service/CyberBugService";
import { TOKEN, USER_LOGIN } from "../../constant/SettingSystem";
import { message } from "antd";
import { https } from "../../../service/api";

function* siginSaga(action) {
  yield delay(500);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  try {
    const { data, status } = yield cyberbugsService.signinCyberBugs(
      action.userLogin
    );
    message.success("Login success");
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log(data);
    yield put({
      type: HIDE_LOADING,
    });
  } catch (err) {
    console.log(err.response.data);

    yield put({
      type: HIDE_LOADING,
    });
  }
  window.location.replace("/");
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGIN_API, siginSaga);
}

//get user

function* getUserSaga(action) {
  //action.keyword

  //api
  try {
    const res = yield call(() => {
      return https.get(`/api/Users/getUser?keyword=${action.keyWord}`);
      // cyberbugsService.getUserfromAPI(action.keyWord);
    });
    console.log("data", res);
    yield put({
      type: "GET_USER_SEARCH",
      lstUserSearch: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}

//add user saga
function* addUserProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    yield call(() => {
      cyberbugsService.addUserProject(action.userProject);
    });
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: HIDE_LOADING,
    });
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiAddUser() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

//remove user
function* removeUserSaga(action) {
  console.log("action", action);

  try {
    yield call(() => {
      return https.post(
        "/api/Project/removeUserFromProject",
        action.userProject
      );
    });
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiRemoveUser() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserSaga);
}
