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
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: "50%" }}>
          {/* Phần hiển thị hình ảnh */}
          <img
            src="/HinhNenLogin.png"
            alt="Login Image"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div style={{ width: "50%" }}>
          {/* Phần hiển thị form đăng nhập */}
          <div style={{ width: "50%", margin: "0 auto" }}>
            <h3 style={{ color: "#1890ff", marginBottom: "30px" }}></h3>
            <Input
              onChange={handleChange}
              value={values.email}
              size="large"
              name="email"
              placeholder="Email"
              prefix={<UserOutlined />}
              style={{ marginBottom: "20px" }}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Input
              type="password"
              onChange={handleChange}
              value={values.passWord}
              size="large"
              name="passWord"
              placeholder="Password"
              prefix={<LockOutlined />}
              style={{ marginBottom: "20px" }}
            />
            {errors.passWord && touched.passWord ? (
              <div>{errors.passWord}</div>
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
              <Button
                className="bg-primary"
                type="primary"
                shape="circle"
                icon={<GoogleOutlined />}
                size={"large"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const LoginCyberBugs = withFormik({
  mapPropsToValues: () => ({ email: "", passWord: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    passWord: Yup.string()
      .min(6, "Password must have at least 6 characters")
      .max(32, "Password must have at most 32 characters"),
  }),
  handleSubmit: ({ email, passWord }, { props, setSubmitting }) => {
    props.dispatch(signinCyberbugAction(email, passWord, props.history));
  },
})(Formlogin);

export default connect()(LoginCyberBugs);
