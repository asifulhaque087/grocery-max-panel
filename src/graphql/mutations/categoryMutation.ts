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
      coverImage
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
    $id: Int!
    $name: String
    $icon: String
    $coverImage: String
    $parentId: Int
  ) {
    updateCategory(
      updateCategoryInput: {
        id: $id
        name: $name
        icon: $icon
        coverImage: $coverImage
        parentId: $parentId
      }
    ) {
      id
      name
      icon
      coverImage
      parentId
    }
  }
`;
