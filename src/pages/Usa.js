import React from 'react';
import { Grid, Typography } from '@mui/material';
import StockCard from '../components/StockCard';
import stocks from '../data/stocks-us.json';

export default function Home() {
  return (
      <div style={{ padding: '10px 40px' }}> {/* padding maior horizontalmente */}
        <Typography variant="h5" gutterBottom>
          Stocks
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {stocks.map((stock, index) => (
            <Grid
              item
              key={index}
              sx={{ flex: '0 0 33.33%', maxWidth: '400px', padding: '8px' }} // largura fixa e padding
            >
              <StockCard stock={stock} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
}