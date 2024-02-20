import { call, put, takeLatest } from "redux-saga/effects";
import { TaskTypeService } from "../../../service/TaskTypeService";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../constant/TaskTypeConstans";
import { https } from "../../../service/api";
import { PriorityService } from "../../../service/PriorityService";
import {
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../../constant/PriorityConstants";

function* getAllPrioritySaga(action) {
  console.log("action saga", action);
  try {
    const { data, status } = yield call(() => {
      return PriorityService.getAllPriority();
    });
    console.log("data priority", data);
    yield put({
      type: GET_ALL_PRIORITY,
      arrPriority: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiGetAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
