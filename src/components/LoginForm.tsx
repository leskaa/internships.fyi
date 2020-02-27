import React, { useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const hasErrors = (fieldsError: any): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const LoginForm = (props: any): JSX.Element => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  useEffect(() => {
    props.form.validateFields();
  }, []);
  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your Username!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="Username" />)}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
