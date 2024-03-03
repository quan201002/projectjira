import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { UPDATE_TASK_STATUS_SAGA } from "../../redux/constant/TaskConstants";

function ProjectDetail(props) {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_PROJECT_DETAIL_SAGA",
      projectId,
    });
  }, []);

  let { projectDetail } = useSelector((state) => state.ProjectReducer);
  console.log("projectDetail: ", projectDetail);

  const { projectId } = useParams();
  console.log("project detaill", projectDetail);
  const renderAvatar = () => {
    return projectDetail?.members?.map((user, index) => {
      console.log("user: ", user);
      return (
        <div className="avatar" key={index}>
          <img src={user.avatar} alt={user.avatar}></img>
        </div>
      );
    });
  };
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
                  <div className="p-3 tasklist-bar">
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="card pb-2"
                      style={{ width: "17rem" }}
                    >
                      <div className=" card-header bg-gray-100 p-2 rounded flex flex-col  ">
                        {taskListDetail.statusName}
                      </div>
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        key={index}
                        className="list-group list-group-flush"
                      >
                        {taskListDetail.lstTaskDeTail.map((task, index) => {
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
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="list-group-item "
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                  >
                                    <p>{task.taskName}</p>
                                    <div
                                      className="block"
                                      style={{ display: "flex" }}
                                    >
                                      <div className="block-left">
                                        <i className="fa fa-bookmark"></i>
                                        <i className="fa fa-arrow-up"></i>
                                        <p className="text-danger">
                                          {task.priorityTask.priority}
                                        </p>
                                      </div>
                                      <div className="block-right">
                                        <div
                                          className="avatar-group"
                                          style={{ display: "flex" }}
                                        >
                                          {task.assigness.map((mem, index) => {
                                            return (
                                              <div
                                                className="avatar"
                                                key={index}
                                              >
                                                <img
                                                  src={mem.avatar}
                                                  alt={mem.avatar}
                                                  style={{
                                                    borderRadius: "50%",
                                                  }}
                                                ></img>
                                              </div>
                                            );
                                          })}
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
    <div className="content-container">
      <div className="nav-crumb">
        <Breadcrumb
          className="bg-gray-100 p-2 rounded flex flex-col justify-between"
          items={[
            { title: "Project" },
            { title: "Cyber Learn" },
            { title: projectDetail.projectName },
          ]}
        />
      </div>

      <div className="d-md-flex justify-content-between">
        <div className="mr-md-5">
          <h1>Board</h1>
        </div>
        <div className="d-flex flex-column mt-md-0 mt-3">
          <h3>Members</h3>
          {renderAvatar()}
        </div>
      </div>

      <Row>{renderCardTaskList()}</Row>
    </div>
  ) : (
    <>
      <p>Project is empty</p>
    </>
  );
}
export default ProjectDetail;