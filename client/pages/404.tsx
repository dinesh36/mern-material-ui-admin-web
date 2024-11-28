import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

const PageNotFound: React.FC = () => {
    const router = useRouter();

    const goHome = () => {
        router.push('/');
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Sorry, the page you’re looking for doesn’t exist. It might have been moved or deleted.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={goHome}
                sx={{
                    textTransform: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                }}
            >
                Go Back Home
            </Button>
        </Container>
    );
};

export default PageNotFound;
