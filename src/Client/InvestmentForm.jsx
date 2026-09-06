import React, { useState } from 'react';
import api from '../api';
import './RoyalTheme.css';


export default function InvestmentForm({ setActiveScreen }){
    const [termBracket, setTermBracket] = useState('1-3');
    const [product, setProduct] = useState('Emergency Fund');
    const [monthlyAmount, setMonthlyAmount] = useState(2000);
    const [showQuote, setShowQuote] = useState(false);
    const [saving, setSaving] = useState(false);

    const upfrontCommissionRate = 0.03;
    let calculatedYears = 3; let growthMultiplier = 0.07;
    let horizonLabel = "1 to 3 years"; let complianceRiskScore = 6;
    if (termBracket === 'less-1') { calculatedYears = 1; growthMultiplier = 0.05; horizonLabel = "Less than one year"; complianceRiskScore = 3; }
    else if (termBracket === '3-5') { calculatedYears = 5; growthMultiplier = 0.09; horizonLabel = "3 to 5 years"; complianceRiskScore = 9; }
    else if (termBracket === 'over-5') { calculatedYears = 10; growthMultiplier = 0.12; horizonLabel = "In excess of 5 years"; complianceRiskScore = 13; }

    const totalContributions = monthlyAmount * 12 * calculatedYears;
    const commissionFee = totalContributions * upfrontCommissionRate;
    const activeWorkingCapital = totalContributions - commissionFee;
    const estimatedPayout = Math.round(activeWorkingCapital * (1 + growthMultiplier));

    const handleConfirm = async () => {
        setSaving(true);
        try {
            await api.post('/investments', {
                termBracket, product, monthlyAmount, calculatedYears, growthMultiplier,
                horizonLabel, complianceRiskScore, totalContributions, commissionFee,
                activeWorkingCapital, estimatedPayout, status:"ACTIVE"
            });
            alert('Mandate Saved to Dashboard! R ' + estimatedPayout.toLocaleString('en-ZA'));
        } catch(e) {
            alert('Failed: ' + e.message);
        } finally { setSaving(false); }
    };

    return (
        <div className="royal-root">
            <div className="royal-nav">
                <span onClick={() => setActiveScreen('onboarding')} style={{cursor:'pointer'}}>Onboarding Hub</span>
                <span onClick={() => setActiveScreen('dashboard')} style={{cursor:'pointer'}} className="active">Existing Client Dashboard</span>
            </div>

            <div className="royal-header">
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <div style={{background:'#ff8a1a', width:'40px', height:'40px', borderRadius:'10px', display:'grid', placeItems:'center', fontWeight:800, fontSize:'20px'}}>R</div>
                    <h1><span style={{color:'white'}}>Royal</span> <span style={{color:'#ff8a1a'}}> Dashboard</span></h1>
                </div>

                <h2 style={{fontSize:'32px', fontWeight:800, marginTop:'16px'}}>Onboarding: Investment</h2>
                <p style={{color:'#94a3b8'}}>Welcome, New Client - FSP No. 29370</p>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginTop:'24px'}}>
                    <div className="royal-card-orange">
                        <p style={{fontSize:'12px', letterSpacing:'1px'}}>TOTAL NET WORTH PREVIEW</p>
                        <h2 style={{fontSize:'28px', margin:'8px 0'}}>R {totalContributions.toLocaleString('en-ZA')}</h2>
                        <span className="royal-badge">Tier {complianceRiskScore} - {horizonLabel}</span>
                    </div>
                    <div className="royal-card-dark">
                        <p style={{fontSize:'12px', color:'#94a3b8'}}>ESTIMATED MATURITY TARGET</p>
                        <h2 style={{fontSize:'28px', color:'#38bdf8'}}>R {estimatedPayout.toLocaleString('en-ZA')}</h2>
                        <p style={{fontSize:'12px', color:'#64748b'}}>Net Active R {activeWorkingCapital.toLocaleString('en-ZA')}</p>
                    </div>
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginTop:'20px'}}>
                    <div className="royal-card-dark">
                        <label>Select Target Investment Term:</label>
                        <select className="royal-input" value={termBracket} onChange={e=>{setTermBracket(e.target.value); setShowQuote(false)}}>
                            <option value="less-1">Less than one year</option>
                            <option value="1-3">1 to 3 years</option>
                            <option value="3-5">3 to 5 years</option>
                            <option value="over-5">In excess of 5 years</option>
                        </select>

                        <label style={{marginTop:'12px', display:'block'}}>Select Product Classification:</label>
                        <select className="royal-input" value={product} onChange={e=>setProduct(e.target.value)}>
                            {complianceRiskScore <= 6 ? <>
                                <option>Emergency Fund</option><option>Stokvels Investment</option><option>Investment Clubs</option>
                            </> : <>
                                <option>Unit Trusts</option><option>Endowments</option><option>Education Fund</option><option>Offshore Portfolios</option><option>Personal Share Portfolio (JSE Listed Shares)</option>
                            </>}
                        </select>

                        <label style={{marginTop:'12px', display:'block'}}>Monthly Saving Input (R):</label>
                        <input className="royal-input" type="number" value={monthlyAmount} onChange={e=>setMonthlyAmount(Number(e.target.value))} />

                        <button className="royal-btn" style={{marginTop:'16px'}} onClick={()=>setShowQuote(true)}>Generate Investment Quote Summary</button>
                    </div>

                    {showQuote && (
                        <div className="royal-card-dark" style={{border:'1px solid #ff8a1a'}}>
                            <h3>Official Wealth Cost Statement</h3>
                            <p style={{fontSize:'13px', color:'#cbd5e1', marginTop:'10px'}}>Compliance Risk Score: Matrix Tier {complianceRiskScore}</p>
                            <p style={{fontSize:'13px'}}>Selected: {product}</p>
                            <hr style={{borderColor:'#1e293b', margin:'12px 0'}}/>
                            <p>Total Capital: R {totalContributions.toLocaleString('en-ZA')}</p>
                            <p>Commission 3%: - R {commissionFee.toLocaleString('en-ZA')}</p>
                            <p>Net Active: R {activeWorkingCapital.toLocaleString('en-ZA')}</p>
                            <h3 style={{color:'#ff8a1a', marginTop:'12px'}}>Maturity: R {estimatedPayout.toLocaleString('en-ZA')}</h3>
                            <button className="royal-btn" style={{marginTop:'12px'}} onClick={handleConfirm} disabled={saving}>
                                {saving ? 'Saving...' : 'Confirm Mandate & Save to Dashboard'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}