import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
type Folder {
  id:String,
  name: String,
  createAt: String
  author: Author
  notes: [Note]
}

type Note  {
  id: String,
  content: String
}

type Author {
  id: String,
  name: String,
}

type Query {
  folders: [Folder],
  folder(folderId: String): Folder,
  note(noteId:String): Note
}
`;
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
    folder: (parent, args) => {
      const folderId = args.folderId;
      return fakeData.folders.find((folder) => folder.id === folderId);
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer],
});

await server.start();

//middleware
app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
  .then(() => {
    console.log("Server ready at http://localhost:4000");
  })
  .catch((e) => console.log(e));
