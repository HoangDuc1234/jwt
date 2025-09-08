import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { loginApi } from "../util/api";
import type { AxiosResponse } from "axios";
import type { AccessTokenRes } from "../util/api";
type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);
    console.log(res);
    if (res && (res as AccessTokenRes).EC === 0) {
      localStorage.setItem(
        "accessToken",
        (res as AccessTokenRes).accessToken as string
      );
      api.success({ message: "Login", description: JSON.stringify(res) });
    } else {
      api.error({ message: "Login", description: "ERROR" });
    }
    console.log("Success:", values);
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

        {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginPage;
