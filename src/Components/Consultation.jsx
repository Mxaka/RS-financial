import React from 'react';

const Consultation= ({ isOpen, onClose, onContinue }) => {
  if (!isOpen) return null;

  const handleNo = () => {
    onClose();
    window.location.hash = '#Networth';
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Book Consultation</h2>
          <button style={styles.closeBtn} onClick={onClose}>x</button>
        </div>

        <div style={styles.body}>
          <div style={styles.feeBox}>
            <span style={styles.feeLabel}>Consultation Fee</span>
            <span style={styles.feeAmount}>R 1500</span>
            <span style={styles.feeSub}>Once-off payment, 60 min session</span>
          </div>

          <p style={styles.text}>
            This fee covers a full financial review with a certified advisor.
            Your slot will only be confirmed after payment.
          </p>

          <p style={styles.question}>Would you like to continue?</p>
        </div>

        <div style={styles.footer}>
          <button style={styles.btnNo} onClick={handleNo}>
            No
          </button>
          <button style={styles.btnYes} onClick={onContinue}>
            Yes, Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', zIndex: 2000, padding: '1rem'
  },
  modal: {
    width: '100%', maxWidth: '440px', background: '#111',
    borderRadius: '20px', border: '1px solid rgba(255,107,0,0.25)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,107,0,0.15)',
    overflow: 'hidden'
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  title: { margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: '800' },
  closeBtn: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' },
  body: { padding: '1.5rem' },
  feeBox: { background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)', borderRadius: '14px', padding: '1.2rem', display: 'flex', flexDirection: 'column', textAlign: 'center', marginBottom: '1.2rem' },
  feeLabel: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', opacity: 0.8, color: '#000' },
  feeAmount: { fontSize: '2.2rem', fontWeight: '900', color: '#000', margin: '0.2rem 0' },
  feeSub: { fontSize: '0.75rem', color: '#000', opacity: 0.7 },
  text: { color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' },
  question: { color: '#fff', fontWeight: '700', fontSize: '1rem', margin: 0 },
  footer: { display: 'flex', gap: '0.8rem', padding: '0 1.5rem 1.5rem 1.5rem' },
  btnNo: { flex: 1, padding: '0.9rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', fontWeight: '700', cursor: 'pointer' },
  btnYes: { flex: 1, padding: '0.9rem', borderRadius: '999px', border: 'none', background: '#FF6B00', color: '#000', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px rgba(255,107,0,0.4)' }
};

export default Consultation;