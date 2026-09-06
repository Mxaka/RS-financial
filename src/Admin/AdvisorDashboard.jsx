import React, { useState } from 'react';
import ClaimsTracker from './ClaimsTracker.jsx';
import ConsultationBookings from './ConsultationBookings.jsx';
import InsuranceTaker from './InsuranceTaker.jsx';
import InvestmentPlacements from './InvestmentPlacements.jsx';
import './RoyalTheme.css';

export default function AdvisorDashboard() {
  const [currentModule, setCurrentModule] = useState('apps');

  const [insuranceApps, setInsuranceApps] = useState([
    { id: 'i1', name: 'Sipho Modise', type: 'Car Cover ', idNumber: '950812...', status: 'Pending Evaluation', assignedSupplier: 'None' },
    { id: 'i2', name: 'Lerato Khumalo', type: 'Funeral Cover ', idNumber: '891104...', status: 'Pending Evaluation', assignedSupplier: 'None' }
  ]);

  const [clientClaims, setClientClaims] = useState([
    { id: 'cl1', client: 'Sipho Modise', provider: 'Santam', type: 'Motor Accident', currentStep: 4, stepLabel: 'Repair Quotes Sent', status: 'AI Intake Review' },
    { id: 'cl2', client: 'Thabo Dlamini', provider: 'Discovery Life', type: 'Health Admission', currentStep: 9, stepLabel: 'Step 9 Processing', status: 'Escalated to Advisor' }
  ]);

  const bookedConsultations = [
    { id: 'b1', client: 'Naledi Molefe', task: 'Financial Needs Analysis & Report', hoursAllocated: 3, date: '2026-09-08', rate: 'R1,500/hr ex. VAT' },
    { id: 'b2', client: 'Zama Nkosi', task: 'Mandatory Annual Client Review Meeting', hoursAllocated: 1, date: '2026-09-10', rate: 'R1,500/hr ex. VAT' }
  ];

  const activeInvestments = [
    { id: 'v1', client: 'Sipho Modise', product: 'Personal Share Portfolio (JSE Shares)', totalContributed: 240000, riskScore: 13, feeStructure: 'Asset-Based (3% Commission)' },
    { id: 'v2', client: 'Lerato Khumalo', product: 'Emergency Fund Portfolio', totalContributed: 50000, riskScore: 3, feeStructure: 'Fixed Monthly Retainer (R500/mo)' }
  ];

  const handleAssignSupplier = (id, supplierName) => {
    setInsuranceApps(prev => prev.map(app => app.id === id ? { ...app, status: 'Allocated & Approved', assignedSupplier: supplierName } : app));
  };

  const handleAdvanceClaimStep = (id) => {
    setClientClaims(prev => prev.map(claim => {
      if (claim.id === id && claim.currentStep < 10) {
        const nextStep = claim.currentStep + 1;
        return { ...claim, currentStep: nextStep, stepLabel: nextStep === 10 ? 'Case Closed' : `Step ${nextStep} Processing`, status: nextStep === 10 ? 'Resolved' : claim.status };
      }
      return claim;
    }));
  };

  const navItems = [
    { key: 'apps', label: `Applications (${insuranceApps.filter(a => a.status === 'Pending Evaluation').length})` },
    { key: 'claims', label: 'Claims Tracker' },
    { key: 'diary', label: 'Consultations' },
    { key: 'investments', label: 'Investments' }
  ];

  return (
    <div className="royal-root" style={{ display: 'flex', gap: 20 }}>

      {/* LEFT SIDEBAR MENU */}
      <div className="royal-card-dark" style={{ width: 220, flexShrink: 0, height: 'fit-content' }}>
        <div style={{ marginBottom: 16 }}>
          <h3>Broker Operations</h3>
          <p style={{ opacity: 0.6, fontSize: 12 }}>Console Node v1.0.4</p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {navItems.map(item => (
            <li key={item.key}>
              <button
                type="button"
                className={currentModule === item.key ? 'royal-btn' : 'royal-btn-dark'}
                onClick={() => setCurrentModule(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT CONTENT PANEL */}
      <div style={{ flex: 1 }}>
        <div className="royal-nav">
          <div>
            <span className="royal-badge">FSP No. 29370</span>
            <h1 style={{ margin: '8px 0 0' }}>Advisor Command Center</h1>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>

          </div>
        </div>

        <div>
          {currentModule === 'apps' && <InsuranceTaker apps={insuranceApps} onAssign={handleAssignSupplier} />}
          {currentModule === 'claims' && <ClaimsTracker claims={clientClaims} onAdvance={handleAdvanceClaimStep} />}
          {currentModule === 'diary' && <ConsultationBookings consultations={bookedConsultations} />}
          {currentModule === 'investments' && <InvestmentPlacements investments={activeInvestments} />}
        </div>
      </div>

    </div>
  );
}