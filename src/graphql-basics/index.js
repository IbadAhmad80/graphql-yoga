import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
const mongoose = require("mongoose");

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/graphql-basics/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log("The server is up!");
});

//Connecting to the database
mongoose.connect(
  "mongodb+srv://ibad:flourida123@cluster0.02mci.mongodb.net/graphql-yoga?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Up and running with mongoDB");
  }
);
