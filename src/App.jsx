import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AdvisorDashboard from './Admin/AdvisorDashboard.jsx';
import ClientDashBoard from './Client/ClientDashBoard.jsx';
import InsuranceSelector from './Client/InsuranceSelector.jsx';
import InvestmentForm from './Client/InvestmentForm.jsx';
import OnboardingHub from './Client/OnboardingHub.jsx';
import './Client/RoyalTheme.css';

// Maps old screen names to real URLs, so child components can keep
// calling setActiveScreen('investment') etc. without any changes.
const SCREEN_PATHS = {
  'advisor-dashboard': '/advisor',
  'dashboard': '/client',
  'onboarding': '/client/onboarding',
  'investment': '/client/investment',
  'insurance': '/client/insurance',
};

function useScreenNavigator() {
  const navigate = useNavigate();
  return (screenName) => navigate(SCREEN_PATHS[screenName] ?? '/client');
}

function AdvisorRoute() {
  const setActiveScreen = useScreenNavigator();
  return <AdvisorDashboard setActiveScreen={setActiveScreen} />;
}

function ClientDashboardRoute() {
  const setActiveScreen = useScreenNavigator();
  return <ClientDashBoard setActiveScreen={setActiveScreen} />;
}

function OnboardingRoute() {
  const setActiveScreen = useScreenNavigator();
  return <OnboardingHub setActiveScreen={setActiveScreen} />;
}

function InvestmentRoute() {
  const setActiveScreen = useScreenNavigator();
  return <InvestmentForm setActiveScreen={setActiveScreen} />;
}

function InsuranceRoute() {
  const setActiveScreen = useScreenNavigator();
  return <InsuranceSelector setActiveScreen={setActiveScreen} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background: '#070c1d', minHeight: '100vh' }}>
        <Routes>
          <Route path="/advisor" element={<AdvisorRoute />} />
          <Route path="/client" element={<ClientDashboardRoute />} />
          <Route path="/client/onboarding" element={<OnboardingRoute />} />
          <Route path="/client/investment" element={<InvestmentRoute />} />
          <Route path="/client/insurance" element={<InsuranceRoute />} />
          <Route path="*" element={<AdvisorRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}