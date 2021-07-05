import { gql } from "@apollo/client";

export const getPosts = gql`
  query {
    posts {
      id
      title
      body
      author {
        id
        name
      }
    }
  }
`;
