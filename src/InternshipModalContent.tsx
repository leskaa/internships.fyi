import React from 'react';

// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';

interface Props {
  id: string | null;
}

const InternshipModalContent: React.FC<Props> = ({ id }) => {
  return <div>{id}</div>;
};

export default InternshipModalContent;
