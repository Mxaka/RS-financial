// Insights client will see
export const insightsMock = {
  spending: {
    thisMonth: 45200,
    lastMonth: 38900,
    categories: [
      { name: "Insurance Premium", amount: 12500 },
      { name: "Investments", amount: 20000 },
      { name: "Fees", amount: 1500 },
      { name: "Other", amount: 11200 },
    ]
  },
  claimInsights: {
    approvalRate: 94,
    avgProcessingDays: 6,
    totalClaimsPaid: 1250000,
    message: "Your claims are 20% faster than average due to complete documentation."
  },
  nextActions: [
    "Upload outstanding police report for CLM-002",
    "Your investment review is due in 5 days",
    "Policy RS-8849201-P renews on 2026-10-01"
  ]
};