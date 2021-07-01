import { Authors, Comments, Posts } from "../../MongoSchemas";

const Query = {
  async users(parent, args, context, info) {
    if (!args.query) {
      return Authors.find().populate("posts").populate("comments");
    } else {
      const users = await Authors.find({
        name: args.query.toLowerCase(),
      })
        .populate("posts")
        .populate("comments");
      if (users && users.length > 0) return users;
      else throw new Error("author not found");
    }
  },
  async posts(parent, args, context, info) {
    if (!args.query) {
      return Posts.find().populate("author").populate("comments");
    } else {
      const posts = await Posts.find({
        title: args.query.toLowerCase(),
      })
        .populate("author")
        .populate("comments");

      if (posts && posts.length > 0) return posts;
      else throw new Error("posts not found");
    }
  },

  comments(parent, args, { db }, info) {
    return Comments.find().populate("author").populate("post");
  },
  me() {
    return {
      id: "123098",
      name: "Mike",
      email: "mike@example.com",
    };
  },
  post() {
    return {
      id: "092",
      title: "GraphQL 101",
      body: "",
      published: false,
    };
  },
};

export { Query as default };
