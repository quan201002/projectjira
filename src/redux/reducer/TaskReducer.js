const initialState = {
  taskModal: {
    priorityTask: {
      priorityId: 3,
      priority: "Low",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 6186,
        avatar: "https://ui-avatars.com/api/?name=minh",
        name: "minh",
        alias: "minh",
      },
    ],
    lstComment: [],
    taskId: 11607,
    taskName: "destroy",
    alias: "destroy",
    description: "<p>d&aacute;dasz</p>",
    statusId: "1",
    originalEstimate: 10,
    timeTrackingSpent: 10,
    timeTrackingRemaining: 10,
    typeId: 0,
    priorityId: 0,
    projectId: 14827,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return { ...state };

    default:
      return state;
  }
};
