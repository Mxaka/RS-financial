import React from 'react';
import { Navbar } from '../Components/Navbar';

const ClientDashBoard = () => {
  return (
    <div style={styles.dashboardContainer}>

      <Navbar />

      <main style={styles.mainContent}>
        <h1 style={styles.welcomeTitle}>Welcome to RS-Financial Portal</h1>
        <p style={styles.subtitle}>Select an option from the navigation bar above to manage your portfolio.</p>

        <div style={styles.grid}>
          <div style={styles.card}>Net Worth Status Block</div>
          <div style={styles.card}>Active Claims Track Panel</div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#0A0A0A',
    fontFamily: 'sans-serif'
  },
  mainContent: {
    padding: '2.5rem',
    flex: 1
  },
  welcomeTitle: {
    margin: 0,
    fontSize: '1.75rem',
    color: '#0f172a'
  },
  subtitle: {
    color: '#64748b',
    marginTop: '0.5rem'
  },
  grid: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  card: {
    flex: 1,
    padding: '1.5rem',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    color: '#475569'
  }
};

export default ClientDashBoard;
