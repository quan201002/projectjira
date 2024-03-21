import React, { useEffect, useRef, useState } from "react";
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
import {
  DELETE_COMMENT_SAGA,
  GET_COMMENTS_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../redux/constant/CommentConstant";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { renderTaskTypeIcon } from "../../service/RenderTaskTypeIcon";
import { USER_LOGIN } from "../../redux/constant/SettingSystem";
import UserLoginCyberBugsReducer from "../../redux/reducer/UserLoginCyberBugReducer";

export default function ModalDetail() {
  const [commentValue, setCommentValue] = useState("");
  const [editCmtValue, setEditCmtValue] = useState("");
  let { taskModal } = useSelector((state) => state.TaskReducer);
  let { arrStatus } = useSelector((state) => state.StatusIdReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  let { projectDetail } = useSelector((state) => state.ProjectReducer);
  let { comments } = useSelector((state) => state.CommentReducer);
  const [visibleDesEditor, setVisibleDesEditor] = useState(false);
  const [visibleCommentEditor, setVisibleCommentEditor] = useState(false);
  const [targetComment, setTargetComment] = useState("");
  const [historyContent, setHistoryContet] = useState(taskModal.description);
  const [content, setContent] = useState("");
  const userLogin = localStorage.getItem(USER_LOGIN)
    ? JSON.parse(localStorage.getItem(USER_LOGIN))
    : "";
  const dispatch = useDispatch();

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
    let isValid = true;
    console.log("value", value);
    console.log("name", name);
    console.log(taskModal.timeTrackingRemaining);
    console.log(taskModal.timeTrackingSpent);

    switch (name) {
      case "originalEstimate":
        if (value <= 0) {
          document.querySelector(".validate-original-estimate").innerText =
            "Must greater than 0";
        } else {
          document.querySelector(".validate-original-estimate").innerText = "";
        }

        if (
          taskModal.timeTrackingRemaining * 1 +
            taskModal.timeTrackingSpent * 1 !==
          value * 1
        ) {
          document.querySelector(".validate-original-estimate").innerText =
            "Equal to logged hours plus remaining hours";
        } else {
          document.querySelector(".validate-original-estimate").innerText = "";
        }
        break;
      case "timeTrackingSpent":
        if (value < 0) {
          document.querySelector(".validate-timetrackingspent").innerText =
            "Must >= 0";
        } else {
          document.querySelector(".validate-timetrackingspent").innerText = " ";
        }
        if (
          value * 1 + taskModal.timeTrackingRemaining * 1 ===
          taskModal.originalEstimate * 1
        ) {
          document.querySelector(".validate-original-estimate").innerText = "";
        } else {
          document.querySelector(".validate-original-estimate").innerText =
            "Equal to logged hours plus remaining hours";
        }

        break;
      case "timeTrackingRemaining":
        if (value < 0) {
          document.querySelector(".validate-timetrackingremaining").innerText =
            "Must >= 0";
        } else {
          document.querySelector(".validate-timetrackingremaining").innerText =
            " ";
        }
        if (
          value * 1 + taskModal.timeTrackingSpent * 1 ===
          taskModal.originalEstimate * 1
        ) {
          document.querySelector(".validate-original-estimate").innerText = "";
        } else {
          document.querySelector(".validate-original-estimate").innerText =
            "Equal to logged hours plus remaining hours";
        }
        break;
    }

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
        {visibleDesEditor ? (
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={taskModal.description}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "150px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                setContent(editor.getData());
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
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
                setVisibleDesEditor(false);
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
                setVisibleDesEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <p className="text-detail mb-1">Description:</p>
            {jsxDescription}
            <div
              className="btn btn-primary mb-3"
              onClick={() => {
                setHistoryContet(taskModal.description);
                setVisibleDesEditor(!visibleDesEditor);
              }}
            >
              Add description
            </div>
          </div>
        )}
      </div>
    );
  };
  const settingCommentEditor = (e) => {
    console.log(e.target.dataset.id);
    setTargetComment(e.target.dataset.id);
    setVisibleCommentEditor(!visibleCommentEditor);
  };
  const renderCommentEditor = (cmt, index) => {
    return (
      <div>
        {visibleCommentEditor && cmt.id == targetComment ? (
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={cmt.contentComment}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "100px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                setEditCmtValue(editor.getData());
                console.log(content);
                console.log("cmt", editCmtValue);
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: UPDATE_COMMENT_SAGA,
                  updateDetail: {
                    taskId: cmt.taskId,
                    id: cmt.id,
                    contentComment: editCmtValue,
                  },
                });
                setVisibleCommentEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                // dispatch({
                //   type: CHANGE_TASK_MODEL,
                //   name: "description",
                //   value: historyContent,
                // });

                setVisibleCommentEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                cursor: "pointer",
              }}
              data-id={cmt.id}
              key={index}
              onClick={settingCommentEditor}
            >
              Edit
            </div>
          </>
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
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>

              <p className="estimate-time">
                {Number(taskModal.timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              name="timeTrackingSpent"
              value={taskModal.timeTrackingSpent}
              onChange={handleChange}
            ></input>
            <p className="validate-text validate-timetrackingspent"></p>
          </div>

          <div className="col-6">
            <input
              type="number"
              className="form-control"
              name="timeTrackingRemaining"
              value={taskModal.timeTrackingRemaining}
              onChange={handleChange}
              defaultValue=""
            ></input>
            <p className="validate-text validate-timetrackingremaining"></p>
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
  const childRef = useRef(null);
  return (
    <div
      class="modal fade"
      id="taskDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="TaskDetailModalLabel"
      aria-hidden="true"
      // style={{marginLeft:"24%",marginTop:"10px",height:"100%"}}
    >
      <div class="modal-dialog custom-modal " role="document">
        <div class="modal-content">
          <div className="modal-header">
            <div classame="task-title w-100">
              <span
                style={{
                  width: "16px",
                  display: "inline-block",
                  height: "20px",
                }}
              >
                {renderTaskTypeIcon(taskModal.typeId)}
              </span>
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
                  childRef.current.click();
                  dispatch({
                    type: DELETE_TASK_SAGA,
                    taskId: taskModal.taskId,
                    projectId: taskModal.projectId,
                  });
                }}
                okText="Yes"
                cancelText="No"
              >
                <button className="btn btn-danger ">
                  <DeleteOutlined className="text-light" />
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
                ref={childRef}
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
                    This is an issue of type:
                    {taskModal.taskTypeDetail.taskType}
                  </p>
                  <div className="description">{renderDescription()}</div>
                  <div className="comment">
                    <h6 className="text-success">COMMENT</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src={userLogin.ava}></img>
                      </div>
                      <div className="input-comment">
                        <input
                          value={commentValue}
                          type="text"
                          placeholder="Add a comment .. "
                          onChange={(e) => {
                            console.log(e.target.value);
                            setCommentValue(e.target.value);
                          }}
                        ></input>
                        <button
                          className="btn btn-primary mt-2 mb-2"
                          onClick={() => {
                            dispatch({
                              type: INSERT_COMMENT_SAGA,
                              insertDetail: {
                                taskId: taskModal.taskId,
                                contentComment: commentValue,
                              },
                            });
                            setCommentValue("");
                          }}
                        >
                          Add comment
                        </button>
                      </div>
                    </div>
                    <div className="latest-comment">
                      <div className="comment-item">
                        {comments?.map((cmt, index) => {
                          return (
                            <div
                              key={index}
                              className="display-comment"
                              style={{ display: "flex" }}
                            >
                              <div className="avatar">
                                <img
                                  src={cmt.user.avatar}
                                  alt={cmt.user.avatar}
                                ></img>
                              </div>
                              <div>
                                <p style={{ marginBottom: 5, color: "navy" }}>
                                  {ReactHTMLparser(cmt.contentComment)}
                                </p>
                                <div className="d-flex">
                                  <span
                                    className="mr-2"
                                    style={{ color: "green" }}
                                  >
                                    {renderCommentEditor(cmt, index)}
                                  </span>
                                  <span
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => {
                                      dispatch({
                                        type: DELETE_COMMENT_SAGA,
                                        deleteDetail: {
                                          taskId: cmt.taskId,
                                          id: cmt.id,
                                        },
                                      });
                                    }}
                                  >
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
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
                      type="number"
                      className="estimate-hours"
                      value={taskModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    ></input>
                    <p className="validate-text validate-original-estimate"></p>
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
