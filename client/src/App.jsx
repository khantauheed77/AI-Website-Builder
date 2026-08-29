import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/verifyEmailPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardPage from "./pages/DashboardPage";
import CommunityPage from "./pages/CommunityPage";
import PricingPage from "./pages/PricingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SettingsPage from "./pages/SettingsPage";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";
import NotFoundPage from "./pages/NotFoundPage";

// Renders the app component.
const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { borderRadius: "10px", fontSize: "14px" },
          success: { style: { background: "#10b981", color: "#fff" } },
          error: { style: { background: "#ef4444", color: "#fff" } },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/projects/:id" element={<ProtectedRoute>
          <BuilderPage/>
        </ProtectedRoute>} />
        <Route path="/preview/:id" element={<PreviewPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
