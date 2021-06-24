import mongoose from "mongoose";

const AuthorsSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: [true, "author name cant be null"],
  },
  email: {
    type: String,
    required: [true, "author email cant be null field"],
  },
  age: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

module.exports = mongoose.model("Authors", AuthorsSchema);

// return new Promise( (resolve, reject) => {
//     People.findOneAndDelete(args.id, function(err, result){
//         if (err) return err;
//         resolve(result)
//     })
// })
// }
