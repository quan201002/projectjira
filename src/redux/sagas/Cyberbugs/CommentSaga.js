import { call, put, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../service/CommentService";
import { STATUS_CODE } from "../../constant/SettingSystem";
import {
  DELETE_COMMENT_SAGA,
  GET_COMMENTS,
  GET_COMMENTS_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../constant/CommentConstant";
import { GET_TASK_SAGA } from "../../constant/TaskConstants";
function* getComments(action) {
  try {
    const { data, status } = yield call(() => {
      return commentService.getComments(action.taskId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      // console.log("data get comments", data);
      yield put({
        type: GET_COMMENTS,
        comments: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiGetCommetsSaga() {
  yield takeLatest(GET_COMMENTS_SAGA, getComments);
}

function* insertComments(action) {
  // console.log("action insert", action);
  try {
    const { data, status } = yield call(() => {
      return commentService.insertComment(action.insertDetail);
    });
    if (status === STATUS_CODE.SUCCESS) {
      // console.log("data comment", data);
      yield put({
        type: GET_TASK_SAGA,
        taskId: action.insertDetail.taskId,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertComments);
}

function* updateCommentSaga(action) {
  // console.log("action update", action);
  try {
    const { data, status } = yield call(() => {
      return commentService.updateComment(action.updateDetail);
    });
    if (status === STATUS_CODE.SUCCESS) {
      // console.log("data update", data);
      yield put({
        type: GET_TASK_SAGA,
        taskId: action.updateDetail.taskId,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

function* deleteCommentSaga(action) {
  // console.log("action delete", action);
  try {
    const { data, status } = yield call(() => {
      return commentService.deleteComment(action.deleteDetail);
    });
    if (status === STATUS_CODE.SUCCESS) {
      // console.log("data delete", data);
      yield put({
        type: GET_TASK_SAGA,
        taskId: action.deleteDetail.taskId,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
