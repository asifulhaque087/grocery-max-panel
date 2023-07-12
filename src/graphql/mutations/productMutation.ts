import { gql } from '@apollo/client';

// ============================= CREATE  MUTATION =================>
export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $photo: String!
    $description: String
    $price: String
    $discountPrice: String
    $qty: String
    $unit: String
    $stock: String
    $category: ID
  ) {
    createProduct(
      input: {
        name: $name
        photo: $photo
        description: $description
        price: $price
        discountPrice: $discountPrice
        qty: $qty
        unit: $unit
        stock: $stock
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
