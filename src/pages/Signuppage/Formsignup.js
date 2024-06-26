// Formsignup.js
import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { https } from "../../service/api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifiFunction } from "../../component/Notification/Notification";

const Formsignup = () => {
  const [passWord, setPassWord] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    https
      .post("/api/Users/signup", values)
      .then((res) => {
        notifiFunction("success", "Sign up successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        notifiFunction("error", "Account has been registered");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // console.log("password", passWord);
  return (
    <div className="form-signup-container">
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        className="signup-form"
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
                    if (value == "") {
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
            value=""
            rules={[
              {
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value == "") {
                      reject("Please input your password");
                    } else if (value?.length < 6 && value?.length > 0) {
                      reject("password must have at least 6 characters");
                    } else {
                      setPassWord(value);
                      return resolve();
                    }
                  });
                },
              },
            ]}
          >
            <Input.Password className="signup-password" />
          </Form.Item>
          <Form.Item
            value=""
            label="Confirm password"
            name="confirmPassword"
            rules={[
              {
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value == "") {
                      reject("Please confirm your password");
                    } else if (value?.length < 6 && value?.length > 0) {
                      reject("password must have at least 6 characters");
                    } else if (value !== passWord) {
                      reject("incorrect password");
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
            <Button htmlType="submit" className="my-button">
              Sign Up
            </Button>
          </Form.Item>
          <Link to="/login">
            <Button type="link" className="">
              Login
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Formsignup;
