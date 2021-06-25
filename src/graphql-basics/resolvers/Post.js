import { Authors } from "../../MongoSchemas";

const Post = {
  // author(parent, args, { db }, info) {
  //   return Authors.findOne({ _id: parent.author });
  // },
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post as default };
