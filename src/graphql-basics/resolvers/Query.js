import { Authors, Comments, Posts } from "../../MongoSchemas";

const Query = {
  async users(parent, args, context, info) {
    if (!args.query) {
      return Authors.find().populate("posts");
    } else {
      const users = await Authors.find({
        name: args.query.toLowerCase(),
      }).populate("Posts");
      if (users && users.length > 0) return users;
      else throw new Error("author not found");
    }
  },
  async posts(parent, args, context, info) {
    if (!args.query) {
      return Posts.find({}).populate("author");
    } else {
      const posts = await Posts.find({
        title: args.query.toLowerCase(),
      }).populate("Authors");
      if (posts && posts.length > 0) return posts;
      else throw new Error("posts not found");
    }
  },

  comments(parent, args, { db }, info) {
    return db.comments;
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
