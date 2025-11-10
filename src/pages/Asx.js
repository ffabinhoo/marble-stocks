import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import StockCard from '../components/StockCard';

export default function Asx() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataUrl = "https://finance-files-servless-fabio.s3.us-east-1.amazonaws.com/stocks-au.json";

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar dados do S3");
        }
        return response.json();
      })
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="body1">Loading asx data...</Typography>
      </div>
    );
  }

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
