import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AdvisorDashboard from './Admin/AdvisorDashboard.jsx';
import ClientDashBoard from './Client/ClientDashBoard.jsx';
import InsuranceSelector from './Client/InsuranceSelector.jsx';
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

// --- WRAPPER TO MAKE OLD COMPONENTS WORK WITH NAVIGATE ---
function OnboardingWrapper() {
    const nav = useNavigate();
    return <OnboardingHub setActiveScreen={(s)=>{ if(s==='dashboard') nav('/dashboard'); else if(s==='investment') nav('/investment'); else if(s==='insurance') nav('/insurance'); else nav('/onboarding'); }} />;
}
function DashboardWrapper() {
    const nav = useNavigate();
    return <ClientDashBoard setActiveScreen={(s)=>nav('/'+s)} />;
}
function InvestmentWrapper() {
    const nav = useNavigate();
    return <InvestmentForm setActiveScreen={(s)=>nav('/'+s)} />;
}
function InsuranceWrapper() {
    const nav = useNavigate();
    return <InsuranceSelector setActiveScreen={(s)=>nav('/'+s)} />;
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="royal-root">
                <TopNav />
                <Routes>
                    <Route path="/" element={<OnboardingWrapper />} />
                    <Route path="/onboarding" element={<OnboardingWrapper />} />
                    <Route path="/dashboard" element={<DashboardWrapper />} />
                    <Route path="/investment" element={<InvestmentWrapper />} />
                    <Route path="/insurance" element={<InsuranceWrapper />} />
                    <Route path="/your-data" element={<YourDataPage />} />
                    <Route path="/track-claim" element={<YourDataPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}