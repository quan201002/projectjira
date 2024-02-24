import { call, put, takeLatest } from "redux-saga/effects";

import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../constant/TaskTypeConstans";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../constant/StatusConstants";
import { StatusService } from "../../../service/StatusService";

function* getAllStatusSaga(action) {
  console.log("action saga", action);
  try {
    const { data, status } = yield call(() => {
      return StatusService.getAllStatus();
    });
    yield put({
      type: GET_ALL_STATUS,
      arrStatus: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoigetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
