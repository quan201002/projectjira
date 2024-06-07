import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { AutoComplete, Radio, Select, Slider, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../redux/constant/ProjectCyberBugsConstant";
import { GET_ALL_TASK_TYPE_SAGA } from "../../redux/constant/TaskTypeConstans";
import {
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../../redux/constant/PriorityConstants";
import { withFormik } from "formik";
import { connect } from "react-redux";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../redux/constant/StatusConstants";
import { select } from "redux-saga/effects";
import {
  GET_USER_API,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../redux/constant/UserConstants";
import { USER_LOGIN } from "../../redux/constant/SettingSystem";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CREATE_TASK_SAGA } from "../../redux/constant/TaskConstants";

const FormCreateTask = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  // console.log("user login", userLogin);
  //do kết nối với withFormmik nên sinh ra những props này
  let { projectList } = useSelector((state) => state.ProjectCyberBugsReducer);
  let { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  let { arrPriority } = useSelector((state) => state.PriorityReducer);
  let { arrStatus } = useSelector((state) => state.StatusIdReducer);
  let { userSearch } = useSelector((state) => state.UserLoginCyberBugsReducer);
  let { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);

  const userOptions = arrUser?.map((item, index) => {
    return { value: item.userId, label: item.name };
  });
  // console.log("projectList", projectList);
  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const [timeTracking, setTimeTracking] = useState({
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  let disp = useDispatch();
  useEffect(() => {
    disp({
      type: GET_ALL_PROJECT_SAGA,
    });
    disp({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    disp({
      type: GET_ALL_PRIORITY_SAGA,
    });
    disp({
      type: GET_USER_API,
    });
    disp({
      type: GET_ALL_STATUS_SAGA,
    });
    disp({
      type: "SET_SUBMIT_CREATE_TASK",
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <p className="input-label">Project</p>
        <select
          name="projectId"
          className="form-control input-form"
          onChange={(e) => {
            setFieldValue("projectId", e.target.value);
            let { value } = e.target;
            disp({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });
          }}
        >
          {/* {projectList
            .filter((item) => item.creator.name === userLogin.name)
            .map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectName}
                </option>
              );
            })} */}
          {projectList.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectName}
              </option>
            );
          })}
        </select>
        <p
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          * You can only create tasks of your own project
        </p>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="input-label">Task name</p>
            <input
              name="taskName"
              className="form-control input-form"
              onChange={handleChange}
              value={values.taskName}
            ></input>
            {errors.taskName && touched.taskName && (
              <div id="feedback">{errors.taskName}</div>
            )}
          </div>
          <div className="col-6">
            <p className="input-label">Status</p>
            <select
              name="statusId"
              className="form-control input-form"
              onChange={handleChange}
            >
              {arrStatus?.map((status, index) => {
                return (
                  <option key={index} value={status.statusId}>
                    {status.statusName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="input-label">Priority</p>
            <select
              name="priorityId"
              className="form-control input-form"
              onChange={handleChange}
            >
              {arrPriority.map((priority, index) => {
                return (
                  <option
                    key={index}
                    value={priority.priorityId}
                    name="priorityId"
                  >
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p className="input-label">Task type</p>
            <select
              className="form-control input-form"
              name="typeId"
              onChange={handleChange}
            >
              {arrTaskType.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="input-label">Assignees</p>
            <Select
              mode="multiple"
              options={userOptions}
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
      
              placeholder="Please select"
              optionFilterProp="label"
              style={{
                width: "100%",
              }}
            />
            {errors.listUserAsign && touched.listUserAsign && (
              <div id="feedback">{errors.listUserAsign}</div>
            )}
            <div className="row mt-2">
              <div className="col-12 mt-1">
                <p className="input-label">Original estimate (hours)</p>
                <input
                  onChange={handleChange}
                  className="form-control input-form"
                  type="number"
                  name="originalEstimate"
                  min="0"
                  autoComplete="off"
                ></input>
                {errors.originalEstimate && touched.originalEstimate && (
                  <div id="feedback">{errors.originalEstimate}</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-6">
            <p className="input-label">Time tracking (hours)</p>
            <Slider
              className="form-input"
              onChange={handleChange}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={timeTracking.timeTrackingSpent}
              defaultValue={30}
            />
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6 text-left time-tracking-display">
                {timeTracking.timeTrackingSpent}
              </div>
              <div className="col-6 text-left time-tracking-display">
                {timeTracking.timeTrackingRemaining}
              </div>
            </div>
            <div className="row ">
              <div className="col-6">
                <p className="input-label">Time spent</p>
                <input
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                  type="number"
                  className="form-control input-form"
                  name="timeTrackingSpent"
                  min="0"
                  autoComplete="off"
                ></input>
                {errors.timeTrackingSpent && touched.timeTrackingSpent && (
                  <div id="feedback">{errors.timeTrackingSpent}</div>
                )}
              </div>
              <div className="col-6">
                <p className="input-label">Time remaining</p>
                <input
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                  autoComplete="off"
                  type="number"
                  className="form-control input-form"
                  name="timeTrackingRemaining"
                  min="0"
                  max={values.originalEstimate}
                ></input>
                {errors.timeTrackingRemaining &&
                  touched.timeTrackingRemaining && (
                    <div id="feedback">{errors.timeTrackingRemaining}</div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p className="input-label">Description</p>

        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor&nbsp;5!</p>"
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "200px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(event, editor) => {
            setFieldValue("description", editor.getData());
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </form>
  );
};

const createTaskForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectList, arrTaskType, arrPriority, arrStatus } = props;

    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectList[0]?.projectId,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      statusId: arrStatus[0]?.statusId,
    };
  },
  validate: (values) => {
    const errors = {};

    if (values.taskName == "") {
      errors.taskName = "Required";
    }
    if (values.listUserAsign.length === 0) {
      errors.listUserAsign = "Required";
    }
    if (values.originalEstimate == "") {
      errors.originalEstimate = "Required";
    } else if (values.originalEstimate <= 0) {
      errors.originalEstimate = "Must greater than 0";
    }
    if (values.timeTrackingSpent == "") {
      errors.timeTrackingSpent = "Required";
    } else if (values.timeTrackingSpent < 0) {
      errors.timeTrackingSpent = "Must greater than 0";
    } else if (values.timeTrackingSpent > values.originalEstimate) {
      errors.timeTrackingSpent = "Can not greater than original estimate";
    }
    if (values.timeTrackingRemaining == "") {
      errors.timeTrackingRemaining = "Required";
    } else if (values.timeTrackingRemaining > values.originalEstimate) {
      errors.timeTrackingRemaining = "Can not greater than original estimate";
    } else if (values.timeTrackingRemaining < 0) {
      errors.timeTrackingRemaining = "Must greater than 0";
    }

    if (
      Number(values.timeTrackingRemaining) +
        Number(values.timeTrackingSpent) !==
      Number(values.originalEstimate)
    ) {
      errors.originalEstimate = "Wrong";
    }
    return errors;
  },
  mapPropsToTouched: (values) => {
    return values;
  },
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values create task", values);
    props.dispatch({
      type: CREATE_TASK_SAGA,
      taskObject: values,
      projectId: values.projectId,
    });
  },
})(FormCreateTask);
const mapStatetoProps = (state) => {
  // let { projectList } = useSelector((state) => state.ProjectCyberBugsReducer);
  return {
    projectList: state.ProjectCyberBugsReducer.projectList,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusIdReducer.arrStatus,
  };
};

export default connect(mapStatetoProps)(createTaskForm);
