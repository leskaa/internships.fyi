import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Table, Modal } from 'antd';

import InternshipModalContent from './InternshipModalContent';
import { TableEventListeners } from 'antd/lib/table/interface';

interface Internship {
  _id: string;
  company: string;
  compensation: Compensation;
}

interface Compensation {
  base: number;
  bonus: number;
  benefits: string;
}

interface InternshipData {
  internships: Internship[];
}

const INTERNSHIPS_TABLE_QUERY = gql`
  query getInternshipsForTable {
    internships {
      _id
      company
      compensation {
        base
        bonus
        benefits
      }
    }
  }
`;

const INTERNSHIP_MODAL_QUERY = gql`
  query getInternshipForModal($id: String!) {
    internship(id: $id) {
      _id
      title
      company
    }
  }
`;

const ViewInternshipsPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { loading, error, data } = useQuery<InternshipData>(INTERNSHIPS_TABLE_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const dataSource =
    data &&
    data.internships.map(internship => {
      return {
        key: internship._id,
        company: internship.company,
        base: internship.compensation.base,
        bonus: internship.compensation.bonus,
        benefits: internship.compensation.benefits,
      };
    });

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Monthly Salary',
      dataIndex: 'base',
      key: 'base',
    },
    {
      title: 'Housing Stipend',
      dataIndex: 'bonus',
      key: 'bonus',
    },
    {
      title: 'Other Benefits',
      dataIndex: 'benefits',
      key: 'benefits',
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        onRow={(record): TableEventListeners => {
          return {
            onClick: (): void => {
              setModalVisible(true);
              setSelectedId(record.key);
            },
          };
        }}
      />
      <Modal
        title="Basic Modal"
        visible={modalVisible}
        onOk={(): void => {
          setModalVisible(false);
        }}
        onCancel={(): void => {
          setModalVisible(false);
        }}
      >
        <InternshipModalContent id={selectedId}></InternshipModalContent>
      </Modal>
    </div>
  );
};

export default ViewInternshipsPage;
