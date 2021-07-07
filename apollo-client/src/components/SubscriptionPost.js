import { useSubscription } from "@apollo/client";
import React from "react";
import { updatePostSubscription } from "./mutations";

function UpdatedPost({ updatedPost }) {
  const { data, loading } = useSubscription(updatePostSubscription);
  React.useEffect(() => {
    updatedPost();
    return () => new AbortController().abort();
  });
  return <h4>Updated Post: {!loading && data.post && data.post.data.title}</h4>;
}

export default UpdatedPost;
