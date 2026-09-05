import React from 'react';
import InvestmentForm from './Client/InvestmentForm';

export default function App() {
  return (
    <div>
      <h1>Royal Square Financial Portal</h1>
      <hr />
      {/* Rendering your investment engine component onto the screen */}
      <InvestmentForm />
    </div>
  );
}
