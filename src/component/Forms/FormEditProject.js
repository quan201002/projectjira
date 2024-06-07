import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";

import * as Yup from "yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UPDATE_PROJECT_SAGA } from "../../redux/constant/ProjectCyberBugsConstant";
function FormEditProject(props) {
  let arrProjectCaterory = useSelector(
    (state) => state.ProjectCateroryReducer.arrProjectCaterory
  );
  console.log("arr", arrProjectCaterory);
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = props;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
    setFieldValue("description", values.description);
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, []);

  const [state, setState] = useState();
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold input-label ">Project Id</h4>
            <input
              className="form-control input-form disabled-input"
              value={values.id}
              onChange={handleChange}
              name="id"
              disabled
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold input-label">Project name</h4>
            <input
              value={values.projectName}
              className="form-control input-form"
              onChange={handleChange}
              name="projectName"
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold input-label">Project category</h4>
           
            <select
              name="categoryId"
              className="form-control input-form"
              value={values.categoryId}
              onChange={handleChange}
            >
              {arrProjectCaterory?.map((item, index) => {
                console.log("item cate", item);
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <h4 className="font-weight-bold input-label mb-2">Description</h4>

            <CKEditor
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
                console.log("data", data);
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
        </div>
      </div>
    </form>
  );
}
const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    console.log("projectEdit", projectEdit);
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit?.description,
      categoryId: projectEdit?.categoryId,
    };
  },
  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Project name is required"),
  }),
  handleChange: (e) => {
    console.log(e.values);
  },


  handleSubmit: (values, { props, setSubmitting }) => {
    const action = {
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    };

    props.dispatch(action);
  },
  displayName: "edit form",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});
export default connect(mapStateToProps)(editProjectForm);
