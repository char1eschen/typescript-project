import request from "../../request";
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
    request
      .post("api/login", qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        const data: responseResult.login = res.data;
        console.log(res);
        if (data) {
          setIsLogin(true);
        } else {
          message.error("login failed");
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
