import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllProjectCaterory } from "../../redux/reducer/ProjectCaterorySlice";
import { https } from "../../service/api";

function CreateProject(props) {
  const dispatch = useDispatch();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  useEffect(() => {}, []);
  const handelEditorChange = (content, editor) => {
    console.log("Content was update:", content);
  };
  return (
    <div className="content-container">
      <h3>{props.displayName}</h3>
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <p>Name</p>
          <input
            onChange={handleChange}
            className="form-control"
            name="projectName"
          ></input>
          <div>{errors.projectName}</div>
        </div>
        <div className="form-group">
          <p>Description</p>
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
            initialValue="Welcome to TinyMCE!"
            onEditorChange={handelEditorChange}
          />
        </div>
        <div className="form-group">
          <select name="catergoryId" className="form-control">
            {/* <option>Software</option>
            <option>Web</option>
            <option>App</option> */}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
const createProjectForm = withFormik({
  mapPropsToValues: () => ({
    projectName: "",
    description: "",
    catergoryId: "",
  }),
  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Project name is required"),
  }),
  handleChange: (e) => {
    console.log(e.values);
  },

  // Custom sync validation
  validate: (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {},

  displayName: "CreateProjectFormik",
})(CreateProject);

export default connect()(createProjectForm);
