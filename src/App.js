import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Asx from './pages/Asx';
import Usa from './pages/Usa';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#fff' },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asx" element={<Asx />} />
          <Route path="/usa" element={<Usa />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
