import React, { useState } from 'react';
import { clientMock } from '../mockData/clientData';
import { insightsMock } from '../mockData/insightsData';

const DetailedInsights = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('history');
  if (!isOpen) return null;

  const historyData = [
    { month: 'Apr 2026', worth: 1800000, claims: 1, spend: 32000 },
    { month: 'May 2026', worth: 1950000, claims: 2, spend: 38000 },
    { month: 'Jun 2026', worth: 2100000, claims: 1, spend: 41000 },
    { month: 'Jul 2026', worth: 2250000, claims: 3, spend: 38900 },
    { month: 'Aug 2026', worth: 2380000, claims: 2, spend: 38900 },
    { month: 'Sep 2026', worth: 2450890, claims: 2, spend: 45200 },
  ];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Detailed Insights</h2>
            <p style={styles.sub}>History + breakdown of what was there previously</p>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>x</button>
        </div>

        <div style={styles.tabs}>
          {['history', 'allocation', 'claims', 'spending'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{...styles.tab, ...(tab === t ? styles.tabActive : {})}}>{t}</button>
          ))}
        </div>

        <div style={styles.body}>
          {tab === 'history' && (
            <>
              <h4 style={styles.sectionTitle}>What Was There Previously - Net Worth Trend</h4>
              <div style={styles.tableHead}>
                <span>Month</span><span>Net Worth</span><span>Change</span><span>Claims</span>
              </div>
              {historyData.map((row, i) => {
                const prev = i > 0 ? historyData[i-1].worth : row.worth;
                const change = ((row.worth - prev) / prev * 100).toFixed(1);
                return (
                  <div key={row.month} style={styles.tableRow}>
                    <span style={{color: '#fff'}}>{row.month}</span>
                    <span>R {row.worth.toLocaleString()}</span>
                    <span style={{color: parseFloat(change) >= 0 ? '#22c55e' : '#ef4444'}}>{i === 0 ? '-' : `+${change}%`}</span>
                    <span>{row.claims}</span>
                  </div>
                )
              })}
            </>
          )}

          {tab === 'allocation' && (
            <>
              <h4 style={styles.sectionTitle}>Where Your Money Was Allocated - Previous vs Now</h4>
              {clientMock.netWorth.breakdown.map(item => (
                <div key={item.label} style={styles.detailCard}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{color: '#fff', fontWeight: '700'}}>{item.label}</span>
                    <span style={{color: '#FF8C00'}}>R {item.value.toLocaleString()}</span>
                  </div>
                  <div style={styles.barTrack}><div style={{...styles.barFill, width: `${(item.value / clientMock.netWorth.total)*100}%`, background: item.color}}></div></div>
                  <p style={styles.detailText}>Previously in Aug: R {(item.value * 0.92).toLocaleString()} - Growth: +8%</p>
                </div>
              ))}
            </>
          )}

          {tab === 'claims' && (
            <>
              <h4 style={styles.sectionTitle}>Claims History - What Was There Previously</h4>
              {clientMock.claims.map(c => (
                <div key={c.id} style={styles.detailCard}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{color: '#fff'}}>{c.id} - {c.type}</span>
                    <span style={{color: '#22c55e'}}>{c.status}</span>
                  </div>
                  <p style={styles.detailText}>Amount: R {c.amount.toLocaleString()} | Date: {c.date} | Progress: {c.progress}%</p>
                  <div style={styles.barTrack}><div style={{...styles.barFill, width: `${c.progress}%`}}></div></div>
                </div>
              ))}
              <div style={{marginTop: '1rem', padding: '1rem', background: 'rgba(34,197,94,0.08)', borderRadius: '10px'}}>
                <span style={{color: '#22c55e', fontSize: '0.85rem'}}>Your approval rate {insightsMock.claimInsights.approvalRate}% is higher than last quarter 89%</span>
              </div>
            </>
          )}

          {tab === 'spending' && (
            <>
              <h4 style={styles.sectionTitle}>Spending - Previous Months vs Current</h4>
              {historyData.slice(-3).map(row => (
                <div key={row.month} style={styles.detailCard}>
                  <span style={{color: '#fff'}}>{row.month}</span>
                  <span style={{color: '#a1a1aa'}}>R {row.spend.toLocaleString()}</span>
                </div>
              ))}
              <h4 style={{...styles.sectionTitle, marginTop: '1.5rem'}}>Current Breakdown</h4>
              {insightsMock.spending.categories.map(cat => (
                <div key={cat.name} style={{display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
                  <span style={{color: '#a1a1aa'}}>{cat.name}</span>
                  <span style={{color: '#fff'}}>R {cat.amount.toLocaleString()}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', zIndex: 3000, padding: '2rem 1rem', overflowY: 'auto' },
  modal: { width: '100%', maxWidth: '720px', background: '#0A0A0A', borderRadius: '20px', border: '1px solid rgba(255,107,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.9)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  title: { margin: 0, color: '#fff', fontSize: '1.3rem', fontWeight: '800' },
  sub: { margin: '0.2rem 0 0 0', color: '#71717a', fontSize: '0.85rem' },
  closeBtn: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' },
  tabs: { display: 'flex', gap: '0.5rem', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' },
  tab: { padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#a1a1aa', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', whiteSpace: 'nowrap' },
  tabActive: { background: '#FF6B00', color: '#000', borderColor: '#FF6B00' },
  body: { padding: '1.5rem' },
  sectionTitle: { color: '#fff', fontSize: '1rem', fontWeight: '700', margin: '0 0 1rem 0' },
  tableHead: { display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr 0.5fr', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#71717a', fontSize: '0.75rem', textTransform: 'uppercase' },
  tableRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr 0.5fr', gap: '1rem', padding: '0.9rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#a1a1aa', fontSize: '0.85rem' },
  detailCard: { background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1rem', marginBottom: '0.8rem' },
  barTrack: { height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginTop: '0.6rem' },
  barFill: { height: '100%', background: '#FF6B00' },
  detailText: { color: '#71717a', fontSize: '0.8rem', marginTop: '0.5rem' }
};

export default DetailedInsights;