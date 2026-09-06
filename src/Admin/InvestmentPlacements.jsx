import React from 'react';

export default function InvestmentPlacements({ investments }) {
  return (
    <div>
      <div>
        <h2>Active Investment Asset Placements</h2>
        <p>Overview of active capital contribution files and portfolio configuration parameters </p>
      </div>

      <div>
        {investments.map(invest => (
          <div key={invest.id}>
            <div>
              <div>
                <h4>Client Portfolio Account: {invest.client}</h4>
                <p>{invest.product}</p>
              </div>
              <span>
                Tier {invest.riskScore} Matrix
              </span>
            </div>

            <div>
              <div>
                Active Contribution Base: <span>R {invest.totalContributed.toLocaleString('en-ZA')}.00</span>
              </div>
              <div>
                Arrangement: {invest.feeStructure} 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
