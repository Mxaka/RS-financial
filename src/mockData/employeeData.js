// Service Provider / Advisor discovery
export const employeesMock = [
  {
    id: "EMP-01",
    name: "Thandi Nkosi",
    role: "Senior Financial Advisor",
    specialty: "Investments and Retirement",
    rating: 4.9,
    consultationsDone: 312,
    available: true,
    avatar: "TN",
    slots: [
      { date: "2026-09-06", times: ["09:00", "11:00", "14:00"] },
      { date: "2026-09-07", times: ["10:00", "13:00", "15:00"] },
      { date: "2026-09-09", times: ["09:00", "14:00", "16:30"] },
    ]
  },
  {
    id: "EMP-02",
    name: "James Petersen",
    role: "Claims Specialist",
    specialty: "Medical and Life Claims",
    rating: 4.8,
    consultationsDone: 189,
    available: true,
    avatar: "JP",
    slots: [
      { date: "2026-09-06", times: ["08:30", "10:30", "15:00"] },
      { date: "2026-09-08", times: ["09:00", "11:30", "14:00"] },
    ]
  },
  {
    id: "EMP-03",
    name: "Aisha Mohammed",
    role: "Wealth Manager",
    specialty: "Portfolio Growth",
    rating: 5.0,
    consultationsDone: 450,
    available: false,
    avatar: "AM",
    slots: []
  },
];