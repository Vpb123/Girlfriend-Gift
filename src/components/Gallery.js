import React from 'react';
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import Masonry from 'react-masonry-css';
import '../styles/GalleryAnimation.css'; // Ensure this file includes necessary global styles

// Styled Typography for the gallery title
const TitleContainer = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: 1,
    marginBottom: theme.spacing(3),
    backgroundColor: '#f8bbd0', // Light pink background
    width: '100%', // Ensure the title takes full width
    padding: theme.spacing(2, 0),
    textAlign: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
    fontFamily: 'Cursive, sans-serif',
    color: '#d81b60', // Romantic red color
    fontSize: '2rem',
}));

const PinkLine = styled('hr')(({ theme }) => ({
    border: 'none',
    borderTop: `2px solid #d81b60`, // Romantic pink line
    width: '50%',
    margin: `${theme.spacing(1)}px auto 0`, // Center the line and adjust spacing
}));

// Container for each photo and its caption
const PhotoContainer = styled('div')({
    marginBottom: '16px', // Space below each photo-caption pair
});

// Styled img for photos
const Photo = styled('img')({
    width: '100%',
    height: 'auto',
    objectFit: 'cover', // Ensure images cover their container
    borderRadius: '0', // No border radius
    boxShadow: 'none', // No shadow
});

// Styled caption attached to the photo
const Caption = styled('div')({
    textAlign: 'center',
    padding: '8px 0',
    backgroundColor: '#ffe0e6', // Light pink background matching the theme
    color: '#d81b60', // Romantic red color
    fontFamily: 'Cursive, sans-serif',
    fontSize: '1rem',
    borderRadius: '0', // No border radius
    // borderTop: `1px solid #d81b60`, // Add a border line at the top to connect with the photo
    marginTop: '-4px', // Attach the caption to the photo with no gap
});

// Container with fixed height, scrolling enabled, and scrollbar hidden
const GalleryContainer = styled(Container)(({ theme, height }) => ({
    padding: 0, // Remove padding
    borderRadius: '15px',
    height: height || 'calc(100vh - 100px)', // Adjust as needed
    overflowY: 'scroll',
    overflowX: 'hidden', // Prevent horizontal scroll
    backgroundColor: '#f8bbd0', // Light pink background
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow similar to StyledPaper
    scrollbarWidth: 'none', // Hide scrollbar in Firefox
    msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer/Edge
    '&::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar in Chrome, Safari, and other WebKit browsers
    },
    margin: theme.spacing(2), // Add margin so the gallery is not directly sticking to the left
    boxSizing: 'border-box', // Ensure padding and border are included in the width and height
}));

function Gallery({ height }) {
    // Function to dynamically import all images
    function importAll(r) {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    // Import images
    const images = importAll(require.context('../assets/memories', false, /\.jpeg$/));

    // Create photos array with captions based on file names
    const photos = Object.keys(images).map((key) => ({
        src: images[key],
        caption: key.replace(/\.jpeg$/, ''), // Use the file name (without extension) as the caption
    }));

    // Breakpoints for masonry layout
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <GalleryContainer maxWidth="md" height={height}>
            <TitleContainer>
                <Title variant="h2">Our Memories Together</Title>
                <PinkLine />
            </TitleContainer>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {photos.map((photo, index) => (
                    <PhotoContainer key={index}>
                        <Photo src={photo.src} alt={photo.caption} />
                        <Caption>{photo.caption}</Caption>
                    </PhotoContainer>
                ))}
            </Masonry>
        </GalleryContainer>
    );
}

export default Gallery;
