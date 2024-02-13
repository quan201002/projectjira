import { GET_ALL_PROJECT_CATEGORY } from "../constant/CyberBugsConstant";

const stateDefault = {
  arrProjectCaterory: [],
};

const ProjectCateroryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY: {
      state.arrProjectCaterory = action.data;
    }
    default:
      return { ...state };
  }
};
export default ProjectCateroryReducer;
