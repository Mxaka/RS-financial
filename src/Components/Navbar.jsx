import React from 'react';

export const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>RoyalDashboard</div>
      <ul style={styles.navLinks}>
        <li><a href="#overview" style={styles.link}>Overview</a></li>
        <li><a href="#claims" style={styles.link}>Track Claim</a></li>
        <li><a href="#consultation" style={styles.link}>Book Consultation</a></li>
        <li><a href="#profile" style={styles.link}>Update Profile</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#8F011B',
    color: '#fff'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem'
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '1.5rem',
    margin: 0,
    padding: 0
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none'
  }
};

export default Navbar;
