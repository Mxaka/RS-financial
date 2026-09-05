import React, { useState } from 'react';

export default function InvestmentForm() {
  // 1. Simplified states for pure investment metrics
  const [termBracket, setTermBracket] = useState('1-3'); // 'less-1', '1-3', '3-5', 'over-5'
  const [product, setProduct] = useState('Emergency Fund');
  const [monthlyAmount, setMonthlyAmount] = useState(2000);
  const [showQuote, setShowQuote] = useState(false);

  // 2. Fixed Broker Commission Rule from your Royal Square documents
  const upfrontCommissionRate = 0.03; // 3.00% capped fee

  // 3. Simple risk scores and growth rates mapped to the term timeline
  let calculatedYears = 3;
  let growthMultiplier = 0.07;
  let horizonLabel = "1 to 3 years";
  let complianceRiskScore = 6;

  if (termBracket === 'less-1') {
    calculatedYears = 1;
    growthMultiplier = 0.05;
    horizonLabel = "Less than one year";
    complianceRiskScore = 3;
  } else if (termBracket === '1-3') {
    calculatedYears = 3;
    growthMultiplier = 0.07;
    horizonLabel = "1 to 3 years";
    complianceRiskScore = 6;
  } else if (termBracket === '3-5') {
    calculatedYears = 5;
    growthMultiplier = 0.09;
    horizonLabel = "3 to 5 years";
    complianceRiskScore = 9;
  } else if (termBracket === 'over-5') {
    calculatedYears = 10; 
    growthMultiplier = 0.12;
    horizonLabel = "In excess of 5 years";
    complianceRiskScore = 13;
  }

  // 4. Core Portfolio Math
  const totalContributions = monthlyAmount * 12 * calculatedYears;
  const commissionFee = totalContributions * upfrontCommissionRate;
  const activeWorkingCapital = totalContributions - commissionFee;
  const estimatedPayout = Math.round(activeWorkingCapital * (1 + growthMultiplier));

  return (
    <div>
      {/* Brand Profile Banner */}
      <div>
        <p>Royal Square Financial (Pty) Ltd | FSP No. 29370</p>
        <h2>Personal Investment Portfolio Mandate</h2>
      </div>

      <form>
        {/* Step 1: Term Brackets Timeline Dropdown */}
        <div>
          <label>Select Target Investment Term:</label>
          <select value={termBracket} onChange={(e) => { setTermBracket(e.target.value); setShowQuote(false); }}>
            <option value="less-1">Less than one year</option>
            <option value="1-3">1 to 3 years</option>
            <option value="3-5">3 to 5 years</option>
            <option value="over-5">In excess of 5 years</option>
          </select>
        </div>

        {/* Step 2: Dynamic Product Selector Limited by Risk Matrix */}
        <div>
          <label>Select Product Classification:</label>
          <select value={product} onChange={(e) => { setProduct(e.target.value); setShowQuote(false); }}>
            {complianceRiskScore <= 6 ? (
              <>
                <option value="Emergency Fund">Emergency Fund</option>
                <option value="Stokvels Investment">Stokvels Investment</option>
                <option value="Investment Clubs">Investment Clubs</option>
              </>
            ) : (
              <>
                <option value="Unit Trusts">Unit Trusts</option>
                <option value="Endowments">Endowments</option>
                <option value="Education Fund">Education Fund</option>
                <option value="Offshore Portfolios">Offshore Portfolios</option>
                <option value="Personal Share Portfolio">Personal Share Portfolio (JSE Listed Shares)</option>
              </>
            )}
          </select>
        </div>

        {/* Step 3: Capital Inputs */}
        <div>
          <label>Monthly Saving Input (R):</label>
          <input 
            type="number" 
            value={monthlyAmount} 
            onChange={(e) => { setMonthlyAmount(Number(e.target.value)); setShowQuote(false); }} 
          />
        </div>

        {/* Trigger Button */}
        {!showQuote && (
          <button type="button" onClick={() => setShowQuote(true)}>
            Generate Investment Quote Summary
          </button>
        )}

        {/* Step 4: Payout Quote Panel with Risk Score Metric */}
        {showQuote && (
          <div>
            <h3>Official Wealth Cost Statement</h3>
            
            <p><strong>Compliance Risk Score:</strong> Matrix Tier {complianceRiskScore}</p>
            <p>Selected Portfolio Category: {product}</p>
            <p>Target Lifespan Horizon: {horizonLabel}</p>
            
            <p>Total Capital Contributed: R {totalContributions.toLocaleString('en-ZA')}.00</p>
            <p>Upfront Broker Commission (3.00%): - R {commissionFee.toLocaleString('en-ZA')}.00</p>
            <p>Net Active Capital Asset Base: R {activeWorkingCapital.toLocaleString('en-ZA')}.00</p>
            
            <h4>Estimated Maturity Target Payout: R {estimatedPayout.toLocaleString('en-ZA')}.00</h4>

            <div>
              <p>*Financial planning accounts are reviewed annually by default configuration guidelines. Portfolio management changes require a standard 30-day notice buffer.</p>
            </div>

            <button type="button">
              Confirm Mandate & Save to Dashboard
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
