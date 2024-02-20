import { GET_ALL_TASK_TYPE } from "../constant/TaskTypeConstans";

const initialState = {
  arrTaskType: [],
};

export const TaskTypeReducer = (state = initialState, action) => {
  console.log("action reducer", action);
  switch (action.type) {
    case GET_ALL_TASK_TYPE:
      return { ...state, arrTaskType: action.arrTaskType };
    default:
      return state;
  }
};
