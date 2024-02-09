import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas/rootSaga";
import ProjectCaterorySlice from "./reducer/ProjectCaterorySlice";
import LoadingReducer from "./reducer/LoadingReducer";

const rootReducer = combineReducers({
  LoadingReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
