import React, { useEffect } from "react";
import { withFormik } from "formik";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { EDIT_USER_SAGA } from "../../redux/constant/UserConstants";
import * as Yup from "yup";

const FormEditUser = (props) => {
  let dispatch = useDispatch();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  useEffect(() => {
    dispatch({ type: "SET_SUBMIT_EDIT_USER", submitFunction: handleSubmit });
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">User Id</h4>
            <input
              className="form-control"
              type="text"
              onChange={handleChange}
              value={values.id}
              name="id"
            />
          </div>
        </div>
        <div className="col-8">
          <div className="form-group">
            <h4 className="font-weight-bold">Password</h4>
            <input
              className="form-control"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passWord}
              name="passWord"
            />
            {errors.passWord && touched.passWord && (
              <div id="feedback " className="error">
                {errors.passWord}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <h4 className="font-weight-bold">Email</h4>
            <input
              className="form-control"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
            />
            {errors.email && touched.email && (
              <div id="feedback " className="error">
                {errors.email}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h4 className="font-weight-bold">Name</h4>
            <input
              className="form-control"
              type="text"
              onChange={handleChange}
              value={values.name}
              name="name"
            />
          </div>
        </div>
        <div className="col-8">
          <div className="form-group">
            <h4 className="font-weight-bold">Phone number</h4>
            <input
              className="form-control"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              name="phoneNumber"
            />
          </div>
        </div>
      </div>
      {errors.name && touched.name && (
        <div id="feedback " className="error">
          {errors.name}
        </div>
      )}
    </form>
  );
};

const EditForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = props;
    console.log("user edit", userEdit);
    return {
      id: userEdit?.userId,
      passWord: "",
      email: userEdit?.email,
      name: userEdit?.name,
      phoneNumber: userEdit?.phoneNumber,
    };
  },

  // Custom sync validation
  validate: (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*Email is required"),
    passWord: Yup.string()
      .min(6, "Password must have at least 6 characters")
      .max(32, "Password must have at most 32 characters"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: EDIT_USER_SAGA,
      editUser: values,
    });
  },
  displayName: "UserForm",
})(FormEditUser);
const mapStateToProps = (state) => ({
  userEdit: state.UserReducer.userModal,
});
export default connect(mapStateToProps)(EditForm);
