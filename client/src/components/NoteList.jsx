import { Box, Card, CardContent, Grid, List, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';

export default function NoteList() {
    const { noteId } = useParams();
    const { folder } = useLoaderData();
    console.log(folder);
    const [activeNoteId, setActiveNoteId] = useState(noteId);

    return (
        <>
            <Grid container height={'100%'}>
                <Grid
                    item
                    xs={4}
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: '#F0EBE3',
                        height: '100%',
                        overflowY: 'auto',
                        padding: '10px',
                        textAlign: 'left',
                    }}
                >
                    <List
                        subheader={
                            <Box>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Notes{' '}
                                </Typography>
                            </Box>
                        }
                    >
                        {folder &&
                            folder.notes.map(({ id, content }) => {
                                return (
                                    <Link
                                        key={id}
                                        to={`note/${id}`}
                                        style={{ textDecoration: 'none' }}
                                        onClick={() => setActiveNoteId(id)}
                                    >
                                        <Card
                                            sx={{
                                                mb: '5px',
                                                backgroundColor:
                                                    id === activeNoteId
                                                        ? 'rgb(255 211 140)'
                                                        : '',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    '&:last-child': {
                                                        pb: '10px',
                                                    },
                                                    padding: '10px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${
                                                            content.substring(
                                                                0,
                                                                30,
                                                            ) || 'Empty'
                                                        }`,
                                                    }}
                                                ></div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}
