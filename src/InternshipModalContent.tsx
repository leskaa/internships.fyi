import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Descriptions } from 'antd';

interface Props {
  id: string | null;
}

interface Internship {
  title: string;
  company: string;
  compensation: Compensation;
  student: Student;
  year: number;
  durationInWeeks: number;
}

interface Compensation {
  base: number;
  bonus: number;
  benefits: string;
}

interface Student {
  university: string;
  numOfInternships: number;
  classStanding: string;
}

interface InternshipData {
  internship: Internship;
}

interface InternshipVars {
  id: string;
}

const INTERNSHIP_MODAL_QUERY = gql`
  query getInternshipForModal($id: String!) {
    internship(id: $id) {
      title
      company
      compensation {
        base
        bonus
        benefits
      }
      student {
        university
        numOfInternships
        classStanding
      }
      year
      durationInWeeks
    }
  }
`;

const InternshipModalContent: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery<InternshipData, InternshipVars>(INTERNSHIP_MODAL_QUERY, {
    variables: { id: id ? id : '' },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <Descriptions title="General Info" size="small" bordered>
        <Descriptions.Item label="Title">{data && data.internship.title}</Descriptions.Item>
        <Descriptions.Item label="Company" span={2}>
          {data && data.internship.company}
        </Descriptions.Item>
        <Descriptions.Item label="Year">{data && data.internship.year}</Descriptions.Item>
        <Descriptions.Item label="Length in weeks">{data && data.internship.durationInWeeks}</Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions title="Compensation" size="small" bordered>
        <Descriptions.Item label="Hourly Pay">{data && data.internship.compensation.base / 160}</Descriptions.Item>
        <Descriptions.Item label="Monthly Salary" span={2}>
          {data && data.internship.compensation.base}
        </Descriptions.Item>
        <Descriptions.Item label="Monthly Housing Bonus" span={3}>
          {data && data.internship.compensation.bonus}
        </Descriptions.Item>
        <Descriptions.Item label="Additional Benefits" span={3}>
          {data && data.internship.compensation.benefits}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions title="Student Info" size="small" bordered>
        <Descriptions.Item label="University">{data && data.internship.student.university}</Descriptions.Item>
        <Descriptions.Item label="Class Standing" span={2}>
          {data && data.internship.student.classStanding}
        </Descriptions.Item>
        <Descriptions.Item label="Prior Internships" span={3}>
          {data && data.internship.student.numOfInternships}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default InternshipModalContent;
