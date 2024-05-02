import fakeData from "../fakeData/index.js";
import { NoteModel, FolderModel, AuthorModel } from "../models/index.js";

export const resolvers = {
  Query: {
    folders: async () => {
      const folders = await FolderModel.find();
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({
        id: folderId,
      });
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const foundNote = await NoteModel.find({
        id: folderId,
      });
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
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: "111" });

      await newFolder.save();
      return newFolder;
    },
  },
};
