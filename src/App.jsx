import React, { useState } from 'react';
import ClientDashBoard from './Client/ClientDashBoard.jsx';
import InsuranceSelector from './Client/InsuranceSelector.jsx';
import InvestmentForm from './Client/InvestmentForm.jsx';
import OnboardingHub from './Client/OnboardingHub.jsx';
import './Client/RoyalTheme.css';

export default function App() {
    const [activeScreen, setActiveScreen] = useState('onboarding');

    return (
        <div style={{background:'#070c1d', minHeight:'100vh'}}>
            {activeScreen === 'onboarding' && <OnboardingHub setActiveScreen={setActiveScreen} />}
            {activeScreen === 'investment' && <InvestmentForm setActiveScreen={setActiveScreen} />}
            {activeScreen === 'insurance' && <InsuranceSelector setActiveScreen={setActiveScreen} />}
            {activeScreen === 'dashboard' && <ClientDashBoard setActiveScreen={setActiveScreen} />}
        </div>
    );
}