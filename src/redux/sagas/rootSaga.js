import { all, fork, take, takeLatest, call, put } from "redux-saga/effects";
// import { theoDoiActionGetTaskApi } from "./TodoListSaga";
import * as ToDoListSaga from "./TodoListSaga";
import * as CyberBugs from "./Cyberbugs/UserCyberBugsSaga";
export function* rootSaga() {
  yield all([
    //nghiep vu theo doi cac action saga todolist dung de test xoa sau khi xong
    // ToDoListSaga.theoDoiActionGetTaskApi(),
    //nghiep vu cyber bug
    CyberBugs.theoDoiSignin(),
  ]);
}
//dua vao action type de quan li
//goi ham chay
//fork bất đồng bộ chạy độc lộc ko cần đợi nkhau non-blocking
