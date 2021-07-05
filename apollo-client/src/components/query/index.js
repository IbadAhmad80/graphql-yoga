import { gql } from "@apollo/client";

export const getPosts = gql`
  query {
    posts {
      title
      body
      author {
        id
        name
      }
    }
  }
`;
