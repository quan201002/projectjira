import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHTMLparser from "html-react-parser";
import { GET_ALL_STATUS_SAGA } from "../../redux/constant/StatusConstants";
import { GET_ALL_PRIORITY_SAGA } from "../../redux/constant/PriorityConstants";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODEL,
  DELETE_TASK_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_TASK_STATUS_SAGA,
} from "../../redux/constant/TaskConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../redux/constant/TaskTypeConstans";
import { Editor } from "@tinymce/tinymce-react";
import ProjectDetail from "../../pages/ProjectDetail/ProjectDetail";
import { Button, Popconfirm, Select, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
export default function ModalDetail() {
  let { taskModal } = useSelector((state) => state.TaskReducer);
  let { arrStatus } = useSelector((state) => state.StatusIdReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);

  let { projectDetail } = useSelector((state) => state.ProjectReducer);

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContet] = useState(taskModal.description);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  console.log("task model", taskModal);
  useEffect(() => {
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODEL,
      name,
      value,
    });
    // dispatch({
    //   type: CHANGE_TASK_MODEL,
    //   name,
    //   value,
    // });
  };
  const renderDescription = () => {
    const handelEditorChange = (e) => {};
    const jsxDescription = ReactHTMLparser(taskModal?.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              initialValue={taskModal.description}
              name="description"
              apiKey="yum1msoezeygff7ybjfk07rmlduenqggxcyw8oy3izh0xfch"
              init={{
                plugins:
                  "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODEL,
                  name: "description",
                  value: content,
                });
                // dispatch({
                //   type: CHANGE_TASK_MODEL,
                //   name: "description",
                //   value: content,
                // });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODEL,
                  name: "description",
                  value: historyContent,
                });
                // dispatch({
                //   type: CHANGE_TASK_MODEL,
                //   name: "description",
                //   value: historyContent,
                // });
                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            className="btn btn-primary mb-3"
            onClick={() => {
              setHistoryContet(taskModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            Add description
          </div>
        )}
      </div>
    );
  };
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining, originalEstimate } =
      taskModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock"></i>
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aira-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            ></input>
          </div>

          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
    );
  };
  const renderTaskType = () => {
    return arrTaskType.map((tp, index) => {
      return (
        <option key={index} value={tp.id}>
          {tp.taskType}
        </option>
      );
    });
  };
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      // style={{marginLeft:"24%",marginTop:"10px",height:"100%"}}
    >
      <div class="modal-dialog custom-modal " role="document">
        <div class="modal-content">
          <div className="modal-header">
            <div classame="task-title">
              <i className="fa fa-bookmark" />
              <select
                className="task-type-selector m-2"
                name="typeId"
                value={taskModal.typeId}
                onChange={handleChange}
              >
                {renderTaskType()}
              </select>
              <span className="mr-2">{taskModal.taskName}</span>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => {
                  dispatch({
                    type: DELETE_TASK_SAGA,
                    taskId: taskModal.taskId,
                    projectId: taskModal.projectId,
                  });
                }}
                okText="Yes"
                cancelText="No"
              >
                <button className="btn  btn-danger">
                  <DeleteOutlined />
                </button>
              </Popconfirm>
            </div>
            <div className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}> Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link"></i>
                <span tyle={{ paddingRight: 20 }}>Copylink</span>
              </div>
              <i
                className="fa fa-trash-alt='xyz'"
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                data-label="Close"
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue text-success">
                    This is an issue of type: Task
                  </p>
                  <div className="description">{renderDescription()}</div>
                  <div className="comment">
                    <h6 className="text-success">COMMENT</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img></img>
                      </div>
                      <div className="input-comment">
                        <input
                          type="text"
                          placeholder="Add a comment .. "
                        ></input>
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="latest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img></img>
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>gsdfsddsfsdasd</p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6 className="text-detail">Status</h6>
                    <select
                      onChange={(e) => {
                        const action = {
                          type: UPDATE_TASK_STATUS_SAGA,
                          taskUpdateStatus: {
                            taskId: taskModal.taskId,
                            statusId: e.target.value,
                            projectId: taskModal.projectId,
                          },
                        };

                        dispatch(action);
                      }}
                      className="custom-select mt-3 mb-3"
                      name="statusId"
                      value={taskModal.statusId}
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6 className="text-detail">Assignees</h6>
                    <div className="row w-100">
                      {taskModal?.assigness?.map((user, index) => {
                        return (
                          <div className="mt-2 mb-2 " key={index}>
                            <div className="item">
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar}></img>
                              </div>
                              <p className="assigness-name mt-1 ml-1">
                                <Tag color="cyan">
                                  {user.name}
                                  <span
                                    onClick={() => {
                                      dispatch({
                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                        actionType: REMOVE_USER_ASSIGN,
                                        userId: user.id,
                                      });
                                      // dispatch({
                                      //   type: REMOVE_USER_ASSIGN,
                                      //   userId: user.id,
                                      // });
                                    }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      style={{
                                        marginLeft: 5,
                                        cursor: "pointer",
                                      }}
                                    ></i>
                                  </span>
                                </Tag>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="col-6 mt-2 mb-2  p-0">
                      <Select
                        // style={{ width: "100%" }}
                        name="lstUser"
                        value="+ Add more"
                        className="form-control assigness-selector"
                        option={projectDetail?.members
                          ?.filter((mem) => {
                            let index = taskModal?.assigness?.findIndex(
                              (us) => us.id === mem.userId
                            );
                            if (index !== -1) {
                              return false;
                            }
                            return true;
                          })
                          .map((mem, index) => {
                            return { value: mem.userId, label: mem.name };
                          })}
                        optionFilterProp="label"
                        onSelect={(value) => {
                          if (value == "0") {
                            return;
                          }

                          let userSelected = projectDetail?.members?.find(
                            (mem) => mem.userId == value
                          );
                          userSelected = {
                            ...userSelected,
                            id: userSelected.userId,
                          };
                          dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_ASSIGNESS,
                            userSelected,
                          });
                          // dispatch({
                          //   type: CHANGE_ASSIGNESS,
                          //   userSelected: userSelected,
                          // });
                        }}
                      >
                        {projectDetail.members
                          ?.filter((mem) => {
                            let index = taskModal.assigness?.findIndex(
                              (us) => us.id === mem.userId
                            );
                            if (index !== -1) {
                              return false;
                            }
                            return true;
                          })
                          .map((item, index) => {
                            return (
                              <option value={item.userId}>{item.name}</option>
                            );
                          })}
                      </Select>
                    </div>
                  </div>
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6 className="text-detail">PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority.map((priority, index) => {
                        return (
                          <option key={index} value={priority.priorityId}>
                            {priority.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6 className="text-detail">ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      type="text"
                      className="estimate-hours"
                      value={taskModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    ></input>
                  </div>
                  <div className="time-tracking">
                    <h6 className="text-detail">ITME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div style={{ color: "#929398" }}>logged</div>
                    <div className="text-right" style={{ color: "#929398" }}>
                      remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
