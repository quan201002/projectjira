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
import * as CommentSaga from "./Cyberbugs/CommentSaga";

export function* rootSaga() {
  yield all([
    //nghiep vu theo doi cac action saga todolist dung de test xoa sau khi xong
    // ToDoListSaga.theoDoiActionGetTaskApi(),
    //nghiep vu cyber bug
    CyberBugs.theoDoiSignin(),
    CyberBugs.theoDoigetAllUsers(),
    CyberBugs.theoDoiGetUser(),
    CyberBugs.theoDoiAddUser(),
    CyberBugs.theoDoiRemoveUser(),
    CyberBugs.theoDoigetUserByProjectIdSaga(),
    CyberBugs.theoDoiEditUser(),
    CyberBugs.theoDoiDeleteUser(),
    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandelChangePostApi(),
    TaskSaga.theoDoiDeleteTaskSaga(),
    ProjectSaga.theodoiGetProjectDetailSaga(),
    ProjectSaga.theodoiCreateProjectSaga(),
    ProjectSaga.theodoiGetListProjectSaga(),
    ProjectSaga.theodoiUpdateProjectSaga(),
    ProjectSaga.theodoiDeleteProjectSaga(),
    ProjectSaga.theodoiGetAllProjectSaga(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPrioritySaga(),
    StatusSaga.theoDoigetAllStatusSaga(),
    ProjectCategory.theoDoigetAllProjectCategory(),
    CommentSaga.theoDoiGetCommetsSaga(),
    CommentSaga.theoDoiInsertCommentSaga(),
    CommentSaga.theoDoiUpdateCommentSaga(),
    CommentSaga.theoDoiDeleteCommentSaga(),
  ]);
}
//dua vao action type de quan li
//goi ham chay
//fork bất đồng bộ chạy độc lộc ko cần đợi nkhau non-blocking
