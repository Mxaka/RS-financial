import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import OnboardingHub from './Client/OnboardingHub.jsx';
import InvestmentForm from './Client/InvestmentForm.jsx';
import InsuranceSelector from './Client/InsuranceSelector.jsx';
import ClientDashBoard from './Client/ClientDashBoard.jsx';
import './Client/RoyalTheme.css';

const API = axios.create({ baseURL: 'http://localhost:8080/api/v1' });

// --- YOUR DATA PAGE (now with clean URL /your-data) ---
function YourDataPage() {
    const [clientId, setClientId] = useState('12345');
    const [address, setAddress] = useState('10 Main Rd, Sandton, 2196');
    const [bankName, setBankName] = useState('Capitec');
    const [accountNo, setAccountNo] = useState('123456');
    const [branchCode, setBranchCode] = useState('470010');
    const [claimId] = useState('CLM001');
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('client');

    const call = async (fn) => {
        try {
            const res = await fn();
            setResult(res.data);
            setStatus({ type: 'success', msg: 'Successfully Sent' });
        } catch (e) {
            const msg = e.response?.data?.message || e.response?.data || e.message;
            setResult({ reason: msg });
            setStatus({ type: 'fail', msg: 'Not Sent', reason: msg });
        }
    };

    return (
        <div className="royal-header">
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <div style={{background:'#ff8a1a', width:'40px', height:'40px', borderRadius:'10px', display:'grid', placeItems:'center', fontWeight:800, color:'white'}}>Y</div>
                <h1><span style={{color:'white'}}>Your</span> <span style={{color:'#ff8a1a'}}> Data</span></h1>
            </div>
            <p style={{color:'#94a3b8', marginTop:'8px'}}>React → Spring Boot → Sanlam / Glacier / Santam</p>

            <div style={{ display: 'flex', gap: 10, margin: '20px 0' }}>
                <button onClick={() => setActiveTab('client')} className={activeTab==='client'? 'royal-btn' : 'royal-btn-dark'} style={{width:'auto', padding:'10px 20px'}}>Client Module</button>
                <button onClick={() => setActiveTab('claims')} className={activeTab==='claims'? 'royal-btn' : 'royal-btn-dark'} style={{width:'auto', padding:'10px 20px'}}>Claims Module</button>
            </div>

            <div className="royal-card-dark">
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <label>Client ID:</label>
                    <input className="royal-input" value={clientId} onChange={e=>setClientId(e.target.value)} style={{width:'150px'}} />
                </div>

                {activeTab === 'client'? (
                    <>
                        <h2 style={{marginTop:'20px'}}>1. Client Module (Sanlam & Glacier)</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop:'15px' }}>
                            <div className="royal-card-dark" style={{border:'1px solid #1e293b'}}>
                                <h4 style={{color:'#ff8a1a'}}>Change Address</h4>
                                <input className="royal-input" value={address} onChange={e=>setAddress(e.target.value)} />
                                <button className="royal-btn" onClick={()=>call(()=>API.post(`/clients/${clientId}/address`, { newAddress: address }))}>Submit to Sanlam</button>
                            </div>
                            <div className="royal-card-dark" style={{border:'1px solid #1e293b'}}>
                                <h4 style={{color:'#ff8a1a'}}>Change Bank Details</h4>
                                <input className="royal-input" value={bankName} onChange={e=>setBankName(e.target.value)} placeholder="Bank Name" style={{marginBottom:'6px'}} />
                                <input className="royal-input" value={accountNo} onChange={e=>setAccountNo(e.target.value)} placeholder="Account No" style={{marginBottom:'6px'}} />
                                <input className="royal-input" value={branchCode} onChange={e=>setBranchCode(e.target.value)} placeholder="Branch Code" />
                                <button className="royal-btn" onClick={()=>call(()=>API.post(`/clients/${clientId}/banking`, { bank: bankName, accountNo, branchCode }))}>Update Banking</button>
                            </div>
                            <div className="royal-card-dark" style={{border:'1px solid #1e293b'}}>
                                <h4 style={{color:'#38bdf8'}}>Policy Document</h4>
                                <button className="royal-btn" style={{background:'#0ea5e9'}} onClick={()=>call(()=>API.get(`/clients/POL123/document`))}>Request Document</button>
                            </div>
                            <div className="royal-card-dark" style={{border:'1px solid #1e293b'}}>
                                <h4 style={{color:'#a78bfa'}}>Glacier IRP5 & Balance</h4>
                                <button className="royal-btn" style={{background:'#6f42c1'}} onClick={()=>call(()=>API.get(`/clients/${clientId}/irp5?year=2025`))}>Get IRP5 2025</button>
                                <button className="royal-btn-dark" style={{marginTop:'8px'}} onClick={()=>call(()=>API.get(`/clients/${clientId}/balance`))}>Balance Sheet</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 style={{marginTop:'20px'}}>2. Claims Module (Santam - Full Workflow)</h2>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop:'15px' }}>
                            <button className="royal-btn" style={{width:'auto', background:'#fd7e14'}} onClick={()=>call(()=>API.post(`/claims/${claimId}/repair-quote`, { amount: 15000, garage: "Panelbeaters SA", description: "Front bumper" }))}>1. Submit Quote</button>
                            <button className="royal-btn" style={{width:'auto', background:'#22c55e'}} onClick={()=>call(()=>API.post(`/claims/${claimId}/authorize`, { approved: true, approvedAmount: 14500 }))}>2. Authorise (Santam)</button>
                            <button className="royal-btn" style={{width:'auto', background:'#0ea5e9'}} onClick={()=>call(()=>API.post(`/claims/${claimId}/schedule`, { repairDate: "2026-09-20", needsCarHire: true }))}>3. Schedule + Car Hire</button>
                            <button className="royal-btn" style={{width:'auto', background:'#a855f7'}} onClick={()=>call(()=>API.post(`/claims/${claimId}/car-hire`, { provider: "Avis", days: 5 }))}>4. Car Hire</button>
                            <button className="royal-btn" style={{width:'auto', background:'#64748b'}} onClick={()=>call(()=>API.get(`/claims/${claimId}/updates`))}>5. Weekly Updates</button>
                        </div>
                    </>
                )}

                <div style={{ marginTop: 20 }}>
                    {!status && <div className="royal-card-dark" style={{border:'1px dashed #334155', textAlign:'center', padding:'20px'}}><p style={{color:'#475569'}}>Click any button to send</p></div>}
                    {status && (
                        <div className="royal-card-dark" style={{border: status.type==='success'? '1px solid #16a34a' : '1px solid #dc2626', background: status.type==='success'? '#052e16' : '#450a0a'}}>
                            <h3 style={{color: status.type==='success'? '#22c55e' : '#ef4444', margin:0}}>{status.type==='success'? '✅ Successfully Sent' : '❌ Not Sent'}</h3>
                            <p style={{color: status.type==='success'? '#86efac' : '#fca5a5', fontSize:'13px', marginTop:'6px'}}>{status.type==='success'? 'Data sent to provider.' : `Reason: ${status.reason}`}</p>
                            <button className="royal-btn-dark" style={{width:'auto', padding:'4px 12px', fontSize:'11px', marginTop:'10px'}} onClick={()=>{setStatus(null); setResult(null);}}>Clear</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- NAV THAT HIGHLIGHTS CURRENT URL ---
function TopNav() {
    const loc = useLocation();
    const is = (p) => loc.pathname === p;
    return (
        <div className="royal-nav">
            <strong>RSF Gateway Module</strong> |
            <Link to="/onboarding" className={is('/onboarding')||is('/')? 'royal-nav-active' : 'royal-nav-link'}>Onboarding Hub</Link> |
            <Link to="/dashboard" className={is('/dashboard')? 'royal-nav-active' : 'royal-nav-link'}>Existing Client Dashboard</Link> |
            <Link to="/your-data" className={is('/your-data')? 'royal-nav-active-orange' : 'royal-nav-link'}>Your Data</Link>
        </div>
    );
}

// --- WRAPPER TO MAKE OLD COMPONENTS WORK WITH NAVIGATE ---
function OnboardingWrapper() {
    const nav = useNavigate();
    return <OnboardingHub setActiveScreen={(s)=>{ if(s==='dashboard') nav('/dashboard'); else if(s==='investment') nav('/investment'); else if(s==='insurance') nav('/insurance'); else nav('/onboarding'); }} />;
}
function DashboardWrapper() {
    const nav = useNavigate();
    return <ClientDashBoard setActiveScreen={(s)=>nav('/'+s)} />;
}
function InvestmentWrapper() {
    const nav = useNavigate();
    return <InvestmentForm setActiveScreen={(s)=>nav('/'+s)} />;
}
function InsuranceWrapper() {
    const nav = useNavigate();
    return <InsuranceSelector setActiveScreen={(s)=>nav('/'+s)} />;
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="royal-root">
                <TopNav />
                <Routes>
                    <Route path="/" element={<OnboardingWrapper />} />
                    <Route path="/onboarding" element={<OnboardingWrapper />} />
                    <Route path="/dashboard" element={<DashboardWrapper />} />
                    <Route path="/investment" element={<InvestmentWrapper />} />
                    <Route path="/insurance" element={<InsuranceWrapper />} />
                    <Route path="/your-data" element={<YourDataPage />} />
                    <Route path="/track-claim" element={<YourDataPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}