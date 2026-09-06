import React, { useState } from 'react';
import api from '../api';
import './RoyalTheme.css';

export default function InsuranceSelector() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [idNumber, setIdNumber] = useState('');
    const [riskAddress, setRiskAddress] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        if(!idNumber || !riskAddress || !monthlyIncome) {
            alert('Please fill all fields');
            return;
        }
        setSaving(true);
        try {
            const res = await api.post('/insurance-applications', {
                category: selectedCategory,
                idNumber,
                riskAddress,
                monthlyIncome: Number(monthlyIncome),
                provider: "TO_BE_ASSIGNED_BY_BROKER",
                status: "PENDING_REVIEW",
                fspNumber: "29370"
            });
            console.log('Saved:', res.data);
            setSubmitted(true);
        } catch(err) {
            console.error(err);
            alert('Backend not reachable. Check: 1) Spring Boot running on 8080? 2) Open http://localhost:8080/api/insurance-applications in browser. Error: ' + (err.message));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="royal-root">
            <div className="royal-nav">
                <span>RSF Gateway Module</span> <span>Onboarding Hub</span> <span className="active">Existing Client Dashboard</span>
            </div>

            <div className="royal-header">
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <div style={{background:'#ff8a1a', width:'40px', height:'40px', borderRadius:'10px', display:'grid', placeItems:'center', fontWeight:800}}>R</div>
                    <h1><span style={{color:'white'}}>Royal</span> <span style={{color:'#ff8a1a'}}> Dashboard</span></h1>
                </div>

                <p style={{color:'#94a3b8', marginTop:'8px'}}>Royal Square Financial (Pty) Ltd | FSP No. 29370</p>
                <h2 style={{fontSize:'32px', fontWeight:800, marginTop:'16px'}}>New Client Insurance Cover Application Framework</h2>
                <p style={{color:'#64748b', fontSize:'13px', fontStyle:'italic'}}>*Note: Clients submit criteria profiles. Product providers are assigned internally by Royal Square brokers.</p>

                {!submitted && (
                    <div style={{marginTop:'20px'}}>
                        <h3>1. Select Required Cover Category:</h3>
                        <div style={{display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'12px'}}>
                            {['Car','Life','Home','Business','Personal','Funeral'].map(cat => (
                                <button key={cat} className={selectedCategory===cat ? 'royal-btn' : 'royal-btn-dark'} onClick={() => setSelectedCategory(cat)} style={{width:'auto'}}>
                                    {cat} Insurance Cover
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {selectedCategory && !submitted && (
                    <div className="royal-card-dark" style={{marginTop:'20px'}}>
                        <h3>2. Complete {selectedCategory} Application Intake Profile:</h3>
                        <label style={{marginTop:'12px', display:'block'}}>South African ID Number / Passport:</label>
                        <input className="royal-input" type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="e.g. 950812..." />

                        <label style={{marginTop:'12px', display:'block'}}>Physical Risk Address (FICA Verification):</label>
                        <input className="royal-input" type="text" value={riskAddress} onChange={(e) => setRiskAddress(e.target.value)} placeholder="e.g. 13th Floor, Braamfontein" />

                        <label style={{marginTop:'12px', display:'block'}}>Gross Monthly Income Estimation (R):</label>
                        <input className="royal-input" type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} placeholder="e.g. 25000" />

                        <div style={{marginTop:'15px', padding:'10px', background:'#1a2442', border:'1px dashed #334155', borderRadius:'8px'}}>
                            <p style={{fontSize:'12px'}}><strong>Mandatory Acknowledgment Matrix:</strong> By submitting this folder, you authorize Royal Square Financial to evaluate your portfolio structure and select an optimized provider from our approved network (including Santam, Discovery, Sanlam, and Old Mutual) on your behalf.</p>
                        </div>

                        <button className="royal-btn" onClick={handleSubmit} disabled={saving} style={{marginTop:'15px'}}>
                            {saving ? 'Submitting to Broker Desk...' : 'Submit Application Folder to Broker Desk'}
                        </button>
                    </div>
                )}

                {submitted && (
                    <div className="royal-card-dark" style={{marginTop:'20px', border:'1px solid #22c55e', background:'#0f2815'}}>
                        <h3>✔ Application Filed Successfully!</h3>
                        <p>Your <strong>{selectedCategory} Cover profile packet</strong> has been sent.</p>
                        <p style={{color:'#94a3b8', fontSize:'13px'}}>A Royal Square Financial advisor will review your FICA criteria within 3 business days.</p>
                        <button className="royal-btn-dark" style={{marginTop:'12px'}} onClick={() => { setSelectedCategory(''); setSubmitted(false); setIdNumber(''); setRiskAddress(''); setMonthlyIncome(''); }}>
                            Apply for Another Asset Cover Block
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}