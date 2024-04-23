import { takeLatest, call, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../service/CyberBugService";
import { STATUS_CODE } from "../../constant/SettingSystem";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constant/CyberBugsConstant";

function* getAllProjectCaterorySaga(action) {
  // console.log(action);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectCategory()
    );
    // console.log(data);
    //gọi api thành công thì dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoigetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCaterorySaga);
}
