import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import { Input, Button } from "antd";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";

import { https } from "../../service/api";

function CreateProject(props) {
  let arrProjectCaterory = useSelector(
    (state) => state.ProjectCateroryReducer.arrProjectCaterory
  );

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
    <form
      onSubmit={handleSubmit}
      className="content-container"
      onChange={handleChange}
    >
      <div className="form-group">
        <p>Name</p>
        <Input
          onChange={handleChange}
          className="form-control"
          name="projectName"
          value={values.projectName}
        ></Input>
        <div>{errors.projectName}</div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          value={values.description}
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
          initialValue="Welcome to TinyMCE!"
          onEditorChange={handelEditorChange}
        />
      </div>
      <div className="form-group">
        <select
          name="catergoryId"
          className="form-control"
          value={values.catergoryId}
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
        className="mt-5 btn btn-primary"
        style={{ width: "65%" }}
      >
        CreateProject
      </Button>
    </form>
  );
}
const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    console.log("props value", props);
    return {
      projectName: "",
      description: "",
      catergoryId: props.arrProjectCaterory[0]?.id,
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
    props.dispatch({ type: "CREATE_PROJECT_SAGA", newProject: values });
  },
  displayName: "create project",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCaterory: state.ProjectCateroryReducer.arrProjectCaterory,
});
export default connect(mapStateToProps)(createProjectForm);
