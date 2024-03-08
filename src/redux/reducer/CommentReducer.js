import { GET_COMMENTS } from "../constant/CommentConstant";

const initialState = {
  comments: [],
};

export const CommentReducer = (state = initialState, action) => {
  console.log("action comment reducer", action);
  switch (action.type) {
    case GET_COMMENTS:
      state.comments = action.comments;
      return { ...state };
    default:
      return state;
  }
};
