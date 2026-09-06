import React, { useState, useRef, useEffect } from "react";
import { clientMock } from "../mockData/clientData";
import { insightsMock } from "../mockData/insightsData";

const Royaltie = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: `Hi, I'm Royaltie 👑 Your Royal Square Financial assistant.\n\nI can see your portfolio: R${(clientMock.netWorth.total/1000000).toFixed(2)}M net worth, ${clientMock.claims.length} active claims. How can I help you create more wealth today?` }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const getResponse = (q) => {
    const lower = q.toLowerCase();
    const total = clientMock.netWorth.total;
    const spend = insightsMock.spending.thisMonth;
    const investments = clientMock.netWorth.breakdown.find(b=>b.label.toLowerCase().includes('invest'))?.value || 1450000;
    const approval = insightsMock.claimInsights.approvalRate;

    if (lower.includes('wealth') || lower.includes('net worth') || lower.includes('how much')) {
      return `Your total net worth is R${total.toLocaleString()} with +${clientMock.netWorth.change}% growth this month. ${((investments/total)*100).toFixed(1)}% is in investments - that's excellent for creating wealth. You're on track to R3M in about 8 months if you maintain this.`;
    }
    if (lower.includes('spend') || lower.includes('saving') || lower.includes('budget')) {
      return `You spent R${spend.toLocaleString()} this month (last month R${insightsMock.spending.lastMonth.toLocaleString()}). Your top category is ${insightsMock.spending.categories[0].name} - R${insightsMock.spending.categories[0].amount.toLocaleString()}. If you reduce spending to 50% of income, you could save an extra R${(40000-spend).toLocaleString()} monthly.`;
    }
    if (lower.includes('claim')) {
      return `You have ${clientMock.claims.length} active claims. Approval rate is ${approval}% and avg processing is ${insightsMock.claimInsights.avgProcessingDays} days. ${clientMock.claims.map(c=>`${c.id} (${c.type}) is at stage ${c.stage}/5 - ${c.progress}%`).join(', ')}. ${insightsMock.claimInsights.message}`;
    }
    if (lower.includes('invest')) {
      return `Your investment allocation is strong at R${investments.toLocaleString()}. My model predicts R${Math.floor(investments*0.008).toLocaleString()}/mo growth from investments alone. Recommendation: Increase investment ratio to 65% to accelerate to R3M. Want me to calculate the impact?`;
    }
    if (lower.includes('r3m') || lower.includes('goal') || lower.includes('3m')) {
      const gap = 3000000 - total;
      return `Goal: R3M. Current: R${total.toLocaleString()}. Gap: R${gap.toLocaleString()}. At current growth you need ~8 months. If you add R5,000/mo to investments, you'll reach it in 6 months. Shall I show the forecast?`;
    }
    if (lower.includes('consult') || lower.includes('advisor') || lower.includes('book')) {
      return `I can book you with our top advisors. Fee is R1500. Our advisors are available from the employee DB with ratings 4.8+. Would you like me to show available slots for tomorrow?`;
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return `Hello ${clientMock.name}! 👑 Royaltie here. I help Royal Square clients create wealth. Ask me about your wealth score, spending, claims, or R3M goal.`;
    }
    return `I can help with:\n• "What is my wealth score?"\n• "How much did I spend?"\n• "My claims status?"\n• "When will I reach R3M?"\n• "Investment advice?"\n\nWhat would you like to know?`;
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const botMsg = { role: "bot", text: getResponse(input) };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* FAB Button */}
      {!open && (
        <button onClick={() => setOpen(true)} style={styles.fab}>
          <span style={styles.fabIcon}>R</span> Ask Royaltie
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div style={styles.window}>
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.avatar}>R</div>
              <div>
                <div style={styles.name}>Royaltie</div>
                <div style={styles.status}><span style={styles.dot}></span> Royal Square Financial AI • Live</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={styles.close}>✕</button>
          </div>

          <div style={styles.msgs}>
            {messages.map((m, i) => (
              <div key={i} style={m.role === "bot" ? styles.botRow : styles.userRow}>
                {m.role === "bot" && <div style={styles.botAvatar}>R</div>}
                <div style={m.role === "bot" ? styles.botBubble : styles.userBubble}>
                  {m.text.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div style={styles.quick}>
            {["Wealth score", "Spending", "Claims", "R3M goal"].map(q => (
              <button key={q} onClick={() => { setInput(q); setTimeout(()=>{ const bot={role:"bot", text:getResponse(q)}; setMessages(m=>[...m, {role:"user", text:q}, bot]); }, 100); }} style={styles.chip}>{q}</button>
            ))}
          </div>

          <div style={styles.inputRow}>
            <input
              style={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask Royaltie about your wealth..."
            />
            <button onClick={send} style={styles.send}>↑</button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  fab: { position: 'fixed', bottom: 20, right: 20, background: 'linear-gradient(135deg, #FF6B00, #FF8C00)', color: '#000', border: 'none', padding: '0.85rem 1.3rem', borderRadius: '999px', fontWeight: '800', fontFamily: 'Inter, sans-serif', cursor: 'pointer', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(255,107,0,0.35)' },
  fabIcon: { background: '#000', color: '#FF8C00', width: '24px', height: '24px', display: 'grid', placeItems: 'center', borderRadius: '6px', fontSize: '0.8rem' },
  window: { position: 'fixed', bottom: 20, right: 20, width: 360, height: 480, background: '#0A0A0A', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 16, display: 'flex', flexDirection: 'column', zIndex: 9999, fontFamily: 'Inter, sans-serif', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', overflow: 'hidden' },
  header: { padding: '0.9rem 1.1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111' },
  headerLeft: { display: 'flex', gap: '0.7rem', alignItems: 'center' },
  avatar: { background: 'linear-gradient(135deg, #FF6B00, #FFA500)', color: '#000', width: '36px', height: '36px', display: 'grid', placeItems: 'center', borderRadius: '10px', fontWeight: '900' },
  name: { fontWeight: '800', fontSize: '0.95rem', color: '#fff' },
  status: { fontSize: '0.7rem', color: '#71717a', display: 'flex', alignItems: 'center', gap: '0.3rem' },
  dot: { width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' },
  close: { background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer' },
  msgs: { flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: '#050505' },
  botRow: { display: 'flex', gap: '0.6rem', alignItems: 'flex-start' },
  userRow: { display: 'flex', justifyContent: 'flex-end' },
  botAvatar: { background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.2)', color: '#FF8C00', width: '28px', height: '28px', display: 'grid', placeItems: 'center', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 },
  botBubble: { background: '#111', border: '1px solid rgba(255,255,255,0.06)', padding: '0.7rem 0.9rem', borderRadius: '12px 12px 12px 4px', fontSize: '0.82rem', color: '#d4d4d8', lineHeight: 1.5, maxWidth: '78%', whiteSpace: 'pre-wrap' },
  userBubble: { background: '#FF6B00', color: '#000', padding: '0.7rem 0.9rem', borderRadius: '12px 12px 4px 12px', fontSize: '0.82rem', fontWeight: '600', maxWidth: '78%' },
  quick: { display: 'flex', gap: '0.4rem', padding: '0.6rem 0.9rem', borderTop: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', background: '#0A0A0A' },
  chip: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa', padding: '0.35rem 0.7rem', borderRadius: '999px', fontSize: '0.7rem', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: '600' },
  inputRow: { display: 'flex', gap: '0.5rem', padding: '0.7rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#111' },
  input: { flex: 1, background: '#050505', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '0.6rem 0.9rem', color: '#fff', outline: 'none', fontSize: '0.82rem' },
  send: { background: '#FF6B00', border: 'none', width: 36, height: 36, borderRadius: '50%', fontWeight: '800', cursor: 'pointer', color: '#000' }
};

export default Royaltie;