import React from "react";
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid
} from "@mui/material";

function App() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", padding: "20px" }}>
      {/* Header */}
      <Box sx={{ backgroundColor: "#1e1e1e", color: "white", padding: "30px", borderRadius: "8px" }}>
        <Typography variant="h3" gutterBottom>
          Marble Stocks
        </Typography>
        <Typography variant="h6">
          Smart Investing Principles for US & ASX Markets
        </Typography>
      </Box>

      {/* Criteria Section */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Our Core Criteria
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {/* 10 Years Profits */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">10 Years of Consecutive Profits</Typography>
                <Typography variant="body2" color="text.secondary">
                  Stability matters. Companies with a decade of profits show resilience and strong fundamentals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Debt / EBITDA */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Debt / EBITDA ≤ 1x</Typography>
                <Typography variant="body2" color="text.secondary">
                  Low leverage means less financial risk. A ratio of 1x or lower indicates healthy balance sheets.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Profit Margin */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Profit Margin ≥ 5%</Typography>
                <Typography variant="body2" color="text.secondary">
                  Sustainable returns are key. A minimum 5% margin ensures efficiency and profitability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Cash vs Short-Term Debt */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Cash & Equivalents ≥ Short-Term Debt</Typography>
                <Typography variant="body2" color="text.secondary">
                  Liquidity matters. Having more cash than short-term debt means the company can cover obligations without stress.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h5" gutterBottom>
          Ready to Explore?
        </Typography>
        <Button variant="contained" color="primary" sx={{ margin: "10px" }} component={Link} to="/usa">
          View US Stocks
        </Button>
        <Button variant="contained" color="secondary" sx={{ margin: "10px" }} component={Link} to="/asx">
          View ASX Stocks
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ marginTop: "50px", color: "gray" }}>
        <Typography variant="body2">
          © 2025 Marble Stocks. For educational purposes only.
        </Typography>
      </Box>
    </Container>
  );
}

export default App;