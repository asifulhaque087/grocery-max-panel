import { gql } from '@apollo/client';

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_ATTRIBUTE = gql`
  mutation createAttribute($name: String!) {
    createAttribute(createAttributeInput: { name: $name }) {
      id
      name
    }
  }
`;

export const REMOVE_ATTRIBUTE = gql`
  mutation removeAttribute($id: Int!) {
    removeAttribute(id: $id) {
      id
    }
  }
`;
