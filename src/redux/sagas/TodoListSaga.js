import { all, fork, take, takeLatest, call, put } from "redux-saga/effects";
import * as Cyberbugs from "./Cyberbugs/UserCyberBugsSaga";
import { Axios } from "axios";
import { GET_TASK_API } from "../constant/CyberBugsConstant";
import { https } from "../../service/api";
import { GET_TASK_SAGA } from "../constant/TaskConstants";

function* getTaskApi(action) {
  console.log("actionSaga", action);
  let data = {};
  yield call(() => {
    https.get("/api/Comment/getAll").then((res) => {
      data = res.data.content;
    });
  });
  console.log(data);
  //sau khi lay gia tri thanh cong put nhu dispatch
  yield put({
    type: GET_TASK_API,
    taskList: data,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASK_SAGA, getTaskApi);
}
// file nay quan li nghiep vu cua action todolist
