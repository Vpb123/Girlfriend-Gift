import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RomanticBox = styled(Box)({
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#f8e1e1',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: 'auto',
});

const RomanticTypography = styled(Typography)({
  marginBottom: '16px',
  color: '#d52a2a',
  fontFamily: 'cursive',
});

const DoneButton = styled(Button)({
  backgroundColor: 'green',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
});

function NameInput({ onNameEntered }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === 'Vaishnavi') {
            setMessage('Welcome Darling 😘');
            setSubmitted(true);
            setTimeout(() => {
                onNameEntered(name);
            }, 2000); // Adjust delay time as needed
        } else {
            setMessage('You are not Vaishnavi! 😡');
        }
    };

    return (
        <RomanticBox>
            <RomanticTypography variant="h4">Welcome to your surprise!</RomanticTypography>
            <Typography variant="body1">Please enter your name:</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    margin="normal"
                />
                {!submitted ? (
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Let's Go
                    </Button>
                ) : (
                    <DoneButton
                        variant="contained"
                        fullWidth
                        startIcon={<CheckCircleIcon />}
                    >
                        Done
                    </DoneButton>
                )}
            </form>
            {message && <RomanticTypography variant="h6">{message}</RomanticTypography>}
        </RomanticBox>
    );
}

export default NameInput;
