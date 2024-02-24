import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas/rootSaga";

import LoadingReducer from "./reducer/LoadingReducer";
import UserLoginCyberBugsReducer from "./reducer/UserLoginCyberBugReducer";
import ProjectCateroryReducer from "./reducer/ProjectCategoryReducer";
import ProjectCyberBugsReducer from "./reducer/ProjectCyberBugsReducer";
import { drawerReducer } from "./reducer/DrawerCyberBugsReducer";
import { ProjectReducer } from "./reducer/ProjectReducer";
import { TaskTypeReducer } from "./reducer/TaskTypeReducer";
import PriorityReducer from "./reducer/PriorityReducer";
import { StatusIdReducer } from "./reducer/StatusIdReducer";
const rootReducer = combineReducers({
  LoadingReducer,
  UserLoginCyberBugsReducer,
  ProjectCateroryReducer,
  ProjectCyberBugsReducer,
  drawerReducer,
  ProjectReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusIdReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
