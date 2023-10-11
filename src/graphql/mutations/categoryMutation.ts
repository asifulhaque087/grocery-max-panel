import { gql } from '@apollo/client';

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_CATEGORY = gql`
  mutation createCategory(
    $name: String!
    $icon: String!
    $coverImage: String
    $parentId: Int
  ) {
    createCategory(
      createCategoryInput: {
        name: $name
        icon: $icon
        coverImage: $coverImage
        parentId: $parentId
      }
    ) {
      id
      name
      icon
      parentId
    }
  }
`;
// ============================= DELETE CATEGORY MUTATION =================>
export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      errors {
        field
        message
      }
      category {
        id
      }
    }
  }
`;
// ============================= UPDATE CATEGORY MUTATION =================>
export const UPDATE_CATEGORY = gql`
  mutation updateCategory(
    $id: ID!
    $name: String!
    $photo: String!
    $parentId: ID!
  ) {
    updateCategory(
      input: { id: $id, name: $name, photo: $photo, parentId: $parentId }
    ) {
      errors {
        field
        message
      }
      category {
        id
        name
        photo
        createdAt
      }
    }
  }
`;
