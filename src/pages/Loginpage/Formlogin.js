// Formlogin.js
import React, { useEffect } from "react";
import { Input, Button } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LockOutlined,
  UserOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { signinCyberbugAction } from "../../redux/actions/actions";
import { UseDispatch } from "react-redux";
import { USER_SIGIN_API } from "../../redux/constant/CyberBugsConstant";
import { Link } from "react-router-dom";

const Formlogin = (props) => {
  const dispatch = useDispatch();
  const getTaskList = () => {
    dispatch({
      type: "getTaskApiAction",
    });
  };

  useEffect(() => {
    getTaskList();
    return () => {};
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <div
      style={{
        backgroundImage: 'url("/background.jpg")',
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: "center", width: "100%", height: "100%" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "25px",
              padding: "30px",
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "fit-content",
              boxShadow: "2px 3px 34px -8px rgba(0,0,0,0.78)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div className="title">Welcome!</div>
              {/* Phần hiển thị form đăng nhập */}
              <div style={{ width: "100%", margin: "0 auto" }}>
                <h3 style={{ color: "#1890ff", marginBottom: "30px" }}></h3>
                <input
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  style={{ marginBottom: "20px" }}
                  className={
                    errors.email && touched.email
                      ? "error form-control login-input"
                      : "form-control login-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
                <input
                  type="password"
                  onChange={handleChange}
                  value={values.passWord}
                  name="passWord"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  style={{ marginBottom: "20px" }}
                  className={
                    errors.passWord && touched.passWord
                      ? "error form-control login-input"
                      : "form-control login-input"
                  }
                />
                {errors.passWord && touched.passWord ? (
                  <div className="error">{errors.passWord}</div>
                ) : null}
                <Button
                  htmlType="submit"
                  size="large"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    backgroundColor: "#1890ff",
                    borderColor: "#1890ff",
                  }}
                >
                  Login
                </Button>

                <Link to="/signup">
                  <Button
                    size="large"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      backgroundColor: "#A3CBF1",
                      borderColor: "#A3CBF1",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <div className="social mt-5" style={{ marginTop: "20px" }}>
                  <Button
                    className="bg-primary me-3"
                    type="primary"
                    shape="circle"
                    icon={<FacebookOutlined />}
                    size={"large"}
                  ></Button>
                  <Button
                    className="bg-primary me-3"
                    type="primary"
                    shape="circle"
                    icon={<TwitterOutlined />}
                    size={"large"}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const LoginCyberBugs = withFormik({
  mapPropsToValues: () => ({ email: "", passWord: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*Email is required"),
    passWord: Yup.string()
      .min(6, "Password must have at least 6 characters")
      .max(32, "Password must have at most 32 characters"),
  }),
  handleSubmit: ({ email, passWord }, { props, setSubmitting }) => {
    props.dispatch(signinCyberbugAction(email, passWord, props.history));
  },
})(Formlogin);

export default connect()(LoginCyberBugs);
