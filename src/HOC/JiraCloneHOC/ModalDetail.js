import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHTMLparser from "html-react-parser";
import { GET_ALL_STATUS_SAGA } from "../../redux/constant/StatusConstants";
import { GET_ALL_PRIORITY_SAGA } from "../../redux/constant/PriorityConstants";
export default function ModalDetail() {
  let { taskModal } = useSelector((state) => state.TaskReducer);
  let { arrStatus } = useSelector((state) => state.StatusIdReducer);
  console.log("task modal", taskModal);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  console.log("arrPriority", arrPriority);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
  }, []);
  const renderDescription = () => {
    const jsxDescription = ReactHTMLparser(taskModal.description);
    return jsxDescription;
  };
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining, originalEstimate } =
      taskModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
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
    );
  };
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div className="modal-header">
            <div classame="task-title">
              <i className="fa fa-bookmark" />
              <span>{taskModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
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
                  <p className="issue">This is an issue of type: Task</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6>COMMENT</h6>
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
                    <h6>Status</h6>
                    <select
                      onChange={(e) => {}}
                      className="custom-select"
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
                    <h6>Assignees</h6>
                    {taskModal.assigness.map((user, index) => {
                      return (
                        <div style={{ display: "flex" }} className="item">
                          <div className="avatar">
                            <img src={user.avatar} alt={user.avatar}></img>
                          </div>
                          <p className="name mt-1 ml-1">
                            {user.name}
                            <i
                              className="fa fa-times"
                              style={{ marginLeft: 5 }}
                            ></i>
                          </p>
                        </div>
                      );
                    })}

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i className="fa fa-plus" style={{ marginRight: 5 }}></i>
                      <span>Add more</span>
                    </div>
                  </div>
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      className="form-control"
                      value={taskModal.priorityTask.priorityId}
                      onChange={(e) => {}}
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
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      className="estimate-hours"
                      value={taskModal.originalEstimate}
                    ></input>
                  </div>
                  <div className="time-tracking">
                    <h6>ITME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
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
