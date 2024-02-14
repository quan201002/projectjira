const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "abc",
      description: "<p style='color:red '>abc</p>",
    },
  ],
};

const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
export default ProjectCyberBugsReducer;
