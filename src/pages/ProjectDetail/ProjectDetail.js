import React, { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Col,
  List,
  Popconfirm,
  Popover,
  Row,
} from "antd";
import { Breadcrumb, Modal, Button, Form, Input, Checkbox } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  GET_TASK_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../redux/constant/TaskConstants";
import { renderTaskTypeIcon } from "../../service/RenderTaskTypeIcon";
import { BugOutlined, PlusOutlined } from "@ant-design/icons";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/constant/ProjectCyberBugsConstant";
import { Header } from "antd/es/layout/layout";
import {
  ADD_USER_PROJECT_API,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../redux/constant/UserConstants";
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
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
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
  const users = [...userSearch];

  const data = users;

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

  const detail = { ...projectDetail };

  const renderAvatar = () => {
    return detail?.members?.map((user, index) => {
      return (
        <div className="d-flex users-avatar">
          <div className="avatar" key={index}>
            <img src={user.avatar} alt={user.avatar}></img>
          </div>
        </div>
      );
    });
  };
  const renderAvatarResp = () => {
    return (
      <div className="d-flex ">
        {detail.members?.slice(0, 3).map((member, index) => {
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
                      {detail.members?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="mr-1">{item.userId}</td>
                            <td>
                              <img
                                style={{ borderRadius: "50%" }}
                                src={item.avatar}
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
              <Avatar src={member.avatar} key={index} />
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
                  {detail.members?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.userId}</td>
                        <td>
                          <img
                            style={{ borderRadius: "50%" }}
                            src={item.avatar}
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
          {detail.members?.length > 3 ? <Avatar>...</Avatar> : ""}
        </Popover>
      </div>
    );
  };
  const renderPrioritySign = (priorityId, projectId) => {
    switch (priorityId) {
      case 1:
        return <i className="fa fa-arrow-up"></i>;
      case 2:
        return <i className="fa-solid fa-arrow-right  "></i>;
      case 3:
        return <i className="fa-solid fa-arrow-turn-down"></i>;
      case 4:
        return <i className="fa-solid fa-arrow-down"></i>;
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
        {detail?.lstTask?.map((taskListDetail, index) => {
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
                        {taskListDetail.statusName}
                      </div>
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        key={index}
                        className="list-group list-group-flush tasks-container"
                      >
                        {taskListDetail.lstTaskDeTail.map((task, index) => {
                          // console.log("task", task);
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
                                      className="list-group-item draggable-task dragged-task"
                                      data-toggle="modal"
                                      data-target="#taskDetailModal"
                                    >
                                      <h4 className="text-info ">
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
                                          <span className="pri-sign">
                                            {renderPrioritySign(
                                              task.priorityTask.priorityId,
                                              projectId
                                            )}
                                          </span>
                                          <p className="text-warning task-priority  ">
                                            {task.priorityTask.priority}
                                          </p>
                                        </div>
                                        <div className="block-right ml-2">
                                          <div className="avatar-group">
                                            {task?.assigness
                                              .slice(0, 4)
                                              ?.map((mem, index) => {
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
                                                        width: "30px",
                                                        height: "30px",
                                                      }}
                                                    ></img>
                                                  </div>
                                                );
                                              })}
                                            {task?.assigness?.length > 4 ? (
                                              <Avatar className="avatar-remaining">
                                                ...
                                              </Avatar>
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
                                                                        src={
                                                                          item.avatar
                                                                        }
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
                                                    <Avatar
                                                      src={member.avatar}
                                                      key={index}
                                                    />
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
                                                                  src={
                                                                    item.avatar
                                                                  }
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
                                                <Avatar>...</Avatar>
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
  return detail ? (
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
            { title: detail.projectName },
          ]}
        />
      </div>

      <div style={{ display: "flex", width: "60%", marginBottom: "2.5rem" }}>
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
          <div className="avatar-container-detail">{renderAvatar()}</div>
          <div className="avatar-container-detail-resp">
            {renderAvatarResp()}
          </div>

          <button
            className="btn btn-secondary add-user-btn"
            onClick={showModal}
          >
            +
          </button>
        </div>
      </div>
      <div className="row works-container">{renderCardTaskList()}</div>

      <Modal
        className="modal-users"
        title={`Add member to project ${detail.projectName}`}
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
                      avatar={<Avatar src={item.avatar} />}
                      title={item.name}
                      description={`User id: ${item.userId}`}
                    />
                    <div>
                      <button
                        className="btn btn-primary"
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
              pagination={{
                pageSize: 9,
              }}
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
                      avatar={<Avatar src={item.avatar} />}
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
              pagination={{
                pageSize: 9,
              }}
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
