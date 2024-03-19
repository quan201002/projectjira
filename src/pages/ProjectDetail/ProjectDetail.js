import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  GET_TASK_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../redux/constant/TaskConstants";
import { renderTaskTypeIcon } from "../../service/RenderTaskTypeIcon";
import { BugOutlined } from "@ant-design/icons";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/constant/ProjectCyberBugsConstant";

function ProjectDetail(props) {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId,
    });
  }, []);

  let { projectDetail } = useSelector((state) => state.ProjectReducer);
  console.log("project detail", projectDetail);
  const { projectId } = useParams();
  console.log("project detaill", projectDetail);
  const renderAvatar = () => {
    return projectDetail?.members?.map((user, index) => {
      return (
        <div className="d-flex">
          <div className="avatar" key={index}>
            <img src={user.avatar} alt={user.avatar}></img>
          </div>
        </div>
      );
    });
  };
  {
    /* <i className="fa fa-arrow-up "></i>
                                        <i class="fa-solid fa-arrow-down"></i>
                                        <i class="fa-solid fa-arrow-right"></i>
                                        <i class="fa-solid fa-arrow-turn-down"></i> */
  }
  const renderPrioritySign = (priorityId, projectId) => {
    switch (priorityId) {
      case 1:
        return <i className="fa fa-arrow-up "></i>;
      case 2:
        return <i class="fa-solid fa-arrow-right"></i>;
      case 3:
        return <i class="fa-solid fa-arrow-turn-down"></i>;
      case 4:
        return <i class="fa-solid fa-arrow-down"></i>;
    }
  };
  // const renderTaskTypeIcon = (taskType) => {
  //   {
  //     switch (taskType) {
  //       case 1:
  //         return <i class="fa-solid fa-bug text-danger"></i>;
  //       case 2:
  //         return <i className="fa fa-bookmark text-success"></i>;
  //     }
  //   }
  // };

  const handleDragEnd = (result) => {
    console.log("result", result);
    let { projectId, taskId } = JSON.parse(result.draggableId);
    const { source, destination } = result;
    console.log("destination", destination);
    //goi api cập nhật lại status
    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    dispatch({
      type: UPDATE_TASK_STATUS_SAGA,
      taskUpdateStatus: {
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      },
    });
  };
  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail?.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable droppableId={taskListDetail.statusId} key={index}>
              {(provided) => {
                return (
                  <div className="col-3 tasklist-bar">
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="card pb-2"
                      style={{ width: "17rem" }}
                    >
                      <div className=" card-header bg-gray-100  p-2 rounded flex flex-col ">
                        {taskListDetail.statusName}
                      </div>
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        key={index}
                        className="list-group list-group-flush"
                      >
                        {taskListDetail.lstTaskDeTail.map((task, index) => {
                          console.log("task", task);
                          return (
                            <Draggable
                              key={task.taskId.toString()}
                              index={index}
                              draggableId={JSON.stringify({
                                projectId: task.projectId,
                                taskId: task.taskId,
                              })}
                            >
                              {(provided) => {
                                return (
                                  <li
                                    onClick={() => {
                                      console.log("click");
                                      dispatch({
                                        type: GET_TASK_SAGA,
                                        taskId: task.taskId,
                                      });
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="list-group-item draggable-task "
                                    data-toggle="modal"
                                    data-target="#taskDetailModal"
                                  >
                                    <h4 className="text-info">
                                      {task.taskName}
                                    </h4>
                                    <div
                                      className="block"
                                      style={{ display: "flex" }}
                                    >
                                      <div className="block-left">
                                        <span className="mr-2">
                                          {renderTaskTypeIcon(
                                            task.taskTypeDetail.id
                                          )}
                                        </span>
                                        {renderPrioritySign(
                                          task.priorityTask.priorityId,
                                          projectId
                                        )}
                                        <p className="text-warning task-priority">
                                          {task.priorityTask.priority}
                                        </p>
                                      </div>
                                      <div className="block-right ml-2">
                                        <div
                                          className="avatar-group"
                                          style={{ display: "flex" }}
                                        >
                                          {task?.assigness?.map(
                                            (mem, index) => {
                                              return (
                                                <div
                                                  className="avatar "
                                                  key={index}
                                                >
                                                  <img
                                                    className="assigness-avatar"
                                                    src={mem.avatar}
                                                    alt={mem.avatar}
                                                    style={{
                                                      borderRadius: "50%",
                                                    }}
                                                  ></img>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };
  return projectDetail ? (
    <div
      style={{ padding: "0px", paddingLeft: "2rem", paddingTop: "5rem" }}
      className="content-container"
    >
      <div className="nav-crumb">
        <Breadcrumb
          className="breadcrumb-projectdetail bg-gray-100 p-2 rounded flex"
          items={[
            { title: "Project" },
            { title: "Cyber Learn" },
            { title: projectDetail.projectName },
          ]}
        />
      </div>

      <div style={{ display: "flex", width: "60%", marginBottom: "2.5rem" }}>
        <div style={{ marginRight: "150px" }}>
          <h1>Board</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "23%",
          }}
        >
          <h3 className="mr-4">Members</h3>
          {renderAvatar()}
        </div>
      </div>
      <div className="row">{renderCardTaskList()}</div>
    </div>
  ) : (
    <>
      <p>Project is empty</p>
    </>
  );
}
export default ProjectDetail;
