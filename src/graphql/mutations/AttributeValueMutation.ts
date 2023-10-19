import { gql } from '@apollo/client';

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_ATTRIBUTE_VALUE = gql`
  mutation createAttributeValue($attribute: Int!, $name: String!) {
    createAttributeValue(
      createAttributeValueInput: { attribute: $attribute, name: $name }
    ) {
      id
    }
  }
`;

export const UPDATE_ATTRIBUTE_VALUE = gql`
  mutation updateAttribute($id: Int!, $name: String!) {
    updateAttribute(updateAttributeInput: { id: $id, name: $name }) {
      id
      name
    }
  }
`;

export const REMOVE_ATTRIBUTE_VALUE = gql`
  mutation removeAttributeValue($id: Int!) {
    removeAttributeValue(id: $id) {
      id
    }
  }
`;
