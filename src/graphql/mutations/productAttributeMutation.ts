import { gql } from '@apollo/client';

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_PRODUCT_ATTRIBUTE = gql`
  mutation createProductAttribute(
    $attributeName: String!
    $attributeId: Int!
    $product: Int!
  ) {
    createProductAttribute(
      createProductAttributeInput: {
        attributeName: $attributeName
        attributeId: $attributeId
        product: $product
      }
    ) {
      id
      name
      category {
        id
        name
      }
      attributes {
        id
        attributeName
        attributeId
        values {
          id
          valueId
          valueName
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
