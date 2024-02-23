import { GET_ALL_STATUS } from "../constant/StatusConstants";

const initialState = {
  statusId: "",
};

export const StatusIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATUS:
      return { ...state, arrStatus: action.arrStatus };

    default:
      return state;
  }
};
