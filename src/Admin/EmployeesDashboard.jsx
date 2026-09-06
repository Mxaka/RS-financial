import React, { useState } from 'react';

export default function AdvisorDashboard() {
  // --- 1. TRACK INSURANCE COVER APPLICATIONS NODE ---
  const [insuranceApps, setInsuranceApps] = useState([
    { id: 'i1', name: 'Sipho Modise', type: 'Car Cover 🚗', idNumber: '950812...', status: 'Pending Evaluation', assignedSupplier: 'None' },
    { id: 'i2', name: 'Lerato Khumalo', type: 'Funeral Cover 🛡️', idNumber: '891104...', status: 'Pending Evaluation', assignedSupplier: 'None' }
  ]);

  // --- 2. TRACK LIVE CLIENT CLAIMS (10-STEP LIFECYCLE) ---
  const [clientClaims, setClientClaims] = useState([
    { id: 'cl1', client: 'Sipho Modise', provider: 'Santam', type: 'Motor Accident', currentStep: 4, stepLabel: 'Repair Quotes Sent', status: 'AI Intake Review' },
    { id: 'cl2', client: 'Thabo Dlamini', provider: 'Discovery Life', type: 'Health Admission', currentStep: 7, stepLabel: 'Car Hire / Utility Arranged', status: 'Escalated to Advisor 🚨' }
  ]);

  // --- 3. TRACK BOOKED ADVISOR CONSULTATIONS (TIME-BASED INVOICING) ---
  const [bookedConsultations, setBookedConsultations] = useState([
    { id: 'b1', client: 'Naledi Molefe', task: 'Financial Needs Analysis & Report', hoursAllocated: 3, date: '2026-09-08', rate: 'R1,500/hr ex. VAT' },
    { id: 'b2', client: 'Zama Nkosi', task: 'Mandatory Annual Client Review Meeting', hoursAllocated: 1, date: '2026-09-10', rate: 'R1,500/hr ex. VAT' }
  ]);

  // --- 4. TRACK COMPREHENSIVE CLIENT INVESTMENTS ---
  const activeInvestments = [
    { id: 'v1', client: 'Sipho Modise', product: 'Personal Share Portfolio (JSE Shares)', totalContributed: 240000, riskScore: 13, feeStructure: 'Asset-Based (3% Commission)' },
    { id: 'v2', client: 'Lerato Khumalo', product: 'Emergency Fund Portfolio', totalContributed: 50000, riskScore: 3, feeStructure: 'Fixed Monthly Retainer (R500/mo)' }
  ];

  // --- ACTION HANDLERS FOR BROKER OPERATIONAL CONTROL ---
  const handleAssignSupplier = (id, supplierName) => {
    setInsuranceApps(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'Allocated & Approved', assignedSupplier: supplierName } : app)
    );
  };

  const handleAdvanceClaimStep = (id) => {
    setClientClaims(prev =>
      prev.map(claim => {
        if (claim.id === id && claim.currentStep < 10) {
          const nextStep = claim.currentStep + 1;
          return { 
            ...claim, 
            currentStep: nextStep, 
            stepLabel: nextStep === 10 ? 'Case Closed & Resolved' : `Step ${nextStep} Processing`,
            status: nextStep === 10 ? 'Resolved' : claim.status 
          };
        }
        return claim;
      })
    );
  };

  return (
    <div>
      {/* Advisor Node Identifiers Header */}
      <div>
        <p><strong>ROYAL SQUARE OPERATION MODULE</strong> | Authorized Personnel Secure Desk</p>
        <h1>Advisor Command & Tracking Console</h1>
        <p>Managing Director: Qiniso Ntuli Registry Hub • Registered FSP Number: 29370 [INDEX]</p>
      </div>

      <hr />

      {/* PILLAR 1: TRACK & MANAGE INSURANCE APPLICATIONS */}
      <div>
        <h2>📥 Incoming Insurance Intake Applications</h2>
        <p>Review newly filed criteria packets and assign the official product supplier matching the client file [INDEX]:</p>
        
        {insuranceApps.map(app => (
          <div key={app.id} style={{ margin: '10px 0', padding: '12px', border: '1px solid #ccc' }}>
            <strong>Applicant Name:</strong> {app.name} | <strong>Requested Category:</strong> {app.type} <br />
            <strong>Compliance Status:</strong> {app.status} | <strong>Assigned Supplier:</strong> {app.assignedSupplier} <br />
            
            {app.status === 'Pending Evaluation' && (
              <div style={{ marginTop: '8px' }}>
                <button type="button" onClick={() => handleAssignSupplier(app.id, 'Santam (Subsidiaries Group)')}>Assign to Santam</button> | 
                <button type="button" onClick={() => handleAssignSupplier(app.id, 'Discovery Life & Health')}>Assign to Discovery</button> | 
                <button type="button" onClick={() => handleAssignSupplier(app.id, 'Sanlam / Glacier Hub')}>Assign to Sanlam</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <hr />

      {/* PILLAR 2: TRACK LIVE INTERACTIVE CLIENT CLAIMS */}
      <div>
        <h2>🚗 Active Claims Lifecycle Tracking (10-Step Monitor)</h2>
        <p>Monitor real-time progress fields across active short-term and long-term client claims [INDEX]:</p>

        {clientClaims.map(claim => (
          <div key={claim.id} style={{ margin: '10px 0', padding: '12px', border: '1px solid #ccc' }}>
            <strong>Client Name:</strong> {claim.client} | <strong>Claim Type:</strong> {claim.type} ({claim.provider}) <br />
            <strong>Current Timeline Node:</strong> <mark>Step {claim.currentStep} of 10 — {claim.stepLabel}</mark> <br />
            <strong>Operational Flag Status:</strong> <span style={{ color: claim.status.includes('🚨') ? 'red' : 'black' }}>{claim.status}</span> <br />
            
            <div style={{ marginTop: '6px' }}>
              <button type="button" onClick={() => handleAdvanceClaimStep(claim.id)}>
                Advance Claim to Next Stage Step →
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      {/* PILLAR 3: TRACK BOOKED ADVISOR CONSULTATIONS */}
      <div>
        <h2>🗓️ Scheduled Consultation Diary & Time Billing</h2>
        <p>Tracks standard hourly time-based invoice metrics and diary appointments [INDEX]:</p>
        
        <ul>
          {bookedConsultations.map(consult => (
            <li key={consult.id} style={{ margin: '8px 0' }}>
              <strong>Client:</strong> {consult.client} | <strong>Focus Work:</strong> {consult.task} <br />
              <strong>Booked Date:</strong> {consult.date} | <strong>Time Framework:</strong> {consult.hoursAllocated} Hour(s) ({consult.rate}) [INDEX]
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* PILLAR 4: TRACK ACTIVE INVESTMENT PORTFOLIOS */}
      <div>
        <h2>📊 Active Investment Asset Placements</h2>
        <p>Overview of active capital contribution files and compliance matrix metrics [INDEX]:</p>
        
        <ul>
          {activeInvestments.map(invest => (
            <li key={invest.id} style={{ margin: '8px 0' }}>
              <strong>Client Account:</strong> {invest.client} | <strong>Portfolio Focus:</strong> {invest.product} <br />
              <strong>Active Contributions Base:</strong> R {invest.totalContributed.toLocaleString('en-ZA')}.00 <br />
              <strong>Risk Matrix score:</strong> Tier {invest.riskScore} | <strong>Fee Arrangement:</strong> {invest.feeStructure} [INDEX]
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* OFFICE SUMMARY COMPLIANCE MATRIX FOOTER */}
      <div>
        <p><small>All system operational records are compiled annually automatically following the standard Six-Step Financial Planning framework guidelines [INDEX]. Accounts require a standard 30-day notice clause parameter to execute contract terminations [INDEX].</small></p>
      </div>

    </div>
  );
}
