import { Posts } from "../../MongoSchemas";

const User = {
  // posts(parent, args, { db }, info) {
  //   return Posts.find({ author: parent.id });
  // },
  // comments(parent, args, { db }, info) {
  //   return db.comments.filter((comment) => {
  //     return comment.author === parent.id;
  //   });
  // },
};

export { User as default };
