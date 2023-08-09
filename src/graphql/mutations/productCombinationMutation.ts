import { gql } from '@apollo/client';

// ============================= LOGIN MUTATION =================>
export const CREATE_PRODUCT_COMBINATION = gql`
  mutation createProductCombination(
    $combinationString: String!
    $uniqueStringId: String!
    $sku: String!
    $price: Int!
    $avilableStock: Int!
    $productId: Int!
  ) {
    createProductCombination(
      createProductCombinationInput: {
        combinationString: $combinationString
        uniqueStringId: $uniqueStringId
        price: $price
        sku: $sku
        avilableStock: $avilableStock
        product: $productId
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
      combinations {
        id
        combinationString
        uniqueStringId
        sku
        price
        avilableStock
      }
    }
  }
`;
