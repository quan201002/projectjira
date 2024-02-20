const stateDefault = {
  projectList: [],
  projectArr: [],
};

const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      return { ...state };
    }
    case "GET_All_PROJECT": {
      state.projectArr = action.arrProject;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default ProjectCyberBugsReducer;
