import { gql } from '@apollo/client';

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_PRODUCT_ATTRIBUTE_VALUE_WITH_IMAGES = gql`
  mutation createProductAttributeValueWithImages(
    $valueName: String!
    $valueId: Int!
    $attribute: Int!
    $productId: Int!
    $images: [Urls!]!
  ) {
    createProductAttributeValueWithImages(
      createProductAttributeValueWithImagesInput: {
        valueName: $valueName
        valueId: $valueId
        attribute: $attribute
        productId: $productId
        images: $images
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
