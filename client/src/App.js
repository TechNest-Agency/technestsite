import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { PerformanceProvider } from './context/PerformanceContext';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Login from './pages/Login';
import TestConnection from './pages/TestConnection';
import AdminDashboard from './pages/admin/Dashboard';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import PaymentStatus from './pages/PaymentStatus';
import TeamMembers from './pages/TeamMembers';
import Profile from './pages/Profile';
import PreloadResources from './components/PreloadResources';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <HelmetProvider>
            <Router>
              <AnalyticsProvider>
                <PerformanceProvider>
                    <ScrollToTop />
                    <PreloadResources />
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <Cart />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/portfolio" element={<Portfolio />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/thank-you" element={<ThankYou />} />
                          <Route path="/payment/:status" element={<PaymentStatus />} />
                          <Route path="/team" element={<TeamMembers />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/test" element={<TestConnection />} />
                          <Route path="/profile" element={
                            <ProtectedRoute>
                              <Profile />
                            </ProtectedRoute>
                          } />
                          <Route path="/admin/*" element={
                            <ProtectedRoute requireAdmin>
                              <AdminDashboard />
                            </ProtectedRoute>
                          } />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                </PerformanceProvider>
              </AnalyticsProvider>
            </Router>
          </HelmetProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
