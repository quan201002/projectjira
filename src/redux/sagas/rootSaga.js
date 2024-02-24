import { all, fork, take, takeLatest, call, put } from "redux-saga/effects";
// import { theoDoiActionGetTaskApi } from "./TodoListSaga";
import * as ToDoListSaga from "./TodoListSaga";
import * as CyberBugs from "./Cyberbugs/UserCyberBugsSaga";
import * as ProjectCategory from "./Cyberbugs/ProjectCategory";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as TaskTypeSaga from "./Cyberbugs/TaskTypeSaga";
import * as PrioritySaga from "./Cyberbugs/PrioritySaga";
import * as TaskSaga from "./Cyberbugs/TaskSaga";
import * as StatusSaga from "./Cyberbugs/StatusIdSaga";

export function* rootSaga() {
  yield all([
    //nghiep vu theo doi cac action saga todolist dung de test xoa sau khi xong
    // ToDoListSaga.theoDoiActionGetTaskApi(),
    //nghiep vu cyber bug
    CyberBugs.theoDoiSignin(),
    CyberBugs.theoDoiGetUser(),
    CyberBugs.theoDoiAddUser(),
    CyberBugs.theoDoiRemoveUser(),
    CyberBugs.theoDoigetUserByProjectIdSaga(),
    TaskSaga.theoDoiCreateTaskSaga(),
    ProjectSaga.theodoiGetProjectDetailSaga(),
    ProjectCategory.theoDoigetAllProjectCategory(),
    ProjectSaga.theodoiCreateProjectSaga(),
    ProjectSaga.theodoiGetListProjectSaga(),
    ProjectSaga.theodoiUpdateProjectSaga(),
    ProjectSaga.theodoiDeleteProjectSaga(),
    ProjectSaga.theodoiGetAllProjectSaga(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPrioritySaga(),
    StatusSaga.theoDoigetAllStatusSaga(),
  ]);
}
//dua vao action type de quan li
//goi ham chay
//fork bất đồng bộ chạy độc lộc ko cần đợi nkhau non-blocking
