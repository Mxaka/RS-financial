import React from 'react';
import './RoyalTheme.css';

export default function OnboardingHub({ setActiveScreen }) {
    return (
        <div className="royal-root">
            <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
                <button onClick={() => setActiveScreen('onboarding')} style={{background:'#ff8a1a', color:'white', padding:'8px 14px', borderRadius:'6px', border:'none', cursor:'pointer'}}>Onboarding Hub</button>
                <button onClick={() => setActiveScreen('dashboard')} style={{background:'white', color:'#0f172a', padding:'8px 14px', borderRadius:'6px', border:'none', cursor:'pointer'}}>Existing Client Dashboard</button>
            </div>

            <div className="royal-header">
                <h1 style={{fontSize:'36px', fontWeight:800}}>Welcome to Your Financial Future!</h1>
                <p style={{color:'#94a3b8', marginTop:'8px'}}>Royal Square Financial (Pty) Ltd | FSP No. 29370 - Select your path:</p>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginTop:'30px'}}>

                    <div className="royal-card-dark">
                        <h2>Wealth & Investment</h2>
                        <p style={{color:'#94a3b8', fontSize:'13px', marginTop:'10px'}}>Unit Trusts, Endowments, Stokvels, JSE Portfolios, Education and Emergency Funds.</p>
                        <button
                            type="button"
                            onClick={() => { console.log('clicked investment'); setActiveScreen('investment'); }}
                            style={{marginTop:'20px', background:'#ff8a1a', color:'white', padding:'12px', borderRadius:'10px', border:'none', width:'100%', cursor:'pointer', fontWeight:'bold'}}
                        >
                            Launch Investment Portfolio Portal →
                        </button>
                    </div>

                    <div className="royal-card-dark">
                        <h2>Asset Protection & Insurance</h2>
                        <p style={{color:'#94a3b8', fontSize:'13px', marginTop:'10px'}}>Car, Life, Home, Business, Personal, and Funeral Insurance frameworks.</p>
                        <button
                            type="button"
                            onClick={() => { console.log('clicked insurance'); setActiveScreen('insurance'); }}
                            style={{marginTop:'20px', background:'#0ea5e9', color:'white', padding:'12px', borderRadius:'10px', border:'none', width:'100%', cursor:'pointer', fontWeight:'bold'}}
                        >
                            Open Insurance Application Desk →
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}