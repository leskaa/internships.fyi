import React from 'react';
import { Form } from 'antd';
import LoginForm from '../components/LoginForm';

const AdminTool: React.FC = () => {
  const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);
  return (
    <div className="page-content admin-tool-page">
      <WrappedLoginForm />
    </div>
  );
};

export default AdminTool;
