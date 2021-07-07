import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getPosts } from "./query";
import { updatePosts, updatePostSubscription } from "./mutations";
import { useHistory } from "react-router-dom";
import UpdatedPost from "./SubscriptionPost";

function PostList() {
  const history = useHistory();
  const [updatePost] = useMutation(updatePosts);
  // , {
  // update(cache, { data: { updatePost } }) {
  //   cache.modify({
  //     fields: {
  //       posts(existingPosts = []) {
  //         const newPostRef = cache.writeFragment({
  //           data: updatePost,
  //           fragment: gql`
  //             fragment updatePost on Post {
  //               id
  //               title
  //               body
  //               published
  //             }
  //           `,
  //         });
  //         return [...existingPosts, newPostRef];
  //       },
  //     },
  //   });
  // },
  // });
  const { subscribeToMore, data, loading, refetch } = useQuery(getPosts, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  React.useEffect(() => {
    refetch();
    return () => new AbortController().abort();
  }, [refetch]);

  const update_post = () => {
    updatePost({
      variables: {
        id: data.posts[0].id,
        title: window.prompt("Enter new title: "),
      },
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
      <div style={{ display: "flex" }}>
        <div style={{ flex: "30%" }}>
          {data &&
            data.posts.map(({ title, id, author }) => {
              return (
                <p key={id}>
                  {title} - {author.name}
                </p>
              );
            })}
        </div>

        <UpdatedPost
          updatedPost={() =>
            subscribeToMore({
              document: updatePostSubscription,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.post.data;
                return Object.assign({}, prev, {
                  post: {
                    posts: [newFeedItem, ...prev.posts],
                  },
                });
              },
            })
          }
        />
      </div>
    </div>
  );
}

export default PostList;
