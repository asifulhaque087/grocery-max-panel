
import { gql } from "@apollo/client";

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_ATTRIBUTE = gql`
  mutation createBanner($photo: String!) {
    createBanner(input: { photo: $photo }) {
      errors {
        field
        message
      }
      banner {
        id
        photo
        createdAt
      }
    }
  }
`;