import React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { FaHeart } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';

// Styled Paper component for a romantic background
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: '#f8bbd0', // Light pink background
    color: '#d81b60', // Romantic red color
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
}));

// Styled Typography for the message
const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontFamily: 'Dancing Script, cursive', // Romantic font
    fontSize: '2rem',
    lineHeight: 1.5,
}));

// Decorative icons
const HeartIcon = styled(FaHeart)({
    color: '#d81b60',
    fontSize: '1.5rem',
    margin: '0 0.2rem',
});

const SparklesIcon = styled(GiSparkles)({
    color: '#d81b60',
    fontSize: '1.5rem',
    margin: '0 0.2rem',
});

function FinalMessage({ name }) {
    return (
        <Container maxWidth="sm">
            <StyledPaper>
                <StyledTypography variant="h1">
                    <SparklesIcon /> Happy 24th Birthday, {name}! <SparklesIcon />
                </StyledTypography>
                <Typography variant="body1" paragraph>
                    I remember the first day I met you at the office. I was a bit weird and rude back then, and I didn’t really care about anyone. But then I met you, and we became good friends in a very short time. I became obsessed with you; I used to get butterflies looking into your eyes and seeing your smile. I always wanted to talk to you, meet you, and be around you. At first, I didn’t realize what I was feeling, but one day while we were walking, Harsh said, "Vaishnavi acchi lagti kya?" I replied, "Wo alag hai yaar." He excitedly said, "Pyaar hogaya lavde tereko," and that was the day I realized I had fallen madly in love with you. I wanted to trade everything for you. In no time, we became close and made it together.
                </Typography>
                <Typography variant="body1" paragraph>
                    You changed me; you gave me a new personality and made me a better person. You believed in me, supported me, cared for me, and loved me. We’ve come so far in these two years. Now, you mean the world to me, and I'm so grateful to have you in my life. To the most beautiful and amazing girl in my eyes and the only girl in my heart, happy 24th birthday. I wish to celebrate all your birthdays together. Always be happy, and may you achieve all your goals and get everything you deserve in life.
                </Typography>
                <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                    <HeartIcon /> Love you always <HeartIcon />
                </div>
            </StyledPaper>
        </Container>
    );
}

export default FinalMessage;
