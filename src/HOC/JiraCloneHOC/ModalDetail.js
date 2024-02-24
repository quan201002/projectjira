import React, { useState } from "react";
import { useSelector } from "react-redux";

const ModalDetail = (props) => {
  const { taskModal } = useSelector((state) => state.TaskReducer);
  console.log("task modal", taskModal);
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="#modalDetailTask"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
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
                    <p>
                      llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalDetail;
