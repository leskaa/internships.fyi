import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
const { Option } = Select;

const CREATE_UNVERIFIED_INTERNSHIP = gql`
  mutation CreateUnverifiedInternship($internship: InternshipInput!) {
    createUnverifiedInternship(options: $internship) {
      _id
    }
  }
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

type LoginFormProps = FormComponentProps;

function SubmitFormImpl(props: LoginFormProps): JSX.Element {
  const { form } = props;
  const { getFieldDecorator } = form;

  const [createInternship] = useMutation(CREATE_UNVERIFIED_INTERNSHIP);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        createInternship({
          variables: {
            internship: {
              title: values.title,
              company: values.company,
              compensation: {
                base: +values.base,
                bonus: +values.bonus,
                benefits: values.benefits,
              },
              student: {
                university: values.university,
                numOfInternships: +values.numOfInternships,
                classStanding: values.classStanding,
              },
              year: +values.year,
              durationInWeeks: +values.durationInWeeks,
            },
          },
        });
      }
    });
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="Title">
        {getFieldDecorator('title', {
          rules: [{ required: true, message: 'Please enter the title!' }],
        })(<Input placeholder="SWE Intern" />)}
      </Form.Item>
      <Form.Item label="Company">
        {getFieldDecorator('company', {
          rules: [{ required: true, message: 'Please enter the company!' }],
        })(<Input placeholder="Amazon" />)}
      </Form.Item>
      <Form.Item label="Year of Internship">
        {getFieldDecorator('year', {
          rules: [{ required: true, message: 'Please enter the year!' }],
        })(<Input placeholder="2020" />)}
      </Form.Item>
      <Form.Item label="Monthly Pay">
        {getFieldDecorator('base', {
          rules: [{ required: true, message: 'Please enter the base salary!' }],
        })(<Input placeholder="Or (Hourly * 40 * 4)" />)}
      </Form.Item>
      <Form.Item label="Monthly Housing Bonus">
        {getFieldDecorator('bonus', {
          rules: [{ required: true, message: 'Please enter the housing bonus!' }],
        })(<Input placeholder="Or (Lump Sum / Duration)" />)}
      </Form.Item>
      <Form.Item label="Other Benefits">
        {getFieldDecorator('benefits', {
          rules: [{ required: false }],
        })(<Input placeholder="Free Food, Etc." />)}
      </Form.Item>
      <Form.Item label="Duration in Weeks">
        {getFieldDecorator('durationInWeeks', {
          rules: [{ required: true, message: 'Please enter the duration!' }],
        })(<Input placeholder="12" />)}
      </Form.Item>
      <Form.Item label="University">
        {getFieldDecorator('university', {
          rules: [{ required: true, message: 'Please enter your university!' }],
        })(<Input placeholder="Stanford" />)}
      </Form.Item>
      <Form.Item label="# Of Past Internships">
        {getFieldDecorator('numOfInternships', {
          rules: [{ required: true, message: 'Please enter your past internships!' }],
        })(<Input placeholder="2" />)}
      </Form.Item>
      <Form.Item label="Class Standing">
        {getFieldDecorator('classStanding', {
          rules: [{ required: true, message: 'Please select your class standing!' }],
        })(
          <Select placeholder="Select a option">
            <Option value="Freshman">Freshman</Option>
            <Option value="Sophomore">Sophomore</Option>
            <Option value="Junior">Junior</Option>
            <Option value="Senior">Senior</Option>
            <Option value="Grad Student">Grad Student</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export const SubmitForm = Form.create()(SubmitFormImpl);
