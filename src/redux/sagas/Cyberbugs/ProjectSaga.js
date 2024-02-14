import { takeLatest, call, put, delay } from "redux-saga/effects";
import { cyberbugsService } from "../../../service/CyberBugService";
import { STATUS_CODE } from "../../constant/SettingSystem";
import {
  DISPLAY_LOADING,
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  HIDE_LOADING,
} from "../../constant/CyberBugsConstant";

function* createProjectSaga(action) {
  console.log("action", action);
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );
    console.log(data);
    //gọi api thành công thì dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      window.location.replace("/projectmanagement");
    }
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

//get all project
function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log("rr", err);
  }
}

export function* theodoiGetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}

export function* theodoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}
