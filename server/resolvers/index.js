import fakeData from "../fakeData/index.js";
import { NoteModel, FolderModel, AuthorModel } from "../models/index.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({ authorId: context.uid });
      // console.log(context);
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne(folderId);
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.find(noteId);
      return note;
    },
  },
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      const notes = await NoteModel.find({
        folderId: parent.id,
      });
      return notes;
    },
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      console.log({ newFolder });
      // pubsub.publish("FOLDER_CREATED", {
      //   folderCreated: {
      //     message: "A new folder created",
      //   },
      // });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = new AuthorModel.findOne({ uid: args.uid });

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    },
  },
};
