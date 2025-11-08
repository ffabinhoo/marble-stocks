import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StockCard({ stock }) {
  const { Ticker, Financials } = stock.financial_data;

  // Ordenar dados por ano
  const data = [...Financials]
    .sort((a, b) => a.Year - b.Year)
    .map(f => ({ year: f.Year, netIncome: f.netIncome }));

  return (
    <Card
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        width: '100%',
        maxWidth: '400px',   // largura máxima do card aumentada
        minHeight: '450px',
        margin: '0 auto',    // centraliza o card
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent sx={{ flex: '1 1 auto' }}>
        {/* Nome do stock quebrando linha se for longo */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            whiteSpace: 'normal',       // permite múltiplas linhas
            overflowWrap: 'anywhere',   // força quebra de palavras longas
            wordBreak: 'break-word',    // compatibilidade extra
            width: '100%',
          }}
        >
          {stock.info.longName}
        </Typography>

        <Typography variant="h6" gutterBottom>{Ticker}</Typography>
        <Typography variant="body1">Last Price: ${stock.lastPrice.toFixed(2)}</Typography>
        <Typography variant="body2" sx={{ color: 'lightgreen', marginBottom: '10px' }}>
          Net Income Trend (10 Years)
        </Typography>

        <div style={{ flexGrow: 1, height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="year" stroke="#fff" />
              <YAxis
                stroke="#fff"
                tickFormatter={(value) => `$${(value / 1_000_000).toFixed(0)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2c2c2c',
                  color: '#fff',
                  borderRadius: '8px',
                  border: 'none'
                }}
                formatter={(value) => [`$${(value / 1_000_000).toFixed(2)}M`, 'Net Income']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="netIncome"
                stroke="lightgreen"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
