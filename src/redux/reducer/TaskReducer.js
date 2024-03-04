import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODEL,
  GET_TASK,
  REMOVE_USER_ASSIGN,
} from "../constant/TaskConstants";

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
    statusId: "2",
    originalEstimate: 10,
    timeTrackingSpent: 5,
    timeTrackingRemaining: 5,
    typeId: 0,
    priorityId: 0,
    projectId: 14827,
  },
};

export const TaskReducer = (state = initialState, action) => {
  console.log("action reducer", action);
  switch (action.type) {
    case GET_TASK:
      return { ...state, taskModal: action.taskModal };
      break;
    case CHANGE_TASK_MODEL:
      const { name, value } = action;
      return { ...state, taskModal: { ...state.taskModal, [name]: value } };
      break;
    case CHANGE_ASSIGNESS:
      state.taskModal.assigness = [
        ...state.taskModal.assigness,
        action.userSelected,
      ];
      console.log("state", state);
      return { ...state };
      break;
    case REMOVE_USER_ASSIGN:
      state.taskModal.assigness = [
        ...state.taskModal.assigness.filter((us) => us.id !== action.userId),
      ];
      break;
    case "CHANGE_TASK_BY_ON_CLICK_TASK":
      state.taskModal = action.task;
      return { ...state };
      break;
    default:
      return state;
  }
};
