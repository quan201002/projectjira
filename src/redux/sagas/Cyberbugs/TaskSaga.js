import { call, delay, put, takeLatest } from "redux-saga/effects";
import { TaskService } from "../../../service/TaskService";
import { DISPLAY_LOADING } from "../../constant/CyberBugsConstant";
import { STATUS_CODE } from "../../constant/SettingSystem";
import { notifiFunction } from "../../../component/Notification/Notification";
import { https } from "../../../service/api";

function* createTaskSaga(action) {
  try {
    const { data, status } = yield call(() => {
      return https.post("/api/Project/createTask", action.taskObject);
    });
    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "crete task successfully");
    }
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (err) {
    console.log(err.response.data);
  }
}
export function* theoDoiCreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}
