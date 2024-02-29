import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { TaskService } from "../../../service/TaskService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constant/CyberBugsConstant";
import { STATUS_CODE } from "../../constant/SettingSystem";
import { notifiFunction } from "../../../component/Notification/Notification";
import { https } from "../../../service/api";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODEL,
  GET_TASK,
  GET_TASK_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_TASK_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../constant/TaskConstants";

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

function* getTaskSaga(action) {
  const { taskId } = action;
  console.log("action", action);
  try {
    const { data, status } = yield call(() => {
      return TaskService.getTask(taskId);
    });

    yield put({
      type: GET_TASK,
      taskModal: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}
export function* theoDoiGetTaskSaga() {
  yield takeLatest(GET_TASK_SAGA, getTaskSaga);
}

function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  console.log("action", action);
  try {
    //cập nhật api status cho task hiện tại
    const { data, status } = yield call(() => {
      return TaskService.updateStatusTask(taskUpdateStatus);
    });
    console.log("data status update", data);
    //sau khi thành công gọi lại get project detail saga để sắp xếp lại thông tin các task

    yield put({
      type: "GET_PROJECT_DETAIL_SAGA",
      projectId: taskUpdateStatus.projectId,
    });
    yield put({
      type: GET_TASK_SAGA,
      taskId: taskUpdateStatus.taskId,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}
export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
}

function* handelChangePostApi(action) {
  //gọi action thay đổi tasModal
  //save  qua api updateTasksaga

  switch (action.actionType) {
    case CHANGE_TASK_MODEL: {
      const { value, name } = action;
      yield put({
        type: CHANGE_TASK_MODEL,
        name,
        value,
      });
      break;
    }
    case CHANGE_ASSIGNESS: {
      const { userSelected } = action;
      yield put({
        type: CHANGE_ASSIGNESS,
        userSelected,
      });
      break;
    }
    case REMOVE_USER_ASSIGN: {
      const { userId } = action;
      yield put({
        type: REMOVE_USER_ASSIGN,
        userId,
      });
      break;
    }
  }
  //save qua api updateTaskSaga
  //lay du lieu tu state.taskModal
  let { taskModal } = yield select((state) => state.TaskReducer);
  console.log("task Modal sau khi thay doi", taskModal);
  const objectApi = {
    listUserAsign: [0],
    taskId: "string",
    taskName: "string",
    description: "string",
    statusId: "string",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: 0,
    typeId: 0,
    priorityId: 0,
  };
  let listUserAsign = taskModal.assigness.map((user) => {
    return user.id;
  });

  const taskModalUpdate = { ...taskModal, listUserAsign };
  console.log("object sau khi xu li", taskModal);
  try {
    const { data, status } = yield call(() => {
      return TaskService.updateTaskSaga(taskModalUpdate);
    });
    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: taskModalUpdate.projectId,
      });
      yield put({
        type: GET_TASK_SAGA,
        taskId: taskModalUpdate.taskId,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiHandelChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}
