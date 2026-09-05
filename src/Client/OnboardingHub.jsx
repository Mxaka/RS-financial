import React from 'react';

export default function OnboardingHub({ onSelectPath }) {
  return (
    <div>
      <div>
        <p>Royal Square Financial (Pty) Ltd | Authorised FSP No. 29370</p>
        <h1>Welcome to Your Financial Future!</h1>
        <p>Your security portal account is officially active. To begin your onboarding journey, please select the primary financial service path you want to explore today:</p>
      </div>

      <hr />

      <div>
        
        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
          <h2>Wealth & Investment </h2>
          <p>Explore specialized personal investment portfolios designed around your time horizons. View dynamic wealth quotes, track compliance tier scoring matrices, and calculate upfront advisory commission layouts.</p>
          <p><strong>Available Products:</strong> Unit Trusts, Endowments, Stokvels, JSE Share Portfolios, Education and Emergency Funds [INDEX].</p>
          
          <button type="button" onClick={() => onSelectPath('investment')}>
            Launch Investment Portfolio Portal →
          </button>
        </div>

        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
          <h2>Asset Protection & Insurance</h2>
          <p>Submit a formal intake profile application to safeguard your assets. Our expert brokers will review your FICA parameters and select an optimized provider from our approved partner network on your behalf.</p>
          <p><strong>Cover Models Available:</strong> Car, Life, Home, Business, Personal, and Funeral Insurance frameworks.</p>
          
          <button type="button" onClick={() => onSelectPath('insurance')}>
            Open Insurance Application Desk →
          </button>
        </div>

      </div>

      <hr />
      
      <div>
        <p><small>Royal Square Financial is a registered legal entity (Reg. No. 2009/022911/07). All submitted data folders are handled securely following local regulatory compliance standards.</small></p>
      </div>
    </div>
  );
}
