import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    posts {
      id
      title
      published_at
      body
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password: $password
      }
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { identifier: $username, password: $password }) {
      jwt
      user {
        id
        username
      }
    }
  }
`;
