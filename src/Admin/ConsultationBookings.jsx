import React from 'react';

export default function ConsultationBookings({ consultations }) {
  return (
    <div className="royal-root">
      <div className="royal-header">
        <h2>Scheduled Consultation Diary & Time Billing</h2>
        <p>Tracks standard hourly time-based invoice metrics and diary appointments</p>
      </div>

      <div>
        {consultations.map(consult => (
          <div className="royal-card-dark" key={consult.id} style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div>
              <h4>Client Target: {consult.client}</h4>
              <p>{consult.task}</p>
              <p style={{ opacity: 0.7, fontSize: 13 }}>Scheduled Date Matrix: {consult.date}</p>
            </div>
            <div>
              <span className="royal-badge">
                {consult.hoursAllocated} Hour(s) ({consult.rate})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}