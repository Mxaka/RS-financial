// Client portfolio, claims, consultations
export const clientMock = {
  id: "CLI-88291",
  name: "Unathi Siganeko",
  email: "unathi.siganeko@email.com",
  policyNumber: "RS-8849201-P",
  netWorth: {
    total: 2450890.00,
    change: 12.4,
    breakdown: [
      { label: "Investments", value: 1450000, color: "#FF6B00" },
      { label: "Savings", value: 650000, color: "#FFA500" },
      { label: "Insurance Cash Value", value: 351890, color: "#FFB347" },
    ],
    history: [1800000, 1950000, 2100000, 2250000, 2380000, 2450890]
  },
  claims: [
    { id: "CLM-001", type: "Medical", amount: 25000, status: "Under Verification", stage: 3, date: "2026-08-20", progress: 60 },
    { id: "CLM-002", type: "Vehicle Accident", amount: 85000, status: "Assessment", stage: 2, date: "2026-08-28", progress: 40 },
  ],
  consultations: [
    { id: "CONS-01", date: "2026-09-10", time: "14:00", advisor: "Thandi Nkosi", status: "Confirmed", fee: 1500 },
  ]
};

export const claimDocumentsGuide = [
  { code: "ID", title: "ID Document", desc: "Certified copy of SA ID or Passport", required: true },
  { code: "POA", title: "Proof of Address", desc: "Municipal bill or bank statement < 3 months", required: true },
  { code: "BNK", title: "Bank Statement", desc: "For payout verification", required: true },
  { code: "POL", title: "Police Report", desc: "Required for accident/theft claims", required: false },
  { code: "MED", title: "Medical Reports", desc: "Doctor report, invoices, prescriptions", required: false },
  { code: "PLCY", title: "Policy Number", desc: "RS-Financial policy doc", required: true },
];

export const faqs = [
  { q: "How long does a claim take?", a: "Standard claims 5-7 business days once all documents verified. Complex claims up to 14 days." },
  { q: "What if I miss a document?", a: "Claim moves to Pending Documents. You get SMS and email of what is missing." },
  { q: "Is my profile information secure?", a: "Yes. Bank-level AES-256 encryption. Updating requires OTP and verification." },
  { q: "Can I book after hours?", a: "Slots 08:00-19:00 weekdays, 09:00-13:00 Saturdays. Availability shown live from advisor DB." },
];