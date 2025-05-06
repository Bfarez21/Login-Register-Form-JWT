import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box, Container } from "@mui/material";
import './App.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Box display="flex" flexDirection="column" minHeight="100vh">
                <Header />
                <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                  <Home />   {/* Page principal*/}
                </Container>
                <Footer />
              </Box>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
