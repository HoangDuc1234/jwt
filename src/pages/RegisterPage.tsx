import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { createUserApi } from "../util/api";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, email, password } = values;
    const res = await createUserApi(username, email, password);
    if (res) {
      api.success({ message: "Create User", description: "SUCCESS" });
      navigate("/login");
    } else {
      api.error({ message: "Create User", description: "ERROR" });
    }
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterPage;
