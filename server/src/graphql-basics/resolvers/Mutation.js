import uuidv4 from "uuid/v4";
import { Authors, Comments, Posts } from "../../MongoSchemas";

const Mutation = {
  async createUser(_, { data: { name, email, age } }, context, info) {
    const emailCheck = await Authors.findOne({ email: email });
    if (!emailCheck) {
      name = name.toLowerCase();
      if (age) return new Authors({ name, email, age }).save();
      else return new Authors({ name, email }).save();
    } else {
      throw new Error("Email already exist");
    }
  },
  async deleteUser(parent, { id }, context, info) {
    const user = await Authors.deleteOne({ _id: id });

    if (!user) {
      throw new Error("User not found");
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }

      return !match;
    });
    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deletedUsers[0];
  },
  async updateUser(parent, { id, data }, context, info) {
    const user = await Authors.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    } else {
      if (typeof data.email === "string") {
        //checking if email already does not exist
        const emailCheck = await Authors.findOne({ email: data.email });
        if (emailCheck) {
          throw new Error("Email taken");
        }
        //updating email if it is not already taken
        await Authors.updateOne({ _id: id }, { $set: { email: data.email } });
      }
      //updating name
      typeof data.name === "string" &&
        (await Authors.updateOne({ _id: id }, { $set: { name: data.name } }));
      //updating age
      typeof data.age !== "undefined" &&
        (await Authors.updateOne({ _id: id }, { $set: { age: data.age } }));
      return Authors.findOne({ _id: id });
    }
  },
  async createPost(
    parent,
    { data: { title, body, published, author } },
    { pubsub },
    info
  ) {
    let posts;

    const user = await Authors.findOne({ _id: author });
    if (!user) {
      throw new Error("Author not found");
    } else {
      title = title.toLowerCase();
      posts = new Posts({ title, body, published, author });
      await posts.save();
      await Authors.updateOne({ _id: author }, { $push: { posts: posts } });
    }

    pubsub.publish("post", {
      post: {
        mutation: "CREATED",
        data: posts,
      },
    });
    return posts;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: post,
        },
      });
    }

    return post;
  },
  async updatePost(parent, { id, data }, { pubsub }, info) {
    const post = await Posts.findOne({ _id: id });
    if (!post) {
      throw new Error("Post not found");
    } else {
      //updating title of the post
      typeof data.title === "string" &&
        (await Posts.updateOne({ _id: id }, { $set: { title: data.title } }));

      //updating body of post
      typeof data.body === "string" &&
        (await Posts.updateOne({ _id: id }, { $set: { body: data.body } }));
      //updating published status
      typeof data.published === "boolean" &&
        (await Posts.updateOne(
          { _id: id },
          { $set: { published: data.published } }
        ));
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: Posts.findOne({ _id: id }),
        },
      });
      return Posts.findOne({ _id: id });

      //   if (originalPost.published && !post.published) {
      //     pubsub.publish("post", {
      //       post: {
      //         mutation: "DELETED",
      //         data: originalPost,
      //       },
      //     });
      //   } else if (!originalPost.published && post.published) {
      //     pubsub.publish("post", {
      //       post: {
      //         mutation: "CREATED",
      //         data: post,
      //       },
      //     });
      //   }
      // } else if (post.published) {
      //   pubsub.publish("post", {
      //     post: {
      //       mutation: "UPDATED",
      //       data: post,
      //     },
      //   });
    }
  },
  async createComment(parent, { data: { author, post, text } }, context, info) {
    const user = await Authors.findOne({ _id: author });
    const found_post = await Posts.findOne({ _id: post });
    if (!user || !found_post) {
      throw new Error("Unable to find user or post");
    } else {
      text = text.toLowerCase();
      let comment = new Comments({ text, author, post });
      await comment.save();
      await Posts.updateOne({ _id: post }, { $push: { comments: comment } });
      await Authors.updateOne(
        { _id: author },
        { $push: { comments: comment } }
      );

      return comment;
    }

    // pubsub.publish(`comment ${args.data.post}`, {
    //   comment: {
    //     mutation: "CREATED",
    //     data: comment,
    //   },
    // });
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment,
      },
    });

    return deletedComment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: comment,
      },
    });

    return comment;
  },
};

export { Mutation as default };
