import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Table, Modal, Button } from 'antd';

import InternshipModalContent from './InternshipModalContent';
import { TableEventListeners } from 'antd/lib/table/interface';

interface Internship {
  _id: string;
  company: string;
  year: number;
  title: string;
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

interface Column {
  key: string;
  company: string;
  year: number;
  title: string;
  base: number;
  bonus: number;
  benefits: string;
}

const INTERNSHIPS_TABLE_QUERY = gql`
  query getInternshipsForTable {
    internships {
      _id
      company
      year
      title
      compensation {
        base
        bonus
        benefits
      }
    }
  }
`;

const ViewInternshipsPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

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
        year: internship.year,
        title: internship.title,
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
      sorter: (a: Column, b: Column): number => {
        return a.company.localeCompare(b.company);
      },
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a: Column, b: Column): number => {
        return b.year - a.year;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: Column, b: Column): number => {
        return a.title.localeCompare(b.title);
      },
    },
    {
      title: 'Monthly Salary',
      dataIndex: 'base',
      key: 'base',
      sorter: (a: Column, b: Column): number => {
        return b.base - a.base;
      },
    },
    {
      title: 'Housing Stipend',
      dataIndex: 'bonus',
      key: 'bonus',
      sorter: (a: Column, b: Column): number => {
        return b.bonus - a.bonus;
      },
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
              setSelectedCompany(record.company + ' - ' + record.title);
            },
          };
        }}
      />
      <Modal
        title={selectedCompany}
        visible={modalVisible}
        onOk={(): void => {
          setModalVisible(false);
        }}
        onCancel={(): void => {
          setModalVisible(false);
        }}
        footer={[
          <Button
            key="back"
            type="primary"
            loading={loading}
            onClick={(): void => {
              setModalVisible(false);
            }}
          >
            Back
          </Button>,
        ]}
      >
        <InternshipModalContent id={selectedId}></InternshipModalContent>
      </Modal>
    </div>
  );
};

export default ViewInternshipsPage;
