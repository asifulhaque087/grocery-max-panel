import { gql } from '@apollo/client';

export const FIND_CACHE_BY_PRODUCT_ID = gql`
  query findCacheByProductId($productId: Int!) {
    findCacheByProductId(productId: $productId) {
      id
      name
      slug
      description
      categoryName
      previewing
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
        sku
        price
        avilableStock
        stocks {
          id
          totalStock
          unitPrice
          totalPrice
        }
      }
    }
  }
`;
