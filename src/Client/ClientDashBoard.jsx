import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import Royaltie from "../Components/Royaltie";
import Consultation from "../Components/Consultation";
import { clientMock, claimDocumentsGuide, faqs } from "../mockData/clientData";
import { employeesMock } from "../mockData/employeeData";
import { insightsMock } from "../mockData/insightsData";

const ClientDashBoard = () => {
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleContinueBooking = () => {
    setShowConsultModal(false);
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById('BookaConsultation')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const maxHistory = Math.max(...clientMock.netWorth.history);

  // === AI WEALTH MODEL CALCULATION ===
  const total = clientMock.netWorth.total;
  const investments = clientMock.netWorth.breakdown.find(b=>b.label.toLowerCase().includes('invest'))?.value || 1450000;
  const spend = insightsMock.spending.thisMonth;
  const income = 80000;
  const claimsCount = clientMock.claims.length;
  const invRatio = investments / total;
  const spendRatio = spend / income;
  let score = 50;
  if (invRatio > 0.5) score += 25;
  if (spendRatio < 0.5) score += 20;
  if (claimsCount <= 1) score += 10;
  if (spendRatio > 0.7) score -= 20;
  if (claimsCount > 2) score -= 15;
  score = Math.max(0, Math.min(100, score));
  const status = score >= 75 ? "CREATE" : score < 50 ? "PRESERVE" : "STABLE";
  const growth = Math.floor((invRatio * 80000) + (spendRatio * -50000) + (claimsCount * -8000) + 10000);
  const forecastNow = total + growth * 6;
  const monthsTo3M = growth > 0 ? Math.ceil((3000000 - total) / growth) : 999;
  const actionText = status === "CREATE"
   ? `On track! Add R5k/mo to reach R3M in ${Math.max(1, monthsTo3M-2)} months`
    : status === "PRESERVE"
   ? "Risk high - cut spending to 50% and review claims"
    : "Stable - shift 10% more to investments";

  return (
    <div style={styles.dashboardContainer}>
      <Navbar onConsultClick={() => setShowConsultModal(true)} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
        html { scroll-behavior: smooth; }
        @media (max-width: 900px) {
         .mainContent { padding: 1.5rem 1rem!important; }
         .overviewGrid { grid-template-columns: 1fr!important; }
         .statsGrid { grid-template-columns: 1fr 1fr!important; }
         .bottomGrid { grid-template-columns: 1fr!important; }
         .aiGrid { grid-template-columns: 1fr!important; }
        }
      `}</style>

      <main className="mainContent" style={styles.mainContent}>

        <section id="Networth" style={styles.sectionFirst}>
          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.welcomeTitle}>Overview</h1>
              <p style={styles.subtitle}>Welcome back, {clientMock.name} - Policy {clientMock.policyNumber}</p>
            </div>
            <div style={styles.datePill}>{new Date().toDateString()}</div>
          </div>

          <div className="statsGrid" style={styles.statsGrid}>
            <div style={{...styles.statCard, ...styles.statOrange}}>
              <span style={styles.statLabel}>Total Net Worth</span>
              <h2 style={styles.statValue}>R {clientMock.netWorth.total.toLocaleString()}</h2>
              <span style={styles.statChange}>+{clientMock.netWorth.change}% this month</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>This Month Spent</span>
              <h2 style={{...styles.statValue, color: '#fff'}}>R {insightsMock.spending.thisMonth.toLocaleString()}</h2>
              <span style={styles.statSub}>Last month R {insightsMock.spending.lastMonth.toLocaleString()}</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Claims Approval Rate</span>
              <h2 style={{...styles.statValue, color: '#fff'}}>{insightsMock.claimInsights.approvalRate}%</h2>
              <span style={styles.statSub}>Avg {insightsMock.claimInsights.avgProcessingDays} days processing</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Active Claims</span>
              <h2 style={{...styles.statValue, color: '#fff'}}>{clientMock.claims.length}</h2>
              <span style={styles.statSub}>Total paid R {insightsMock.claimInsights.totalClaimsPaid.toLocaleString()}</span>
            </div>
          </div>

          {/* AI WEALTH MODEL CARD */}
          <div className="aiGrid" style={{...styles.chartCard, background: 'linear-gradient(135deg, #111 0%, #1a120a 100%)', border: '1px solid rgba(255,107,0,0.25)', marginTop: '1rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem'}}>
            <div>
              <div style={{display:'flex', gap:'1rem', alignItems:'center', marginBottom:'1rem'}}>
                <div style={{background:'rgba(255,107,0,0.12)', border:'1px solid rgba(255,107,0,0.2)', borderRadius:'10px', width:'44px', height:'44px', display:'grid', placeItems:'center', fontWeight:'800', color:'#FF8C00'}}>AI</div>
                <div>
                  <h3 style={{...styles.chartTitle, margin:0}}>Wealth Health Model</h3>
                  <span style={{...styles.statLabel, color:'#FF8C00'}}>{status} • {score}/100 • {growth>0?'+':''}R{growth.toLocaleString()}/mo</span>
                </div>
              </div>
              <p style={{...styles.actionText, marginBottom:'0.8rem'}}>{actionText}</p>
              <div style={{display:'flex', gap:'0.5rem', flexWrap:'wrap'}}>
                <span style={styles.pillOrange}>Now: R{(total/1000000).toFixed(2)}M</span>
                <span style={styles.pillOrange}>6M: R{(forecastNow/1000000).toFixed(2)}M</span>
                <span style={styles.pillOrange}>R3M in {monthsTo3M}m</span>
              </div>
            </div>
            <div>
              <p style={{...styles.statLabel, marginBottom:'0.6rem'}}>6-Month Forecast</p>
              <div style={{display:'flex', alignItems:'flex-end', gap:'6px', height:'70px'}}>
                {[total,...Array(5).fill(0).map((_,i)=> total + growth*(i+1))].map((val,i)=>{
                  const max = Math.max(total, forecastNow);
                  const h = Math.max(20, (val/max)*100);
                  return <div key={i} style={{flex:1, height:`${h}%`, background: i===0?'rgba(255,255,255,0.15)':'linear-gradient(180deg,#FF8C00,#FF6B00)', borderRadius:'4px 4px 0 0'}}></div>
                })}
              </div>
              <div style={{display:'flex', justifyContent:'space-between', marginTop:'0.4rem'}}>
                <span style={styles.miniLabel}>Now</span><span style={styles.miniLabel}>6M</span>
              </div>
            </div>
          </div>

          <div className="overviewGrid" style={styles.overviewGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Money Allocation</h3>
              {clientMock.netWorth.breakdown.map(item => {
                const percent = (item.value / clientMock.netWorth.total) * 100;
                return (
                  <div key={item.label} style={{marginBottom: '1rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem'}}>
                      <span style={styles.chartLabel}>{item.label}</span>
                      <span style={styles.chartLabel}>R {item.value.toLocaleString()} - {percent.toFixed(1)}%</span>
                    </div>
                    <div style={styles.barTrack}><div style={{...styles.barFill, width: `${percent}%`, background: item.color}}></div></div>
                  </div>
                )
              })}
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Net Worth Growth - Last 6 Months</h3>
              <div style={styles.miniChart}>
                {clientMock.netWorth.history.map((val, i) => (
                  <div key={i} style={{...styles.miniBar, height: `${(val/maxHistory)*100}%`}}>
                    <span style={styles.miniBarLabel}>R {(val/1000000).toFixed(1)}M</span>
                  </div>
                ))}
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem'}}>
                {['M1','M2','M3','M4','M5','Now'].map(m => <span key={m} style={styles.chartLabel}>{m}</span>)}
              </div>
            </div>
          </div>

          <div className="bottomGrid" style={styles.bottomGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Spending Breakdown</h3>
              {insightsMock.spending.categories.map(cat => (
                <div key={cat.name} style={{display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
                  <span style={styles.chartLabel}>{cat.name}</span>
                  <span style={{...styles.chartLabel, color: '#fff', fontWeight: '700'}}>R {cat.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Insights and Next Actions</h3>
              <p style={{...styles.chartLabel, color: '#FF8C00', marginBottom: '1rem'}}>{insightsMock.claimInsights.message}</p>
              {insightsMock.nextActions.map((action, i) => (
                <div key={i} style={styles.actionRow}>
                  <div style={styles.actionDot}></div>
                  <span style={styles.actionText}>{action}</span>
                </div>
              ))}
              <div style={{marginTop: '1.5rem', padding: '0.9rem', background: 'rgba(255,107,0,0.08)', borderRadius: '10px', border: '1px solid rgba(255,107,0,0.15)'}}>
                <span style={styles.statLabel}>Active Claims Status</span>
                {clientMock.claims.map(c => (
                  <div key={c.id} style={{marginTop: '0.6rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span style={{color: '#fff', fontSize: '0.85rem'}}>{c.id} - {c.type} (R {c.amount.toLocaleString()})</span>
                      <span style={{color: '#FF8C00', fontSize: '0.8rem'}}>{c.stage}/5</span>
                    </div>
                    <div style={styles.barTrack}><div style={{...styles.barFill, width: `${c.progress}%`}}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="MakeaClaim" style={styles.section}>
          <h2 style={styles.sectionTitle}>What You Need to Make a Claim</h2>
          <div style={styles.docGrid}>
            {claimDocumentsGuide.map((doc, i) => (
              <div key={i} style={styles.docCard}>
                <div style={styles.docCode}>{doc.code}</div>
                <div>
                  <h4 style={styles.docTitle}>{doc.title} {doc.required && <span style={{color: '#FF6B00'}}>*</span>}</h4>
                  <p style={styles.docDesc}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="BookaConsultation" style={styles.section}>
          <h2 style={styles.sectionTitle}>Book a Consultation - R1500</h2>
          {!showBooking? (
            <div style={styles.bookingCard}>
              <p style={styles.sectionDesc}>Click below to see fee and view advisor availability from employee DB.</p>
              <button style={styles.btnYes} onClick={() => setShowConsultModal(true)}>Check Fee and Book</button>
            </div>
          ) : (
            <div style={styles.docGrid}>
              {employeesMock.map(emp => (
                <div key={emp.id} style={{...styles.docCard, opacity: emp.available? 1 : 0.5, flexDirection: 'column'}}>
                  <div style={{display: 'flex', gap: '1rem', alignItems: 'center', width: '100%'}}>
                    <div style={styles.docCode}>{emp.avatar}</div>
                    <div style={{flex: 1}}>
                      <h4 style={styles.docTitle}>{emp.name}</h4>
                      <p style={styles.docDesc}>{emp.role} | {emp.specialty} | Rating: {emp.rating}</p>
                    </div>
                    <span style={{...styles.pill, background: emp.available? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)', color: emp.available? '#22c55e' : '#71717a'}}>
                      {emp.available? 'Available' : 'Fully Booked'}
                    </span>
                  </div>
                  {emp.available && (
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem'}}>
                      {emp.slots.map(s => s.times.map(t => (
                        <button key={`${s.date}-${t}`} onClick={() => setSelectedSlot(`${emp.name} - ${s.date} ${t}`)} style={{...styles.slotBtn, ...(selectedSlot === `${emp.name} - ${s.date} ${t}`? styles.slotActive : {})}}>
                          {s.date} - {t}
                        </button>
                      )))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqContainer}>
            {faqs.map((faq, i) => (
              <div key={i} style={styles.faqItem} onClick={() => setOpenFaq(openFaq === i? null : i)}>
                <div style={styles.faqQuestion}>
                  <span>{faq.q}</span>
                  <span style={{...styles.faqToggle, transform: openFaq === i? 'rotate(45deg)' : 'none'}}>+</span>
                </div>
                {openFaq === i && <p style={styles.faqAnswer}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Consultation isOpen={showConsultModal} onClose={() => setShowConsultModal(false)} onContinue={handleContinueBooking} />
      <Royaltie />
    </div>
  );
};

const styles = {
  dashboardContainer: { display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#050505', fontFamily: "'Inter', sans-serif", color: '#fff' },
  mainContent: { padding: '2rem', flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', boxSizing: 'border-box' },
  sectionFirst: { marginBottom: '2rem' },
  section: { marginTop: '4rem' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' },
  welcomeTitle: { margin: 0, fontSize: '2.2rem', fontWeight: '800', color: '#fff' },
  subtitle: { color: '#71717a', marginTop: '0.3rem', fontSize: '0.9rem' },
  datePill: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.8rem', color: '#a1a1aa' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  statCard: { padding: '1.4rem', background: '#111', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' },
  statOrange: { background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)', border: 'none' },
  statLabel: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', opacity: 0.7 },
  statValue: { fontSize: '1.6rem', fontWeight: '800', margin: '0.6rem 0 0.3rem 0' },
  statChange: { fontSize: '0.8rem', fontWeight: '700', color: '#000', background: 'rgba(0,0,0,0.15)', padding: '0.2rem 0.6rem', borderRadius: '999px' },
  statSub: { fontSize: '0.8rem', color: '#71717a' },
  overviewGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' },
  bottomGrid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1rem', marginTop: '1rem' },
  chartCard: { background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' },
  chartTitle: { fontSize: '1rem', fontWeight: '700', color: '#fff', margin: '0 0 1.2rem 0' },
  chartLabel: { fontSize: '0.85rem', color: '#a1a1aa' },
  barTrack: { height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginTop: '0.3rem' },
  barFill: { height: '100%', background: '#FF6B00' },
  miniChart: { display: 'flex', alignItems: 'flex-end', gap: '0.6rem', height: '140px', paddingTop: '1rem' },
  miniBar: { flex: 1, background: 'linear-gradient(180deg, #FF8C00, #FF6B00)', borderRadius: '6px 6px 0 0', position: 'relative', minHeight: '20px' },
  miniBarLabel: { position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: '#a1a1aa', whiteSpace: 'nowrap' },
  actionRow: { display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.7rem' },
  actionDot: { width: '6px', height: '6px', background: '#FF6B00', borderRadius: '50%', flexShrink: 0 },
  actionText: { fontSize: '0.85rem', color: '#d4d4d8' },
  sectionTitle: { fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem' },
  sectionDesc: { color: '#71717a', marginBottom: '1rem', fontSize: '0.9rem' },
  docGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' },
  docCard: { display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.2rem', background: '#111', border: '1px solid rgba(255,107,0,0.15)', borderRadius: '12px' },
  docCode: { fontSize: '0.8rem', fontWeight: '800', background: 'rgba(255,107,0,0.12)', color: '#FF8C00', width: '44px', height: '44px', display: 'grid', placeItems: 'center', borderRadius: '10px', flexShrink: 0, border: '1px solid rgba(255,107,0,0.2)' },
  docTitle: { margin: '0 0 0.2rem 0', color: '#fff', fontSize: '0.95rem' },
  docDesc: { margin: 0, color: '#71717a', fontSize: '0.85rem' },
  pill: { fontSize: '0.7rem', padding: '0.3rem 0.7rem', borderRadius: '999px', fontWeight: '700' },
  pillOrange: { fontSize:'0.7rem', padding:'0.3rem 0.7rem', borderRadius:'999px', fontWeight:'700', background:'rgba(255,107,0,0.12)', color:'#FF8C00', border:'1px solid rgba(255,107,0,0.2)' },
  miniLabel: { fontSize:'0.65rem', color:'#71717a' },
  faqContainer: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  faqItem: { background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.2rem 1.5rem', cursor: 'pointer' },
  faqQuestion: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontWeight: '600' },
  faqToggle: { color: '#FF6B00', fontSize: '1.5rem', transition: '0.3s' },
  faqAnswer: { color: '#a1a1aa', marginTop: '0.8rem', lineHeight: '1.6', fontSize: '0.9rem' },
  bookingCard: { background: '#111', border: '1px solid rgba(255,107,0,0.15)', borderRadius: '16px', padding: '1.8rem' },
  btnYes: { padding: '0.9rem 1.5rem', borderRadius: '999px', border: 'none', background: '#FF6B00', color: '#000', fontWeight: '800', cursor: 'pointer' },
  slotBtn: { padding: '0.5rem 0.9rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.8rem', cursor: 'pointer' },
  slotActive: { background: '#FF6B00', color: '#000', borderColor: '#FF6B00', fontWeight: '800' }
};

export default ClientDashBoard;