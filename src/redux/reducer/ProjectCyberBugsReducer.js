import { GET_LIST_PROJECT } from "../constant/ProjectCyberBugsConstant";

const stateDefault = {
  projectList: [],
};

const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      return { ...state, projectList: action.projectList };
    }

    default:
      return { ...state };
  }
};
export default ProjectCyberBugsReducer;
