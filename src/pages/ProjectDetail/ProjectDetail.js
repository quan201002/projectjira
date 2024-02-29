import { Col, Row } from "antd";
import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_TASK_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../redux/constant/TaskConstants";
import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
function ProjectDetail(props) {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  useEffect(() => {
    console.log("dispatch");
    dispatch({
      type: "GET_PROJECT_DETAIL_SAGA",
      projectId: projectId,
    });
  }, []);
  //useEffect sẽ chạy sau khi render giao diện
  console.log("projectiD", projectId);
  console.log("project detaill", projectDetail);

  const renderAvatar = () => {
    return projectDetail?.members?.map((user, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={user.avatar} alt={user.avatar}></img>
        </div>
      );
    });
  };
  const hadleDragEnd = (result) => {
    //lấy ra chuỗi
    let { projectId, taskId } = JSON.parse(result.draggableId);
    console.log("projectId", projectId);
    let { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      console.log(result);

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
      <DragDropContext onDragEnd={hadleDragEnd}>
        {projectDetail?.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable droppableId={taskListDetail.statusId}>
              {(provided) => {
                return (
                  <div className="col-3">
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="card pb-2"
                      style={{ width: "17rem", height: "auto" }}
                    >
                      <div className="card-header">
                        {taskListDetail.statusName}
                      </div>
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
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
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="list-group-item "
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => {
                                      dispatch({
                                        type: GET_TASK_SAGA,
                                        taskId: task.taskId,
                                      });
                                    }}
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
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
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
      <Breadcrumb
        items={[
          {
            title: "Project",
          },
          {
            title: "Cyber Learn",
          },
          {
            title: projectDetail.description,
          },
        ]}
      />
      <Row>
        <Col span={8}>
          <h1>Board</h1>
        </Col>
        <Col span={16}>
          <h3>Members</h3>
          {renderAvatar()}
        </Col>
      </Row>
      <div className="row">{renderCardTaskList()}</div>
    </div>
  ) : (
    <>
      <p>Project is empty</p>
    </>
  );
}
export default ProjectDetail;
