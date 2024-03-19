import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../constant/ProjectCyberBugsConstant";

const initialState = {
  open: false,
  ComponentContentDrawer: () => {},
  title: "",
  callBackSubmit: (propsValue) => {
    alert("click demo");
  },
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, open: true };
    case CLOSE_DRAWER:
      return { ...state, open: false };
    case "OPEN_FORM_EDIT_PROJECT":
      return {
        ...state,
        open: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };
    case "SET_SUBMIT_EDIT_PROJECT":
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    case "SET_SUBMIT_EDIT_USER":
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    case "OPEN_FORM_CREATE_TASK":
      state.open = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.ComponentContentDrawer;
      return { ...state };
    case "SET_SUBMIT_CREATE_TASK": {
      return { ...state, callBackSubmit: action.submitFunction };
    }
    case "OPEN_FORM_EDIT_USER":
      state.open = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.ComponentContentDrawer;
      return { ...state };
    default:
      return state;
  }
};
