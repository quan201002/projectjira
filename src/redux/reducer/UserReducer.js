import { EDIT_USER } from "../constant/UserConstants";

const initialState = {
  userModal: {},
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER: {
      state.userModal = action.userEditModel;
      return { ...state };
    }
    default:
      return state;
  }
};
