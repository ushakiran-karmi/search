import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
      <CircularProgress />
      {message && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
