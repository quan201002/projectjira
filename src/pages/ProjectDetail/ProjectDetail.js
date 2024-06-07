import React, { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Col,
  List,
  Popconfirm,
  Popover,
  Row,
  Select,
  Tag,
  Tooltip,
} from "antd";

import { Breadcrumb, Modal, Button, Form, Input, Checkbox } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  CREATE_TASK_SAGA,
  GET_TASK_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../redux/constant/TaskConstants";
import { renderTaskTypeIcon } from "../../service/RenderTaskTypeIcon";
import {
  BugOutlined,
  DownSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/constant/ProjectCyberBugsConstant";
import { Header } from "antd/es/layout/layout";
import {
  ADD_USER_PROJECT_API,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../redux/constant/UserConstants";
import ModalDetail from "../../HOC/JiraCloneHOC/ModalDetail";

const { Search } = Input;

function ProjectDetail(props) {
  const onSelect = (data) => {
    console.log("onSelect", data);
  };
  const onChange = (data) => {
    setValue(data);
  };
  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const [value, setValue] = useState("");
  const [task, setTask] = useState({
    taskName: "",
    typeId: "1",
  });
  const [select, setSelect] = useState(1);

  const searchRef = useRef(null);
  const getPanelValue = (searchText) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  const { projectId } = useParams();
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);

  const onSearch = (value, _e, info) => {
    dispatch({
      type: GET_USER_API,
      keyWord: value,
    });
  };
  const outSiders = [];
  const usersList = [...userSearch];
  usersList?.map((a) => {
    let is = false;
    for (let i = 0; i < arrUser.length; i++) {
      if (a.userId == arrUser[i].userId) {
        is = true;
      }
    }
    if (!is) {
      outSiders.push(a);
    }
  });

  useEffect(() => {
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId,
    });
    dispatch({
      type: GET_USER_API,
      keyWord: "",
    });
    dispatch({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: projectId,
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let dispatch = useDispatch();

  let { projectDetail } = useSelector((state) => state.ProjectReducer);
  const renderCreateTaskButton = (index) => {
    if (index == 0) {
      return <></>;
    }
  };
  const renderAvatar = () => {
    return projectDetail?.members?.map((user, index) => {
      return (
        <div className="d-flex users-avatar">
          <div className="avatar avatars" key={index}>
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random&bold=true`}
              alt={user.name}
            ></img>
          </div>
        </div>
      );
    });
  };
  const renderAvatarResp = () => {
    return (
      <div className="d-flex ">
        {projectDetail.members?.slice(0, 3).map((member, index) => {
          return (
            <Popover
              key={index}
              placement="topLeft"
              title="Members"
              content={() => {
                return (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>avatar</th>
                        <th>name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectDetail.members?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="mr-1">{item.userId}</td>
                            <td>
                              <img
                                style={{ borderRadius: "50%" }}
                                src={`https://ui-avatars.com/api/?name=${item.name}&background=random&bold=true`}
                                key={index}
                                width="50"
                                height="50"
                              ></img>
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <Popconfirm
                                title="Remove assignee"
                                description="Are you sure to remove this user from project ?"
                                onConfirm={() => {
                                  dispatch({
                                    type: "REMOVE_USER_PROJECT_API",
                                    userProject: {
                                      projectId: projectId,
                                      userId: item.userId,
                                    },
                                  });
                                }}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button
                                  style={{ borderRadius: "50%" }}
                                  className="btn btn-danger"
                                >
                                  X
                                </button>
                              </Popconfirm>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              }}
            >
              <div className="avatars">
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${member.name}&background=random&bold=true`}
                  key={index}
                />
              </div>
            </Popover>
          );
        })}
        <Popover
          placement="topLeft"
          title="Members"
          content={() => {
            return (
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>avatar</th>
                    <th>name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projectDetail.members?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.userId}</td>
                        <td>
                          <img
                            style={{ borderRadius: "50%" }}
                            src={`https://ui-avatars.com/api/?name=${item.name}&background=random&bold=true`}
                            key={index}
                            width="50"
                            height="50"
                          ></img>
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <Popconfirm
                            title="Remove assignee"
                            description="Are you sure to remove this user from project ?"
                            onConfirm={() => {
                              dispatch({
                                type: "REMOVE_USER_PROJECT_API",
                                userProject: {
                                  projectId: projectId,
                                  userId: item.userId,
                                },
                              });
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              style={{ borderRadius: "50%" }}
                              className="btn btn-danger"
                            >
                              X
                            </button>
                          </Popconfirm>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          }}
        >
          {projectDetail.members?.length > 3 ? (
            <Avatar
              className="remainings"
              style={{
                marginLeft: "-20px",
              }}
            >
              +{projectDetail.members?.length - 3}
            </Avatar>
          ) : (
            ""
          )}
        </Popover>
      </div>
    );
  };
  const renderPrioritySign = (priorityId, projectId) => {
    switch (priorityId) {
      case 1:
        return <i class="fa-solid fa-angle-up text-danger"></i>;
      case 2:
        return <i className="fa-solid fa-equals   text-warning"></i>;
      case 3:
        return <i className="fa-solid fa-angle-down text-primary"></i>;
      case 4:
        return <i className="fa-solid fa-angles-down text-primary"></i>;
    }
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  const handelChangeSelect = (e) => {
    console.log(e.value);
    setSelect(e.value);
  };
  const handleSubmit = (e) => {
    setIsCreatingTask(false);
    dispatch({
      type: CREATE_TASK_SAGA,
      taskObject: {
        listUserAsign: [],
        taskName: task.taskName,
        description: "",
        statusId: 1,
        originalEstimate: 10,
        timeTrackingSpent: 5,
        timeTrackingRemaining: 5,
        projectId: projectId,
        typeId: select,
        priorityId: 2,
      },
      projectId: projectId,
    });
    setTask("");
  };

  const renderCreatingTask = () => {
    return !isCreatingTask ? (
      <div className="create-task-btn-container">
        <button
          className="create-task-button my-button"
          onClick={() => {
            setIsCreatingTask(true);
          }}
        >
          Create task
        </button>
      </div>
    ) : (
      <div className="quick-creatingtask-form">
        <form onSubmit={handleSubmit} className="quick-create-task-form">
          <input
            style={{
              color: "var(--text)",
            }}
            onChange={handelChange}
            type="text"
            value={task.taskName}
            className="what-task"
            name="taskName"
            placeholder="What need to be done ?"
          ></input>
          <Select
            labelInValue
            dropdownRender={(menu) => (
              <div style={{ backgroundColor: "var(--form-background)" }}>
                {menu}
              </div>
            )}
            defaultValue={{
              value: "1",
              label: (
                <>
                  <BugOutlined style={{ color: "red" }} />
                </>
              ),
            }}
            className="quicktask-select"
            name="typeId"
            title="type"
            onSelect={handelChangeSelect}
            style={{
              width: 50,
            }}
            options={[
              {
                value: "1",
                label: (
                  <>
                    <BugOutlined style={{ color: "red" }} />
                  </>
                ),
              },
              {
                value: "2",
                label: (
                  <>
                    <DownSquareOutlined style={{ color: "green" }} />
                  </>
                ),
              },
            ]}
          />
          <button type="submit" className="submit-create-task my-button">
            +
          </button>
        </form>
      </div>
    );
  };

  const handleDragEnd = (result) => {
    console.log("result", result);
    console.log("project detail", projectDetail);
    let { projectId, taskId } = JSON.parse(result.draggableId);
    const { source, destination } = result;
    // console.log("destination", destination);
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
    console.log(
      projectDetail.lstTask[source.droppableId - 1].lstTaskDeTail[source.index]
    );
    let taskClone =
      projectDetail.lstTask[source.droppableId - 1].lstTaskDeTail[source.index];
    projectDetail.lstTask[source.droppableId - 1].lstTaskDeTail.splice(
      source.index,
      1
    );

    let propDestination =
      projectDetail.lstTask[destination.droppableId - 1].lstTaskDeTail;
    propDestination.splice(destination.index, 0, taskClone);
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
    const colors = ["yellow", "blue", "green", "red"];
    const orderColors = ["red", "gold", "green", "purple"];
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail?.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable droppableId={taskListDetail.statusId} key={index}>
              {(provided) => {
                return (
                  <div
                    className="col-lg-3 col-md-6 col-sm-12 tasklist-bar"
                    id="task-container"
                  >
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="card pb-2 card-task-list"
                    >
                      <div className=" card-header bg-gray-100  p-2 rounded flex flex-col ">
                        <Tag style={{ fontSize: "18px" }} color={colors[index]}>
                          {taskListDetail.statusName}
                        </Tag>
                      </div>
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        key={index}
                        className="list-group list-group-flush tasks-container"
                      >
                        {taskListDetail.lstTaskDeTail.map((task, index) => {
                          return (
                            <>
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
                                        const taskModalform =
                                          document.getElementById(
                                            "taskDetailModal"
                                          );
                                        taskModalform.style.display = "block";
                                        document
                                          .querySelector("body")
                                          .classList.add("modal-open");
                                        dispatch({
                                          type: GET_TASK_SAGA,
                                          taskId: task.taskId,
                                        });
                                      }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="list-group-item task draggable-task dragged-task"
                                      data-toggle="modal"
                                      data-target="#taskDetailModal"
                                    >
                                      <h6 className="mb-3">{task.taskName}</h6>
                                      <div
                                        className="block"
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div className="block-left space-x-4">
                                          <span className="mr-3 ">
                                            {renderTaskTypeIcon(
                                              task.taskTypeDetail.id
                                            )}
                                          </span>
                                          <span className="pri-sign mr-2">
                                            {renderPrioritySign(
                                              task.priorityTask.priorityId,
                                              projectId
                                            )}
                                          </span>
                                          <span className="task-priority ml-2">
                                            <Tag
                                              color={
                                                orderColors[
                                                  task.priorityTask.priorityId -
                                                    1
                                                ]
                                              }
                                            >
                                              {task.priorityTask.priority}
                                            </Tag>
                                          </span>
                                        </div>
                                        <div className="block-right">
                                          <div className="avatar-group">
                                            {task?.assigness
                                              .slice(0, 4)
                                              ?.map((mem, index) => {
                                                return (
                                                  <div
                                                    className="avatars"
                                                    key={index}
                                                  >
                                                    <img
                                                      src={`https://ui-avatars.com/api/?name=${mem.name}&background=random&bold=true`}
                                                      alt={mem.avatar}
                                                      style={{
                                                        borderRadius: "50%",
                                                        width: "30px",
                                                        height: "30px",
                                                      }}
                                                    ></img>
                                                  </div>
                                                );
                                              })}
                                            {task?.assigness?.length > 4 ? (
                                              <div
                                                className="avatars"
                                                key={index}
                                              >
                                                <Avatar
                                                  style={{
                                                    background: "#007bff",
                                                  }}
                                                >
                                                  +{task.assigness.length - 4}
                                                </Avatar>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <div className="avatar-group-responsive">
                                            {task?.assigness
                                              ?.slice(0, 2)
                                              .map((member, index) => {
                                                return (
                                                  <Popover
                                                    key={index}
                                                    placement="top"
                                                    title="Members"
                                                    content={() => {
                                                      return (
                                                        <table className="table">
                                                          <thead>
                                                            <tr>
                                                              <th>Id</th>
                                                              <th>avatar</th>
                                                              <th>name</th>
                                                              <th></th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {task?.assigness?.map(
                                                              (item, i) => {
                                                                return (
                                                                  <tr key={i}>
                                                                    <td className="mr-1">
                                                                      {item.id}
                                                                    </td>
                                                                    <td>
                                                                      <img
                                                                        style={{
                                                                          borderRadius:
                                                                            "50%",
                                                                        }}
                                                                        src={`https://ui-avatars.com/api/?name=${item.name}&background=random&bold=true`}
                                                                        width="50"
                                                                        height="50"
                                                                      ></img>
                                                                    </td>
                                                                    <td>
                                                                      {
                                                                        item.name
                                                                      }
                                                                    </td>
                                                                  </tr>
                                                                );
                                                              }
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      );
                                                    }}
                                                  >
                                                    <div className="avatars">
                                                      <Avatar
                                                        src={`https://ui-avatars.com/api/?name=${member.name}&background=random&bold=true`}
                                                        key={index}
                                                      />
                                                    </div>
                                                  </Popover>
                                                );
                                              })}
                                            <Popover
                                              placement="topLeft"
                                              title="Members"
                                              content={() => {
                                                return (
                                                  <table className="table">
                                                    <thead>
                                                      <tr>
                                                        <th>Id</th>
                                                        <th>avatar</th>
                                                        <th>name</th>
                                                        <th></th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {task?.assigness?.map(
                                                        (item, index) => {
                                                          return (
                                                            <tr key={index}>
                                                              <td>{item.id}</td>
                                                              <td>
                                                                <img
                                                                  style={{
                                                                    borderRadius:
                                                                      "50%",
                                                                  }}
                                                                  src={`https://ui-avatars.com/api/?name=${item.name}&background=random&bold=true`}
                                                                  width="50"
                                                                  height="50"
                                                                ></img>
                                                              </td>
                                                              <td>
                                                                {item.name}
                                                              </td>
                                                            </tr>
                                                          );
                                                        }
                                                      )}
                                                    </tbody>
                                                  </table>
                                                );
                                              }}
                                            >
                                              {task?.assigness?.length >= 3 ? (
                                                <div className="avatars">
                                                  <Avatar
                                                    style={{
                                                      backgruond: "#007bff",
                                                    }}
                                                  >
                                                    +{task.assigness.length - 3}
                                                  </Avatar>
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </Popover>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                }}
                              </Draggable>
                            </>
                          );
                        })}
                        {index == 0 ? renderCreatingTask() : <></>}
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
      <ModalDetail />
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
      <div className="members mb-3">
        <div className="board">
          <h1 className="text">Board</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "23%",
          }}
        >
          <h3 className="mr-4 text">Members</h3>
          <div className="avatar-container-detail">
            {renderAvatar()}
            <div className="add-button-container">
              <button
                className="add-user-btn add-button my-button"
                onClick={showModal}
              >
                <span>+</span>
              </button>
            </div>
          </div>
          <div className="avatar-container-detail-resp">
            {renderAvatarResp()}

            <button
              className="add-user-btn my-button add-button add-button-reps"
              onClick={showModal}
            >
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
      <div className="row works-container">{renderCardTaskList()}</div>
      <Modal
        className="modal-users"
        title={`Add member to project ${projectDetail.projectName}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AutoComplete
          options={userSearch?.map((user, index) => {
            return {
              label: user.name,
              value: user.userId.toString(),
            };
          })}
          style={{
            width: "100%",
          }}
          value={value}
          onSearch={(value) => {
            searchRef.current = setTimeout(() => {
              dispatch({
                type: GET_USER_API,
                keyWord: value,
              });
            }, 500);
          }}
          onChange={(text) => {
            setValue(text);
          }}
          onSelect={(valueSelected, option) => {
            setValue(option.label);
            dispatch({
              type: GET_USER_API,
              keyWord: valueSelected,
            });
          }}
          placeholder="Search user"
        />
        <div className="row modal-users-container">
          <div className="col-6 col-sx-12 col-sm-6  users-container">
            <h5 className="title">Not yet added</h5>
            <List
              bordered
              dataSource={outSiders}
              renderItem={(item) => (
                <List.Item>
                  <div className="w-100 d-flex justify-content-between">
                    <List.Item.Meta
                      avatar={
                        <Tooltip placement="rightTop" title={item.name}>
                          <Avatar src={item.avatar} />
                        </Tooltip>
                      }
                      title={item.name}
                      description={`User id: ${item.userId}`}
                    />
                    <div>
                      <button
                        className="btn btn-primary"
                        style={{
                          borderRadius: "50%",
                        }}
                        onClick={() => {
                          dispatch({
                            type: ADD_USER_PROJECT_API,
                            userProject: {
                              projectId: projectId,
                              userId: item.userId,
                            },
                          });
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </List.Item>
              )}
              // pagination={{
              //   pageSize: 9,
              // }}
            />
          </div>
          <div className="col-6 col-sx-12 col-sm-6  users-container">
            <h5 className="title">Already in project</h5>
            <List
              bordered
              dataSource={arrUser}
              renderItem={(item) => (
                <List.Item>
                  <div className="w-100 d-flex justify-content-between">
                    <List.Item.Meta
                      avatar={
                        <Tooltip placement="rightTop" title={item.name}>
                          <Avatar src={item.avatar} />
                        </Tooltip>
                      }
                      title={item.name}
                      description={`User id: ${item.userId}`}
                    />
                    <div>
                      <Popconfirm
                        title="Remove assignee"
                        description="Are you sure to remove this user from project ?"
                        onConfirm={() => {
                          dispatch({
                            type: "REMOVE_USER_PROJECT_API",
                            userProject: {
                              projectId: projectId,
                              userId: item.userId,
                            },
                          });
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button
                          style={{ borderRadius: "50%" }}
                          className="btn btn-danger"
                        >
                          X
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <>
      <p>Project is empty</p>
    </>
  );
}
export default ProjectDetail;
