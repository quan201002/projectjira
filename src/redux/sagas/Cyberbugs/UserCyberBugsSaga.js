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
