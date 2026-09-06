// This is your Star Schema Model for PowerBI
export const PowerBIModel = {
  // FACT TABLES (numbers that change every second)
  Fact_NetWorth: {
    clientId: "CLI-88291",
    timestamp: "2026-09-06T10:00:00Z",
    totalValue: 2450890,
    investmentValue: 1450000,
    savingsValue: 650000,
    insuranceValue: 351890
  },
  Fact_Claims: {
    claimId: "CLM-001",
    clientId: "CLI-88291",
    amount: 25000,
    status: "Under Verification",
    daysInStage: 3,
    isDelayed: false
  },
  Fact_Consultations: {
    consultationId: "CONS-01",
    employeeId: "EMP-01",
    clientId: "CLI-88291",
    fee: 1500,
    status: "Confirmed",
    timestamp: "2026-09-10T14:00:00Z"
  },

  // DIMENSION TABLES (lookup tables)
  Dim_Client: {
    clientId: "CLI-88291",
    name: "Unathi Siganeko",
    policyNumber: "RS-8849201-P",
    riskScore: "Medium"
  },
  Dim_Employee: {
    employeeId: "EMP-01",
    name: "Thandi Nkosi",
    specialty: "Investments"
  }
}

// For real-time streaming dataset in PowerBI
export const realTimeStreamExample = {
  // You will POST this to PowerBI Streaming API every 5 seconds from your backend
  netWorth: 2450890,
  activeClaims: 2,
  avgClaimTime: 6,
  consultationRevenue: 1500,
  timestamp: new Date().toISOString()
}