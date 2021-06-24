import { mongoose, Schema } from "mongoose";

const CommentsSchema = mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    require: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  posts: {
    typr: Schema.Types.ObjectId,
    ref: "Posts",
  },
});

module.exports = mongoose.model("Comments", CommentsSchema);
