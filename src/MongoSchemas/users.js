import { mongoose, Schema } from "mongoose";

const UsersSchema = mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  name: {
    email: String,
    require: true,
  },
  age: Int,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  posts: [
    {
      typr: Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

module.exports = mongoose.model("Users", UsersSchema);

// return new Promise( (resolve, reject) => {
//     People.findOneAndDelete(args.id, function(err, result){
//         if (err) return err;
//         resolve(result)
//     })
// })
// }
