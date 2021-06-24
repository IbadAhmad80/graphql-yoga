import { mongoose, Schema } from "mongoose";

const PostsSchema = mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    email: String,
    require: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  comments: [
    {
      typr: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

module.exports = mongoose.model("Posts", PostsSchema);
