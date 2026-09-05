import React, { useState } from 'react';

export const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: 'networth', label: 'Overview', href: '#Networth' },
    { id: 'makeaclaim', label: 'Make a Claim', href: '#MakeaClaim' },
    { id: 'track', label: 'Track Claim', href: '#TrackYourClaim' },
    { id: 'consult', label: 'Consultation', href: '#BookaConsultation' },
    { id: 'profile', label: 'Profile', href: '#UpdateYourProfile' },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>R</span>
          Royal<span style={styles.logoAccent}>Dashboard</span>
        </div>

        <ul className="nav-links-desktop" style={styles.navLinks}>
          {links.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                style={{
                  ...styles.link,
                  ...(hovered === item.id ? styles.linkHover : {}),
                }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="cta-desktop" style={styles.cta}>
          <div style={styles.liveDot}></div> Live
        </div>

        <div className="hamburger" style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div style={{...styles.bar, transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></div>
          <div style={{...styles.bar, opacity: isOpen ? 0 : 1}}></div>
          <div style={{...styles.bar, transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'}}></div>
        </div>

        {isOpen && (
          <div className="mobile-menu" style={styles.mobileMenu}>
            {links.map((item) => (
              <a key={item.id} href={item.href} style={styles.mobileLink} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

const styles = {
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 1.5rem', background: 'rgba(10, 10, 10, 0.9)',
    backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 107, 0, 0.15)',
    color: '#fff', position: 'sticky', top: 0, zIndex: 1000,
  },
  logo: { fontWeight: '900', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoIcon: { background: 'linear-gradient(135deg, #FF6B00, #FFA500)', color: '#000', width: '32px', height: '32px', display: 'grid', placeItems: 'center', borderRadius: '8px' },
  logoAccent: { color: '#FF8C00', fontWeight: '400' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '0.5rem', margin: 0, padding: 0 },
  link: { color: '#a1a1aa', textDecoration: 'none', padding: '0.6rem 1.1rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.3s ease', border: '1px solid transparent', display: 'block' },
  linkHover: { color: '#fff', background: 'rgba(255, 107, 0, 0.15)', borderColor: 'rgba(255, 107, 0, 0.4)', boxShadow: '0 0 20px rgba(255, 107, 0, 0.25)' },
  cta: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#FF8C00', border: '1px solid rgba(255, 140, 0, 0.3)', padding: '0.4rem 0.9rem', borderRadius: '999px', background: 'rgba(255, 140, 0, 0.08)' },
  liveDot: { width: '7px', height: '7px', background: '#FF6B00', borderRadius: '50%', boxShadow: '0 0 10px #FF6B00' },
  hamburger: { display: 'none', flexDirection: 'column', gap: '5px', cursor: 'pointer', zIndex: 1001 },
  bar: { width: '24px', height: '2.5px', background: '#FF8C00', borderRadius: '2px', transition: '0.3s' },
  mobileMenu: { position: 'absolute', top: '100%', left: 0, right: 0, background: '#0A0A0A', borderBottom: '1px solid rgba(255,107,0,0.2)', flexDirection: 'column', padding: '1rem', display: 'none', gap: '0.5rem' },
  mobileLink: { color: '#fff', textDecoration: 'none', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }
};