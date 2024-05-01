export const notesLoader = async ({ params: { folderId } }) => {
    const query = `query Folder($folderId: String) {
        folder(folderId: $folderId) {
          id
          name
          notes {
            id
            content
          }
        }
      }`;

    const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                folderId: folderId,
            },
        }),
    });

    const { data } = await res.json();
    console.log(data);
    return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
    const query = `query Folder($noteId: String) {
        note(noteId: $noteId) {
          content
          id
        }
      }`;

    const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                noteId: noteId,
            },
        }),
    });

    const { data } = await res.json();
    return data;
};
