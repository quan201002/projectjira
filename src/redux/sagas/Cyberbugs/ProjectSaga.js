import { takeLatest, call, put, delay } from "redux-saga/effects";
import { cyberbugsService } from "../../../service/CyberBugService";
import { STATUS_CODE } from "../../constant/SettingSystem";
import {
  DISPLAY_LOADING,
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  HIDE_LOADING,
} from "../../constant/CyberBugsConstant";
import { notifiFunction } from "../../../component/Notification/Notification";
import { https } from "../../../service/api";
import {
  CLOSE_DRAWER,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_DETAIL_SAGA,
  PUT_PROJECT_DETAIL,
  UPDATE_PROJECT_SAGA,
} from "../../constant/ProjectCyberBugsConstant";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constant/UserConstants";

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
      window.location = "/projectmanagement";
    }
  } catch (err) {
    console.log(err.response.data);
    if (err.response.data.statusCode === STATUS_CODE.SERVER_ERROR) {
      notifiFunction("error", "Project name has been used");
    }
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theodoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}
//get all project
function* getListProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
      yield put({
        type: HIDE_LOADING,
      });
    }
  } catch (err) {
    console.log("rr", err);
    yield put({
      type: HIDE_LOADING,
    });
  }
}

export function* theodoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

//Update Project

function* updateProjectSaga(action) {
  console.log("action", action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );
    console.log(data);
    //gọi api thành công thì dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Project edited");
    }
    yield call(getListProjectSaga);
    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theodoiUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

//xoa project
function* deleteProjectSaga(action) {
  console.log("action", action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.deleteProject(action.idProject)
    );
    console.log(data);

    //gọi api thành công thì dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data update", data);
      notifiFunction("success", "Delete project successfully!");
    } else if (status === STATUS_CODE.UNAUTHORIZED) {
      notifiFunction("error", "Unauthorized!");
    }
    yield call(getListProjectSaga);
    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    console.log(err);
    notifiFunction("error", "Delete project fail!");
    if (err.response.data.statusCode === 403) {
      notifiFunction("error", "Unauthorized!");
    }
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theodoiDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//get project detail
function* getProjectDetailSaga(action) {
  // console.log("action", action);

  try {
    const { data, status } = yield call(() =>
      https.get(`/api/Project/getProjectDetail?id=${action.projectId}`)
    );
    yield put({
      type: PUT_PROJECT_DETAIL,
      projectDetail: data.content,
    });
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
}
export function* theodoiGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

//get all project saga
function* getAllProjectSaga(action) {
  // console.log("action get all project saga", action);
  try {
    const { data, status } = yield call(() => {
      return https.get("/api/Project/getAllProject");
    });
    // console.log("data list project", data);
    yield put({
      type: GET_LIST_PROJECT,
      projectList: data.content,
    });
    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0].id,
    });
  } catch (err) {
    console.log("eror", err);
  }
}

export function* theodoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
