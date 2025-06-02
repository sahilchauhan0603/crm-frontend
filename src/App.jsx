import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import CampaignsPage from './pages/CampaignsPage';
import SegmentsPage from './pages/SegmentsPage';
import CommunicationLogsPage from './pages/CommunicationLogsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import Profile from './pages/Profile';
import { Callback } from '@kinde-oss/kinde-auth-react';
import LoadingBar from './components/LoadingBar';
import ScrollToTop from './components/ScrollToTop';
import LoadFromTop from './components/LoadFromTop';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate loading time

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <LoadingBar isLoading={isLoading} />
      <ScrollToTop />
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/segments" element={<SegmentsPage />} />
          <Route path="/communication-logs/:campaignId" element={<CommunicationLogsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <LoadFromTop />
    <App />
  </Router>
);

export default AppWrapper;
