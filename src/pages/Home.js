import React from 'react';
import { Grid, Typography } from '@mui/material';
import StockCard from '../components/StockCard';
import stocks from '../data/stocks.json';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        
      </Typography>
      <Grid container spacing={1}> {/* Reduced spacing */}
        {stocks.map((stock, index) => (
          <Grid
            item
            xs={6}   // 2 cards per row on small screens
            sm={4}   // 3 cards per row on medium screens
            md={3}   // 4 cards per row on large screens
            key={index}
          >
            <StockCard stock={stock} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}