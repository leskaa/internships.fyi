import React from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
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
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

function SubmitForm(): JSX.Element {
  const [createUnverifiedInternship, { loading: mutationLoading }] = useMutation(CREATE_UNVERIFIED_INTERNSHIP, {
    errorPolicy: 'all',
  });

  const onFinish = async (values: Record<string, string>): Promise<void> => {
    console.log('Received values of form: ', values);
    try {
      await createUnverifiedInternship({
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
      message.success(
        'Unverified internship has been successfully submitted! It will show up on the main page after admin approval.',
      );
    } catch (error) {
      message.error('Internship API Mutation failed');
    }
  };

  return (
    <Form {...formItemLayout} name="create-internship-form" onFinish={onFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
        <Input placeholder="SWE Intern" />
      </Form.Item>
      <Form.Item label="Company" name="company" rules={[{ required: true, message: 'Please enter the company!' }]}>
        <Input placeholder="Amazon" />
      </Form.Item>
      <Form.Item label="Year of Internship" name="year" rules={[{ required: true, message: 'Please enter the year!' }]}>
        <InputNumber placeholder="2020" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Monthly Pay" name="base" rules={[{ required: true, message: 'Please enter the base salary!' }]}>
        <InputNumber placeholder="Or (Hourly * 40 * 4)" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Monthly Housing Bonus"
        name="bonus"
        rules={[{ required: true, message: 'Please enter the housing bonus!' }]}
      >
        <InputNumber placeholder="Or (Lump Sum / Duration)" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Other Benefits" name="benefits" rules={[{ required: false }]}>
        <Input placeholder="Free Food, Etc." />
      </Form.Item>
      <Form.Item
        label="Duration in Weeks"
        name="durationInWeeks"
        rules={[{ required: true, message: 'Please enter the duration!' }]}
      >
        <InputNumber placeholder="12" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="University"
        name="university"
        rules={[{ required: true, message: 'Please enter your university!' }]}
      >
        <Input placeholder="Stanford" />
      </Form.Item>
      <Form.Item
        label="# Of Past Internships"
        name="numOfInternships"
        rules={[{ required: true, message: 'Please enter your past internships!' }]}
      >
        <InputNumber placeholder="2" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Class Standing"
        name="classStanding"
        rules={[{ required: true, message: 'Please enter your class standing!' }]}
      >
        <Select placeholder="Select a option">
          <Option value="Freshman">Freshman</Option>
          <Option value="Sophomore">Sophomore</Option>
          <Option value="Junior">Junior</Option>
          <Option value="Senior">Senior</Option>
          <Option value="Grad Student">Grad Student</Option>
        </Select>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" loading={mutationLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SubmitForm;
