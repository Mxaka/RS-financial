import React from 'react';

export default function ClaimsTracker({ claims, onAdvance }) {
  return (
    <div className="royal-root">
      <div className="royal-header">
        <h2>Active Claims Lifecycle Tracking</h2>
        <p>Monitor real-time progress fields across active short-term and long-term client claims [INDEX]:</p>
      </div>

      {claims.map(claim => (
        <div className="royal-card-dark" key={claim.id} style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4>Client File: {claim.client}</h4>
              <p>{claim.type} • Supplier Node: {claim.provider}</p>
            </div>
            <span className="royal-badge">{claim.status}</span>
          </div>

          {/* 10-Step Progress Tracking Elements */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, opacity: 0.85 }}>
              <span>Timeline Progress Metric:</span>
              <span>Step {claim.currentStep} of 10 ({claim.stepLabel})</span>
            </div>
            <div style={{ background: '#0f1a36', border: '1px solid #22305a', borderRadius: 10, height: 10, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${claim.currentStep * 10}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #ff8a1a, #ff9d2e)',
                  borderRadius: 10,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <button className="royal-btn" type="button" onClick={() => onAdvance(claim.id)}>
              Advance Claim Lifecycle Node →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}