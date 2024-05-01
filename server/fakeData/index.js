export default {
  authors: [
    {
      id: 123,
      name: "DVN",
    },
    {
      id: 999,
      name: "test",
    },
  ],
  folders: [
    {
      id: "1",
      name: "Home",
      createAt: "2024-4-30T03:42:132",
      authorId: 1,
    },
    {
      id: "2",
      name: "New",
      createAt: "2024-3-30T03:42:132",
      authorId: 999,
    },
    {
      id: "3",
      name: "Work",
      createAt: "2024-2-30T03:42:132",
      authorId: 123,
    },
  ],
  notes: [
    {
      id: "123",
      content: "<p>Go to supermarket </p>",
      folderId: "1",
    },
    {
      id: "1232",
      content: "<p>Go to supermarket2 </p>",
      folderId: "2",
    },
    {
      id: "1231",
      content: "<p>Go to supermarket 3</p>",
      folderId: "1",
    },
  ],
};
