import React from 'react';
import { Typography } from '@mui/material';

export default function About() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">About This Dashboard</Typography>
      <Typography variant="body1">
        This is a simple React app with dark mode, cards, and graphs.
      </Typography>
    </div>
  );
}