import React, { useState } from 'react';
import { Navbar } from '../Components/Navbar';

const ClientDashBoard = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const documents = [
    { code: "ID", title: "ID Document", desc: "Certified copy of South African ID or Passport" },
    { code: "POA", title: "Proof of Address", desc: "Municipal bill or bank statement not older than 3 months" },
    { code: "BNK", title: "Bank Statement", desc: "For payout verification and account holder confirmation" },
    { code: "POL", title: "Police Report", desc: "Required if claim is accident or theft related" },
    { code: "MED", title: "Medical Reports", desc: "Doctor report, hospital invoices and prescriptions" },
    { code: "PLCY", title: "Policy Number", desc: "Your RS-Financial policy document or card" },
  ];

  const faqs = [
    { q: "How long does a claim take?", a: "Standard claims are processed within 5-7 business days once all documents are verified. Complex claims may take up to 14 days." },
    { q: "What if I miss a document?", a: "Your claim will move to Pending Documents stage. You will get an SMS and email notification of exactly what is missing." },
    { q: "Is my profile information secure?", a: "Yes. We use bank-level AES-256 encryption. Updating confidential info requires OTP and verification." },
    { q: "Can I book a consultation after hours?", a: "Yes. Our advisors have slots from 08:00 - 19:00 weekdays, and 09:00 - 13:00 on Saturdays. Availability is shown live." },
  ];

  return (
    <div style={styles.dashboardContainer}>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
        @media (max-width: 768px) {
          .mainContent { padding: 1.5rem 1rem !important; }
          .welcomeTitle { font-size: 1.8rem !important; }
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main className="mainContent" style={styles.mainContent}>
        <div style={styles.headerSection}>
          <h1 className="welcomeTitle" style={styles.welcomeTitle}>
            Welcome to <span style={styles.gradientText}>RS-Financial</span>
          </h1>
          <p style={styles.subtitle}>Manage your portfolio, claims and consultations in one place.</p>
        </div>

        <div className="grid" style={styles.grid}>
          <div style={{...styles.card, ...styles.cardOrange}}>
            <span style={styles.cardLabel}>Net Worth Status</span>
            <h2 style={styles.cardValue}>R 2,450,890.00</h2>
            <p style={styles.cardSub}>+12.4% this month</p>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Active Claims</span>
            <h2 style={{...styles.cardValue, color: '#fff'}}>2 Active</h2>
            <p style={styles.cardSub}>Stage 3: Under Verification</p>
            <div style={styles.progressBar}><div style={styles.progressFill}></div></div>
          </div>
        </div>

        <section id="MakeaClaim" style={styles.section}>
          <h2 style={styles.sectionTitle}>What You Need to Make a Claim</h2>
          <p style={styles.sectionDesc}>Have these ready before you start. Missing documents will delay your claim.</p>
          <div style={styles.docGrid}>
            {documents.map((doc, i) => (
              <div key={i} style={styles.docCard}>
                <div style={styles.docCode}>{doc.code}</div>
                <div>
                  <h4 style={styles.docTitle}>{doc.title}</h4>
                  <p style={styles.docDesc}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqContainer}>
            {faqs.map((faq, i) => (
              <div key={i} style={styles.faqItem} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={styles.faqQuestion}>
                  <span>{faq.q}</span>
                  <span style={{...styles.faqToggle, transform: openFaq === i ? 'rotate(45deg)' : 'none'}}>+</span>
                </div>
                {openFaq === i && <p style={styles.faqAnswer}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  dashboardContainer: { display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#050505', fontFamily: "'Inter', sans-serif", color: '#fff' },
  mainContent: { padding: '2.5rem', flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' },
  headerSection: { marginBottom: '2.5rem', borderLeft: '4px solid #FF6B00', paddingLeft: '1.5rem' },
  welcomeTitle: { margin: 0, fontSize: '2.8rem', fontWeight: '800', color: '#fff' },
  gradientText: { background: 'linear-gradient(90deg, #FF6B00, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { color: '#a1a1aa', marginTop: '0.75rem', fontSize: '1.05rem' },
  grid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginTop: '2rem' },
  card: { padding: '1.8rem', background: 'linear-gradient(180deg, #141414 0%, #0A0A0A 100%)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa' },
  cardOrange: { background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)', color: '#000', border: 'none' },
  cardLabel: { fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', opacity: 0.8 },
  cardValue: { fontSize: '1.8rem', fontWeight: '800', margin: '0.8rem 0 0.2rem 0' },
  cardSub: { fontSize: '0.85rem', margin: 0 },
  progressBar: { marginTop: '1.2rem', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' },
  progressFill: { width: '60%', height: '100%', background: '#FF6B00' },
  section: { marginTop: '4rem' },
  sectionTitle: { fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' },
  sectionDesc: { color: '#71717a', marginBottom: '1.5rem' },
  docGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' },
  docCard: { display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.2rem', background: '#111', border: '1px solid rgba(255,107,0,0.15)', borderRadius: '12px' },
  docCode: { fontSize: '0.8rem', fontWeight: '800', background: 'rgba(255,107,0,0.12)', color: '#FF8C00', width: '44px', height: '44px', display: 'grid', placeItems: 'center', borderRadius: '10px', flexShrink: 0, border: '1px solid rgba(255,107,0,0.2)' },
  docTitle: { margin: '0 0 0.2rem 0', color: '#fff', fontSize: '0.95rem' },
  docDesc: { margin: 0, color: '#71717a', fontSize: '0.85rem' },
  faqContainer: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  faqItem: { background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.2rem 1.5rem', cursor: 'pointer' },
  faqQuestion: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontWeight: '600' },
  faqToggle: { color: '#FF6B00', fontSize: '1.5rem', transition: '0.3s' },
  faqAnswer: { color: '#a1a1aa', marginTop: '0.8rem', lineHeight: '1.6', fontSize: '0.9rem' }
};

export default ClientDashBoard;