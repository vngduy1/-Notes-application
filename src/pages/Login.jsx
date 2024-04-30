import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const auth = getAuth();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        console.log(res);
    };

    if (user?.uid) {
        navigate('/');
        return;
    }

    return (
        <>
            <Typography sx={{ marginBottom: '10px' }}>
                Welcome to Note App
            </Typography>
            <Button variant="outlined" onClick={handleLoginWithGoogle}>
                Login with google
            </Button>
        </>
    );
}
