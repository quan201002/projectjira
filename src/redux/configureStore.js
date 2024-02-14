import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas/rootSaga";

import LoadingReducer from "./reducer/LoadingReducer";
import UserLoginCyberBugsReducer from "./reducer/UserLoginCyberBugReducer";
import ProjectCateroryReducer from "./reducer/ProjectCategoryReducer";
import ProjectCyberBugsReducer from "./reducer/ProjectCyberBugsReducer";
const rootReducer = combineReducers({
  LoadingReducer,
  UserLoginCyberBugsReducer,
  ProjectCateroryReducer,
  ProjectCyberBugsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
