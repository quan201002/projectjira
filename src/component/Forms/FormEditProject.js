import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";

import * as Yup from "yup";
function FormEditProject(props) {
  let arrProjectCaterory = useSelector(
    (state) => state.ProjectCateroryReducer.arrProjectCaterory
  );
  console.log("arr", arrProjectCaterory);
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
  let dispatch = useDispatch();
  //   const submitForm = (e) => {
  //     alert("submit edit");
  //   };
  useEffect(() => {
    //goi api load project category
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });

    setFieldValue("description", values.description);
    //load su kien len drawer nut submit
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, []);

  const handelEditorChange = (content, editor) => {
    setFieldValue("description", content);
    // console.log(content);
  };
  const [state, setState] = useState();
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">Project Id</h4>
            <input
              className="form-control"
              value={values.id}
              onChange={handleChange}
              name="id"
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">Project name</h4>
            <input
              value={values.projectName}
              className="form-control"
              onChange={handleChange}
              name="projectName"
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">Project category</h4>
            {/* <input
              value={values.categoryId}
              className="form-control"
              onChange={handleChange}
              name="categoryId"
            /> */}
            <select
              name="catergoryId"
              className="form-control"
              value={values.catergoryId}
              onChange={handleChange}
            >
              {arrProjectCaterory?.map((item, index) => {
                return (
                  <option value={item.categoryId} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <h4 className="font-weight-bold">Description</h4>
            <Editor
              value={values.description}
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
              initialValue={values.description}
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
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
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
    const action = {
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values,
    };
    //call saga dinh nghia mot ham vi khong sai dc hook nen sai mapdispatchtoprops
    props.dispatch(action);
  },
  displayName: "edit form",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});
export default connect(mapStateToProps)(editProjectForm);
