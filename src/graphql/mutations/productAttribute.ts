import { gql } from '@apollo/client';

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_PRODUCT_ATTRIBUTE = gql`
  mutation createProductAttribute(
    $name: String!
    $product: Int!
    $attributeId: Int!
  ) {
    createProductAttribute(
      createProductAttributeInput: {
        name: $name
        product: $product
        attributeId: $attributeId
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
      attributes {
        id
        attributeId
        name
        values {
          id
          name
          images {
            id
            isFeatured
            gallery {
              id
              url
            }
          }
        }
      }
    }
  }
`;
