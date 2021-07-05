import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getPosts } from "./query";
import { updatePosts } from "./mutations";
import { useHistory } from "react-router-dom";

function PostList() {
  const history = useHistory();
  const [updatePost] = useMutation(updatePosts);
  const { data, loading, refetch } = useQuery(getPosts, {
    fetchPolicy: "cache-and-network",
  });

  const update_post = () => {
    updatePost({
      variables: { id: data.posts[0].id, title: "update posts again" },
    }).then((_) => {
      refetch();
    });
  };

  return (
    <div>
      {loading && !data && <h1>Loading ... </h1>}
      {loading && data && <h1>Refetching ... </h1>}
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push({
            pathname: "./post-creation",
            author: data.posts[0].author.id,
          });
        }}
      >
        Create Post
      </button>
      <button onClick={update_post} style={{ display: "block" }}>
        Update Post
      </button>

      {data &&
        data.posts.map(({ title, id, author }) => {
          return (
            <p key={id}>
              {title} - {author.name}
            </p>
          );
        })}
    </div>
  );
}

export default PostList;
