const stateDefault = {
  projectList: [],
};

const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  console.log("action get list project", action);
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      return { ...state, projectList: action.projectList };
    }

    default:
      return { ...state };
  }
};
export default ProjectCyberBugsReducer;
