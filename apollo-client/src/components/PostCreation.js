import React from "react";
import { useMutation } from "@apollo/client";
import { addPost } from "./mutations";
import { Link, useHistory, useLocation } from "react-router-dom";

function PostCreation() {
  const history = useHistory();
  const [createPost] = useMutation(addPost);
  const [data, setData] = React.useState({
    title: "",
    body: "",
    published: null,
    author: useLocation().author,
  });

  const handlePost = (e) => {
    e.preventDefault();
    const { title, body, author } = data;
    createPost({
      variables: { title, body, published: true, author },
    }).then((resolver) => {
      setData({ title: "", body: "", author: null, published: null });
      history.push("./");
    });
  };
  return (
    <div>
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="  post title"
          required
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <input
          style={{ display: "block" }}
          placeholder="  post body"
          type="text"
          required
          value={data.body}
          onChange={(e) => setData({ ...data, body: e.target.value })}
        />

        <button type="submit">Create</button>
      </form>
      <Link to="/">
        <button>See Posts</button>
      </Link>
    </div>
  );
}

export default PostCreation;
