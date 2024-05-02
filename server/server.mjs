import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from "dotenv";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schema/index.js";
dotenv.config();
import mongoose from "mongoose";
import "./firebaseConfig.js";

const app = express();
const httpServer = http.createServer(app);

const URL = process.env.MONGO;
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer],
});

await server.start();

//middleware
app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose
  .connect(URL)
  .then(async () => {
    console.log("connect successfully");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
      .then(() => {
        console.log("Server ready at http://localhost:4000");
      })
      .catch((e) => console.log(e));
  })
  .catch((e) => console.log("connect fail from", e.message));
