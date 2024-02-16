import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch } from "react-redux";
import { withFormik } from "formik";

import * as Yup from "yup";
function FormEditProject(props) {
  let dispatch = useDispatch();
  const submitForm = (e) => {
    alert("submit edit");
  };
  useEffect(() => {
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: submitForm });
  }, []);

  const handelEditorChange = (content, editor) => {
    // setFieldValue("description", content);
    // console.log(content);
  };
  const [state, setState] = useState();
  return (
    <form onSubmit>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">Project Id</h4>
            <input className="form-control" />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">Project name</h4>
            <input className="form-control" />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">Project category</h4>
            <input className="form-control" />
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <h4 className="font-weight-bold">Description</h4>
            <Editor
              name="description123"
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
              onEditorChange={handelEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {};
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
  displayName: "CreateProjectFormik",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});
export default connect(mapStateToProps)(editProjectForm);
