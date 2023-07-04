import { gql } from "@apollo/client";

// ============================= GET ALL QUERY =================>

export const GET_PRODUCTS_BY_ADMIN = gql`
  {
    getProductsByAdmin {
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
// ============================= GET SINGLE QUERY =================>

export const GET_PRODUCT_BY_ADMIN = gql`
  query getProductByAdmin($id: ID!) {
    getProductByAdmin(id: $id) {
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

      subcategory {
        id
        name
        category {
          id
          name
        }
      }
    }
  }
`;
// ============================= GET PRODUCT DETAILS =================>

export const GET_PRODUCT_DETAILS = gql`
  query getProductDetails($id: ID!) {
    getProductDetails(id: $id) {
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
`;
// ============================= GET  SUBCATEGORY TO PRODUCT QUERY =================>

export const GET_CAT_PRO = gql`
  query get_category_and_product_by_category($categoryId: ID!) {
    get_category_and_product_by_category(categoryId: $categoryId) {
      products {
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
      }
      categories {
        id
        name
        photo
        parentId
      }
    }
  }
`;
// ============================= GET  BEST SELLING QUERY =================>

export const GET_BEST_SELLING_PRODUCTS = gql`
  {
    getBestSellingProducts {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      persentage
      totalSell
      createdAt
    }
  }
`;
// ============================= GET  NEW ARRIVAL QUERY =================>

export const GET_NEW_ARRIVAL_PRODUCTS = gql`
  {
    getBestNewArrivalProducts {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      persentage
      totalSell
      createdAt
    }
  }
`;
// ============================= GET  MOST DISCOUNT QUERY =================>

export const GET_MOST_DISCOUNT_PRODUCTS = gql`
  {
    getMostDiscountProducts {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      persentage
      totalSell
      createdAt
    }
  }
`;

// ============================= GET  SUBCATEGORY TO PRODUCT QUERY =================>

export const GET_KEYWORD_PRODUCTS = gql`
  query getKeywordProducts($keyword: String!) {
    getKeywordProducts(keyword: $keyword) {
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
    }
  }
`;
