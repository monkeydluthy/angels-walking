import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SpiritualRecovery from './pages/SpiritualRecovery';
import AngelCardReading from './pages/AngelCardReading';
import AddictionRecovery from './pages/AddictionRecovery';
import LifeCoaching from './pages/LifeCoaching';
import SelfCareQuiz from './pages/SelfCareQuiz';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import SuccessStories from './pages/SuccessStories';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminSuccessStories from './pages/admin/SuccessStories';
import FormSubmissions from './pages/admin/FormSubmissions';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import MedicalDisclaimer from './pages/MedicalDisclaimer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/spiritual-recovery" element={<SpiritualRecovery />} />
            <Route path="/angel-card-reading" element={<AngelCardReading />} />
            <Route path="/addiction-recovery" element={<AddictionRecovery />} />
            <Route path="/life-coaching" element={<LifeCoaching />} />
            <Route path="/self-care-quiz" element={<SelfCareQuiz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/success-stories"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminSuccessStories />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/submissions"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <FormSubmissions />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Analytics />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Settings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
