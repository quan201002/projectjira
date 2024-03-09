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
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../constant/SettingSystem";
import { message } from "antd";
import { https } from "../../../service/api";
import {
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../constant/UserConstants";
import { notifiFunction } from "../../../component/Notification/Notification";

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

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  console.log("id project", idProject);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getUserByProjectId(idProject)
    );
    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (err) {
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}
export function* theoDoigetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

function* getAllUsersSaga(action) {
  console.log("action get user saga", action);
  try {
    const { data, status } = yield call(() => cyberbugsService.getAllUsers());
    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER,
        userList: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}
export function* theoDoigetAllUsers() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUsersSaga);
}

function* editUsersSaga(action) {
  console.log("action edit user saga", action);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.editUserSaga(action.editUser)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "user edited");
      console.log("data edit", data);
      yield put({
        type: "GET_USER_API",
        keyWord: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiEditUser() {
  yield takeLatest(EDIT_USER_SAGA, editUsersSaga);
}

function* deleteUserSaga(action) {
  console.log("action delete user saga", action);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.deleteUserSaga(action.userId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "user deleted");
      console.log("data delete", data);
      yield put({
        type: "GET_USER_API",
        keyWord: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiDeleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
