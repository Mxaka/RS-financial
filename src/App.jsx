import { default as React, useState } from 'react';
import ClientDashBoard from './Client/ClientDashBoard.jsx';
import InsuranceSelector from './Client/InsuranceSelector.jsx';
import InvestmentForm from './Client/InvestmentForm.jsx';
import OnboardingHub from './Client/OnboardingHub.jsx';

export default function App() {
  // Set the default launch page to your brand new onboarding hub gate
  const [activeScreen, setActiveScreen] = useState('onboarding'); 

  return (
    <div>
      {/* Navigation Shortcut Strip */}
      <div>
        <strong>RSF Gateway Module</strong> | 
        <button type="button" onClick={() => setActiveScreen('onboarding')}>Onboarding Hub</button> | 
        <button type="button" onClick={() => setActiveScreen('dashboard')}>Existing Client Dashboard</button>
      </div>
      <hr />

      {/* Dynamic Screen Routing Logic */}
      {activeScreen === 'onboarding' && (
        <OnboardingHub onSelectPath={(path) => setActiveScreen(path)} />
      )}

      {activeScreen === 'investment' && (
        <InvestmentForm />
      )}

      {activeScreen === 'insurance' && (
        <InsuranceSelector />
      )}

      {activeScreen === 'dashboard' && (
        <ClientDashBoard />
      )}
    </div>
  );
}

