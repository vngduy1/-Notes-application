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
import { getAuth } from "firebase-admin/auth";

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

const authorizationJWT = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    console.log({ authorization: req.headers.authorization });
    const accessToken = authorizationHeader.split(" ")[1];

    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        console.log({ decodedToken });
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((e) => {
        console.log(e);
        return res.status(403).json({ message: "Forbidden", error: e });
      });
  } else {
    // return res.status(401).json({ message: "Unauthorized" });
    next();
  }
};

//middleware
app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);

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
