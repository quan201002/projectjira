import { call, put, takeLatest } from "redux-saga/effects";
import { TaskTypeService } from "../../../service/TaskTypeService";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../constant/TaskTypeConstans";
import { https } from "../../../service/api";

function* getAllTaskTypeSaga(action) {
  console.log("action saga", action);
  try {
    const { data, status } = yield call(() => {
      return TaskTypeService.getAllTaskType();
    });
    yield put({
      type: GET_ALL_TASK_TYPE,
      arrTaskType: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiGetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
