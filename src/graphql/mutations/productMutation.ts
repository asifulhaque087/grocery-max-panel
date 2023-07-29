import { gql } from '@apollo/client';

// ============================= CREATE  MUTATION =================>
export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $slug: String!
    $description: String
    $category: Int
  ) {
    createProduct(
      createProductInput: {
        name: $name
        slug: $slug
        description: $description
        category: $category
      }
    ) {
      id
      name
      slug
      description
      category {
        id
        name
      }
    }
  }
`;
// ============================= DELETE  MUTATION =================>
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      errors {
        field
        message
      }
      product {
        id
      }
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $photo: String!
    $description: String
    $stock: String
    $qty: String
    $unit: String
    $price: String
    $discountPrice: String
    $category: ID
  ) {
    updateProduct(
      input: {
        id: $id
        name: $name
        photo: $photo
        description: $description
        stock: $stock
        qty: $qty
        unit: $unit
        price: $price
        discountPrice: $discountPrice
        category: $category
      }
    ) {
      errors {
        field
        message
      }
      product {
        id
        name
        photo
        description
        stock
        qty
        unit
        price
        discountPrice
        totalSell
        createdAt
        category {
          id
          name
        }
      }
    }
  }
`;
