import axios from "axios";
import qs from "qs";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./style.css";

interface FormFields {
  password: string;
}

const LoginForm = (props: any) => {
  const [isLogin, setIsLogin] = useState(false);

  const onFinish = (values: any) => {
    axios
      .post("api/login", qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data?.data) {
          setIsLogin(true);
        } else {
          message.error(res.data.errMsg);
        }
      });
  };

  return isLogin ? (
    <Redirect to="/" />
  ) : (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
