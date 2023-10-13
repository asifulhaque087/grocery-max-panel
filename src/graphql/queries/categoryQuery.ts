import { gql } from '@apollo/client';

// ============================= GET CATEGORIES QUERY =================>

export const GET_CATEGORIES = gql`
  {
    categories {
      id
      name
      icon
      coverImage
      parentId
    }
  }
`;
// ============================= GET CATEGORIES By Admin=================>

export const GET_CATEGORIES_BY_ADMIN = gql`
  {
    getCategoriesByAdmin {
      errors {
        field
        message
      }
      category {
        id
        name
        photo
        parentId
        createdAt
      }
    }
  }
`;
// ============================= GET CATEGORY QUERY =================>

export const GET_CATEGORY = gql`
  query getCategory($id: Int!) {
    category(id: $id) {
      id
      name
      icon
      coverImage
      parentId
    }
  }
`;
