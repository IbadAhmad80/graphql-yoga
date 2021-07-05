import React from "react";
import { useQuery } from "@apollo/client";
import { getPosts } from "./query";

function PostList() {
  const { loading, error, data } = useQuery(getPosts);

  console.log(loading, error, data);

  //   if (loading) {
  //     return <h1>'Loading'</h1>;
  //   } else if (error) {
  //     return <h1 style={{ color: "red" }}>'Loading'</h1>;
  //   } else {
  //     data.map((post) => {
  //       return <h3>{post.title}</h3>;
  //     });
  //   }

  return <div>PostList</div>;
}

export default PostList;
