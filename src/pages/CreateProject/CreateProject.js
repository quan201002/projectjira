import React, { useEffect, useRef } from "react";
import { withFormik } from "formik";
import { Input, Button } from "antd";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import { https } from "../../service/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CREATE_PROJECT_SAGA } from "../../redux/constant/ProjectCyberBugsConstant";

function CreateProject(props) {
  let arrProjectCaterory = useSelector(
    (state) => state.ProjectCateroryReducer.arrProjectCaterory
  );
  // console.log("arrProjectCaterory", arrProjectCaterory);
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch({
      type: "GET_ALL_PROJECT_CATEGORY_SAGA",
    });
  }, []);
  const handelEditorChange = (content, editor) => {
    setFieldValue("description", content);
    console.log(content);
  };

  return (
    <div className="form-wrapper container1 content-container">
      <div
        style={{
          width: "80%",
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="create-project-container"
          onChange={handleChange}
        >
          <div className="form-group w-100">
            <p className="input-label">Name</p>
            <Input
              onChange={handleChange}
              className="form-control input-form"
              name="projectName"
              value={values.projectName}
            ></Input>
            <div style={{ color: "red" }}>{errors.projectName}</div>
          </div>
          <div className="form-group w-100">
            <p className="input-label">Description</p>

            <CKEditor
              className="input-form"
              editor={ClassicEditor}
              data={values.description}
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
                const data = editor.getData();
                // console.log("data", data);
                setFieldValue("description", data);
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
          <div className="form-group  w-100">
            <select
              name="categoryId"
              className="form-control input-form"
              value={values.categoryId}
              onChange={handleChange}
            >
              {arrProjectCaterory.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <Button
            htmlType="submit"
            size="large"
            className="mt-2 btn btn-primary"
            style={{ width: "fit-content" }}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    // console.log("props value", props);
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCaterory[0]?.id,
    };
  },
  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Project name is required"),
  }),
  handleChange: (e) => {
    console.log(e.values);
  },

  // Custom sync validation
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values", values);
    props.dispatch({ type: CREATE_PROJECT_SAGA, newProject: values });
  },
  displayName: "create project",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCaterory: state.ProjectCateroryReducer.arrProjectCaterory,
});
export default connect(mapStateToProps)(createProjectForm);
