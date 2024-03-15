// Formsignup.js
import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { https } from "../../service/api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifiFunction } from "../../component/Notification/Notification";

const Formsignup = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    https
      .post("/api/Users/signup", values)
      .then((res) => {
        notifiFunction("success", "Sign up successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          background: "white",
          borderRadius: "25px",
          padding: "30px",
          width: "50%",
          boxShadow: "2px 3px 34px -8px rgba(0,0,0,0.78)",
          alignItems: "center",
          textAlign: "center",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="title">Sign Up</div>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    const re =
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    const isValid = re.test(value);
                    if (value.trim() == "") {
                      reject("please input your email");
                    } else if (isValid) {
                      return resolve();
                    } else {
                      reject("email invalid");
                    }
                  });
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="passWord"
            rules={[
              {
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value.trim() == "") {
                      reject("Please input your password");
                    } else if (value.length < 6 && value.length > 0) {
                      reject("password must have at least 6 characters");
                    } else {
                      return resolve();
                    }
                  });
                },
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
          <Link to="/login">
            <Button type="link">Login</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Formsignup;
