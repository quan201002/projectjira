import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Radio, Select, Slider, Space } from "antd";
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
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../redux/constant/UserConstants";

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
  console.log("projectList", projectList);
  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const [timeTracking, setTimeTracking] = useState({
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
      type: "GET_USER_API",
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
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            setFieldValue("projectId", e.target.value);
            let { value } = e.target;
            disp({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });
          }}
          P
        >
          {projectList.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Task name</p>
            <input
              name="taskName"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-6">
            <p>Status</p>
            <select
              name="statusId"
              className="form-control"
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
            <p>priority</p>
            <select
              name="priorityId"
              className="form-control"
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
            <p>Task type</p>
            <select
              className="form-control"
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
            <p>Asignees</p>
            <Select
              mode="multiple"
              options={userOptions}
              size={size}
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
              placeholder="Please select"
              optionFilterProp="label"
              style={{
                width: "100%",
              }}
            />

            <div className="row mt-2">
              <div className="col-12 mt-1">
                <p>Original estimate</p>
                <input
                  onChange={handleChange}
                  className="form-control"
                  type="number"
                  defaultValue="0"
                  name="originalEstimate"
                  min="0"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Time tracking</p>
            <Slider
              onChange={handleChange}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={timeTracking.timeTrackingSpent}
              defaultValue={30}
              tooltip={{
                open: true,
              }}
            />
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6 text-left">
                {timeTracking.timeTrackingSpent}
              </div>
              <div className="col-6 text-left">
                {timeTracking.timeTrackingRemaining}
              </div>
            </div>
            <div className="row ">
              <div className="col-6">
                <p>Time spent</p>
                <input
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue(`timeTrackingSpent`, e.target.value);
                  }}
                  type="number"
                  defaultValue="0"
                  className="form-control"
                  name="timeTrackingSpent"
                  min="0"
                ></input>
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue(`timeTrackingRemaining`, e.target.value);
                  }}
                  type="number"
                  defaultValue="0"
                  className="form-control"
                  name="timeTrackingRemaining"
                  min="0"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>description</p>
        <Editor
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
            setFieldValue("description", content);
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
      taskName: " ",
      description: " ",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectList[0]?.projectId,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      statusId: arrStatus[0]?.statusId,
    };
  },
  mapPropsToTouched: (values) => {
    return values;
  },
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values", values);
    props.dispatch({
      type: "CREATE_TASK_SAGA",
      taskObject: values,
      projectId: values.projectId,
    });
  },
})(FormCreateTask);
const mapStatetoProps = (state) => {
  // let { projectList } = useSelector((state) => state.ProjectCyberBugsReducer);
  // let { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  // let { arrPriority } = useSelector((state) => state.PriorityReducer);
  // let { arrStatus } = useSelector((state) => state.StatusIdReducer);
  // console.log("arr status", arrStatus);
  // let { userSearch } = useSelector((state) => state.UserLoginCyberBugsReducer);
  return {
    projectList: state.ProjectCyberBugsReducer.projectList,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusIdReducer.arrStatus,
  };
};

export default connect(mapStatetoProps)(createTaskForm);
