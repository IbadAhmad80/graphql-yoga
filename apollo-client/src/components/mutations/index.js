import { gql } from "@apollo/client";

export const addPost = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $published: Boolean!
    $author: ID!
  ) {
    createPost(
      data: {
        title: $title
        body: $body
        published: $published
        author: $author
      }
    ) {
      id
      title
      body
    }
  }
`;

export const updatePosts = gql`
  mutation updatePost(
    $title: String
    $body: String
    $published: Boolean
    $id: ID!
  ) {
    updatePost(
      id: $id
      data: { title: $title, body: $body, published: $published }
    ) {
      id
      title
      body
      published
    }
  }
`;

export const updatePostSubscription = gql`
  subscription onUpdatedPost {
    post {
      mutation
      data {
        id
        title
        body
        published
      }
    }
  }
`;
