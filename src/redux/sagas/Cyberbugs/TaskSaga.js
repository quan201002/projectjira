import { call, delay, put } from "redux-saga/effects";
import { TaskService } from "../../../service/TaskService";
import { DISPLAY_LOADING } from "../../constant/CyberBugsConstant";
import { STATUS_CODE } from "../../constant/SettingSystem";
import { notifiFunction } from "../../../component/Notification/Notification";

function* createTaskSaga(action) {
  console.log("action create task", action);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => {
      return TaskService.createTask();
    });
    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "crete task successfully");
    }
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiCreateTaskSaga() {
  yield ("CREATE_TASK_SAGA", createTaskSaga);
}
