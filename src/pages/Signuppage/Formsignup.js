// Formsignup.js
import React from "react";
import { Button, Form, Input } from "antd";
import { https } from "../../service/api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Formsignup = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    https
      .post("/api/Users/signup", values)
      .then((res) => {
        alert("congrate");
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
                required: true,
                message: "Please input your email!",
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
                required: true,
                message: "Please input your password!",
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
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
          <Link to="/login">
            {" "}
            {/* Link to Login page */}
            <Button type="link">Login</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Formsignup;
