import React, { useState } from 'react';

export default function InsuranceSelector() {
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [submitted, setSubmitted] = useState(false);

  // Form input fields for the new client application checklist
  const [idNumber, setIdNumber] = useState('');
  const [riskAddress, setRiskAddress] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  return (
    <div>
      <div>
        <p>Royal Square Financial (Pty) Ltd | FSP No. 29370</p>
        <h2>New Client Insurance Cover Application Framework</h2>      
        <p><em>*Note: Clients submit criteria profiles. Product providers are assigned internally by Royal Square brokers following strict portfolio evaluation rules.</em></p>
      </div>

      <hr />

      {/* STEP 1: Select Cover Category */}
      {!submitted && (
        <div>
          <h3>1. Select Required Cover Category:</h3>
          <div>
            <button type="button" onClick={() => setSelectedCategory('Car')}>Car Insurance Cover </button>
            <button type="button" onClick={() => setSelectedCategory('Life')}>Life Insurance Cover </button>
            <button type="button" onClick={() => setSelectedCategory('Home')}>Home Insurance Cover </button>
            <button type="button" onClick={() => setSelectedCategory('Business')}>Business Insurance Cover </button>
            <button type="button" onClick={() => setSelectedCategory('Personal')}>Personal Asset Cover </button>
            <button type="button" onClick={() => setSelectedCategory('Funeral')}>Funeral Insurance Cover </button>
          </div>
        </div>
      )}

      {/* STEP 2: Unified Onboarding Data Application Form */}
      {selectedCategory && !submitted && (
        <form style={{ marginTop: '20px' }}>
          <h3>2. Complete {selectedCategory} Application Intake Profile:</h3>
          
          <div>
            <label>South African ID Number / Passport:</label>
            <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="e.g. 950812..." />
          </div>

          <div>
            <label>Physical Risk Address (FICA Verification):</label>
            <input type="text" value={riskAddress} onChange={(e) => setRiskAddress(e.target.value)} placeholder="e.g. 13th Floor, Braamfontein" />
          </div>

          <div>
            <label>Gross Monthly Income Estimation (R):</label>
            <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} placeholder="e.g. 25000" />
          </div>

          <div style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', border: '1px dashed #ccc' }}>
            <p><strong>Mandatory Acknowledgment Matrix:</strong> By submitting this folder, you authorize Royal Square Financial to evaluate your portfolio structure and select an optimized provider from our approved network (including Santam, Discovery, Sanlam, and Old Mutual) on your behalf.</p>
          </div>

          <button 
            type="button" 
            onClick={() => setSubmitted(true)}
            style={{ marginTop: '15px', fontWeight: 'bold' }}
          >
            Submit Application Folder to Broker Desk
          </button>
        </form>
      )}

      {/* STEP 3: Submission Confirmation Screen */}
      {submitted && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid green', background: '#f0fdf4' }}>
          <h3>✔ Application Filed Successfully!</h3>
          <p>Your <strong>{selectedCategory} Cover profile packet</strong> has been sent to the administration brokers.</p>
          <p><strong>Next Compliance Step:</strong> A Royal Square Financial advisor will review your FICA criteria, match your risk tier to a suitable product supplier, and issue your formal mandate within 3 business days.</p>
          
          <button type="button" onClick={() => { setSelectedCategory(''); setSubmitted(false); setIdNumber(''); setRiskAddress(''); setMonthlyIncome(''); }}>
            Apply for Another Asset Cover Block
          </button>
        </div>
      )}
    </div>
  );
}
