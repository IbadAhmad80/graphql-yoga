import mongoose from "mongoose";

const PostsSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  title: {
    type: String,
    required: [true, "post title cant be null field"],
  },
  body: {
    type: String,
    required: [true, "post body cant be null field"],
  },
  published: {
    type: Boolean,
    required: [true, "post published cant be null fiel"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authors",
    required: [true, "post author cant be null field"],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

module.exports = mongoose.model("Posts", PostsSchema);
