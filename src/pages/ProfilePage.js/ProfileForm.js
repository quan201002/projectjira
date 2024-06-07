import React from "react";
import { withFormik } from "formik";
import { connect } from "react-redux";
import { Button } from "antd";
import { EDIT_PROJECT } from "../../redux/constant/ProjectCyberBugsConstant";
import {
  EDIT_PROFILE_SAGA,
  EDIT_USER_SAGA,
} from "../../redux/constant/UserConstants";

const ProfileForm = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form onSubmit={handleSubmit} className="  profile-form">
      <label for="id">Id:</label>
      <input
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.id}
        name="id"
        disabled
        className="id-input"
      />
      {errors.id && touched.id && <div id="feedback">{errors.id}</div>}
      <label for="name">Name:</label>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
      <label for="email">Email:</label>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        name="email"
      />
      {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
      <label for="phoneNumber">Phone number:</label>
      <input
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phoneNumber}
        name="phoneNumber"
      />
      {errors.phone && touched.phone && <div id="feedback">{errors.phone}</div>}
      <div className="submit-button">
        <button type="submit" className="edit-frofile-button my-button mt-3">
          Edit
        </button>
      </div>
    </form>
  );
};

const ProfileFormFormik = withFormik({
  mapPropsToValues: (props) => {
    const { userLogin } = props;
    return {
      name: userLogin?.name,
      id: userLogin?.id,
      email: userLogin?.email,
      phoneNumber: userLogin?.phoneNumber,
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

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    props.dispatch({
      type: EDIT_PROFILE_SAGA,
      editUser: values,
    });
  },

  displayName: "ProfileForm",
})(ProfileForm);
const mapStatetoProps = (state) => {
  return {
    userLogin: state.UserLoginCyberBugsReducer.userLogin,
  };
};
export default connect(mapStatetoProps)(ProfileFormFormik);
