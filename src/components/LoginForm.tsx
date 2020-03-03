import React from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

interface ValidateErrorEntity {
  values: Record<string, string>;
  errorFields: {
    name: (string | number)[];
    errors: string[];
  }[];
  outOfDate: boolean;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const LOGIN_MUTATION = gql`
  mutation Login($authInput: AuthInput!) {
    login(input: $authInput) {
      user {
        email
      }
    }
  }
`;

const LoginForm = (): JSX.Element => {
  const [login, { loading: mutationLoading }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: 'all',
  });

  const onFinish = async (values: Record<string, string>): Promise<void> => {
    try {
      const result = await login({
        variables: {
          authInput: {
            email: values.email,
            password: values.password,
          },
        },
      });
      if (!result.data.login.user) {
        message.warning('Login Failed!');
      } else {
        message.success('Logged In!');
      }
    } catch (error) {
      message.error('Internship API Login Mutation failed');
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity): void => {
    console.log(errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={mutationLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
