import React, { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const PowerBIReport = ({ reportId, embedUrl, accessToken }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // MOCK TOKEN FOR NOW - replace with real token from backend
  const mockEmbedConfig = {
    type: 'report',
    id: reportId || 'YOUR_REPORT_ID_FROM_POWERBI',
    embedUrl: embedUrl || 'https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&groupId=YOUR_WORKSPACE_ID',
    accessToken: accessToken || 'MOCK_TOKEN',
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: { visible: false },
        pageNavigation: { visible: true }
      },
      background: models.BackgroundType.Transparent,
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Live Insights - Power BI</h3>
        <span style={styles.liveBadge}>
          <span style={styles.dot}></span> REAL TIME
        </span>
      </div>

      {!accessToken ? (
        <div style={styles.placeholder}>
          <h4 style={{color: '#fff'}}>Connect your Power BI report here</h4>
          <p style={{color: '#71717a', fontSize: '0.9rem'}}>
            Publish your report in Power BI Service, then paste Report ID and Embed URL in props.<br/>
            For now showing mock dashboards below.
          </p>

          {/* MOCK DASHBOARD UNTIL POWERBI IS CONNECTED */}
          <div style={styles.mockGrid}>
            <div style={styles.mockCard}>
              <span style={styles.mockLabel}>Live Net Worth</span>
              <span style={styles.mockValue}>R 2,450,890</span>
              <span style={styles.mockSub}>Updated via Power BI DirectQuery</span>
            </div>
            <div style={styles.mockCard}>
              <span style={styles.mockLabel}>Claims in Real Time</span>
              <span style={styles.mockValue}>2 Active</span>
              <span style={styles.mockSub}>Streaming dataset</span>
            </div>
          </div>
        </div>
      ) : (
        <PowerBIEmbed
          embedConfig={mockEmbedConfig}
          cssClassName="powerbi-report"
          getEmbeddedComponent={(embeddedReport) => {
            console.log('Report loaded', embeddedReport);
            setIsLoaded(true);
          }}
        />
      )}
    </div>
  );
};

const styles = {
  container: { background: '#111', borderRadius: '16px', border: '1px solid rgba(255,107,0,0.15)', overflow: 'hidden' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  title: { margin: 0, color: '#fff', fontSize: '1rem' },
  liveBadge: { display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '0.3rem 0.7rem', borderRadius: '999px', border: '1px solid rgba(34,197,94,0.2)' },
  dot: { width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' },
  placeholder: { padding: '2rem', textAlign: 'center' },
  mockGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', textAlign: 'left' },
  mockCard: { background: '#0A0A0A', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' },
  mockLabel: { fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', display: 'block' },
  mockValue: { fontSize: '1.4rem', fontWeight: '800', color: '#fff', display: 'block', margin: '0.5rem 0' },
  mockSub: { fontSize: '0.75rem', color: '#FF8C00' }
};

export default PowerBIReport;