import React from 'react'
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  if (loading) return "data not fetched yet";
  if (error) {
    console.log('error', error);
    return `Error! ${error.message}`;
  }

  return data.posts.map((post) => (
    <div key={post.id}>
      <ul>
        <li>{post.title}</li>
        <li>{post.published_at} </li>
        <li>{post.body} </li>
      </ul>
    </div>
  ));
}
