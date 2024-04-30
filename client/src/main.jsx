import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Container } from '@mui/material';
import './firebase/config';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Container
            maxWidth="lg"
            sx={{ textAlign: 'center', marginTop: '50px' }}
        >
            <RouterProvider router={router} />
        </Container>
    </React.StrictMode>,
);
