import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  text: {
    type: String,
    required: [true, "comments text cant be null field"],
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authors",
    required: [true, "comment author cant be null field"],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: [true, "comments posts cant be null field"],
  },
});

module.exports = mongoose.model("Comments", CommentsSchema);
