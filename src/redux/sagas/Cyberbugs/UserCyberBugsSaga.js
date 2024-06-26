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
  ADD_USER_PROJECT_API,
  DELETE_USER_SAGA,
  EDIT_PROFILE_SAGA,
  EDIT_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  GET_USER_SEARCH,
  REMOVE_USER_PROJECT_API,
  UPDATE_USER_LOGIN,
} from "../../constant/UserConstants";
import { notifiFunction } from "../../../component/Notification/Notification";
import {
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_DETAIL_SAGA,
} from "../../constant/ProjectCyberBugsConstant";

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
    if (status === STATUS_CODE.SUCCESS) {
      window.location = "./";
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (err) {
    console.log(err.response.data);
    notifiFunction("error", "Login fail, check your email or password");
    yield put({
      type: HIDE_LOADING,
    });
  }
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGIN_API, siginSaga);
}

//get user

function* getUserSaga(action) {
  try {
    const res = yield call(() => {
      return https.get(`/api/Users/getUser?keyword=${action.keyWord}`);
    });
    yield put({
      type: GET_USER_SEARCH,
      lstUserSearch: res.data.content,
    });
    if (res.status === STATUS_CODE.SUCCESS) {
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_API, getUserSaga);
}

//add user saga
function* addUserProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    const { status } = yield call(() => {
      return cyberbugsService.addUserProject(action.userProject);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT_SAGA,
      });
      yield put({
        type: GET_USER_API,
        keyWord: "",
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.userProject.projectId,
      });
      yield put({
        type: GET_USER_BY_PROJECT_ID_SAGA,
        idProject: action.userProject.projectId,
      });
      notifiFunction("success", "User added");
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: HIDE_LOADING,
    });
    notifiFunction("error", "Unauthorized");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiAddUser() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

//remove user
function* removeUserSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const { data, status } = yield call(() => {
      return https.post(
        "/api/Project/removeUserFromProject",
        action.userProject
      );
    });
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "User removed");
      yield put({
        type: GET_LIST_PROJECT_SAGA,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.userProject.projectId,
      });
      yield put({
        type: GET_USER_BY_PROJECT_ID_SAGA,
        idProject: action.userProject.projectId,
      });
      yield put({
        type: GET_USER_API,
        keyWord: "",
      });
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (err) {
    console.log(err);
    notifiFunction("error", "Unauthorized");
    yield put({
      type: HIDE_LOADING,
    });
  }
}

export function* theoDoiRemoveUser() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserSaga);
}

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  // console.log("id project", idProject);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getUserByProjectId(idProject)
    );
    // console.log("data", data);
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
        type: GET_USER_API,
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

function* editProfileSaga(action) {
  console.log("action update profile saga", action);
  let user = action.editUser;
  user.avatar = `https://ui-avatars.com/api/?name=${user.name}`;
  user.accessToken =
    "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJoaWV1bWluaDExMjJAZ21haWwuY29tIiwibmJmIjoxNzE1MTUzNTM4LCJleHAiOjE3MTUxNTcxMzh9.RzArTvgmhZLSFs4pTetCzHnCyH3ipTeZL9OrfFiUcrE";
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.editUserSaga(action.editUser)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Profile updated");
      console.log("data edit", data);
      yield put({
        type: GET_USER_API,
        keyWord: "",
      });
      yield put({
        type: UPDATE_USER_LOGIN,
        user: user,
      });
    }

    localStorage.setItem(USER_LOGIN, JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiEditProfile() {
  yield takeLatest(EDIT_PROFILE_SAGA, editProfileSaga);
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
        type: GET_USER_API,
        keyWord: "",
      });
    }
  } catch (err) {
    console.log(err);
    notifiFunction("error", "Unauthorized");
  }
}
export function* theoDoiDeleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
