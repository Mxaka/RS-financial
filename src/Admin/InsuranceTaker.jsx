import React from 'react';

export default function InsuranceTaker({ apps, onAssign }) {
  return (
    <div className="royal-root">
      <div className="royal-header">
        <h2>Incoming Insurance Intake Applications</h2>
        <p>Review newly filed criteria packets and allocate suitable product supplier nodes</p>
      </div>

      {apps.map(app => (
        <div className="royal-card-dark" key={app.id} style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4>Applicant Folder: {app.name}</h4>
              <p>FICA Identification Disc: {app.idNumber}</p>
            </div>
            <span className="royal-badge">{app.status}</span>
          </div>

          <div style={{ marginTop: 12 }}>
            <p>Requested Protection Category: <span>{app.type}</span></p>
            <p>Allocated Underwriting Supplier: <span>{app.assignedSupplier}</span></p>
          </div>

          {app.status === 'Pending Evaluation' && (
            <div style={{ marginTop: 16 }}>
              <p>Authorize Strategic Network Allocation:</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="royal-btn-dark" type="button" onClick={() => onAssign(app.id, 'Santam Group')}>Link Santam</button>
                <button className="royal-btn-dark" type="button" onClick={() => onAssign(app.id, 'Discovery Life')}>Link Discovery</button>
                <button className="royal-btn-dark" type="button" onClick={() => onAssign(app.id, 'Sanlam Hub')}>Link Sanlam</button>
                <button className="royal-btn-dark" type="button" onClick={() => onAssign(app.id, 'Old Mutual Group')}>Link Old Mutual</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}