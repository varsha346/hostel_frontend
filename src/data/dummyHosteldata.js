// --- 1. ROOMS DATA (Used in Student_Dashboard and RoomDetailPage) ---
// Note the fields: roomNo, category, photos, size, currOccu, fees.
export const DUMMY_ROOMS = [
    {
        roomNo: "101",
        category: "Single",
        photos: ["https://picsum.photos/seed/room101/400/300"],
        size: 1, // Max capacity
        currOccu: 0, // Current occupancy
        fees: 15000,
    },
    {
        roomNo: "102",
        category: "Double",
        photos: ["https://picsum.photos/seed/room102/400/300"],
        size: 2,
        currOccu: 2,
        fees: 10000,
    },
    {
        roomNo: "201",
        category: "Triple",
        photos: ["https://picsum.photos/seed/room201/400/300"],
        size: 3,
        currOccu: 1,
        fees: 8000,
    },
    {
        roomNo: "305",
        category: "Suite",
        photos: [], // No image to test your 'No Image' fallback
        size: 1,
        currOccu: 1,
        fees: 25000,
    },
];

// --- 2. NOTICES DATA (Used in both Dashboards) ---
export const DUMMY_NOTICES = [
    {
        noticeId: 1,
        title: "Mess Timings Update",
        description: "New dinner timings are effective from tomorrow: 7:00 PM to 8:30 PM.",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
        noticeId: 2,
        title: "Semester Fee Payment Deadline",
        description: "Last date for fee payment is Oct 30. Penalty will apply thereafter.",
        createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    },
];

// --- 3. COMPLAINTS DATA (Used in both Dashboards) ---
// Note the required fields: status (for Pie Chart), createdAt/date (for Bar Chart)
export const DUMMY_COMPLAINTS = [
    { compId: 1, subject: "Leaky Faucet in Bathroom", status: "Pending", createdAt: new Date(Date.now() - 3600000).toISOString() }, // 1 hour ago
    { compId: 2, subject: "Slow WiFi Speed", status: "Processing", createdAt: new Date(Date.now() - 7200000).toISOString() }, // 2 hours ago
    { compId: 3, subject: "Broken Window Pane", status: "Resolved", createdAt: new Date(Date.now() - 86400000).toISOString() }, // 1 day ago
    { compId: 4, subject: "Pest Control Needed", status: "Pending", createdAt: new Date(Date.now() - 259200000).toISOString() }, // 3 days ago
    { compId: 5, subject: "Dining Hall Lights", status: "Rejected", createdAt: new Date(Date.now() - 604800000).toISOString() }, // 7 days ago
];

// --- 4. LEAVES DATA (Used only in Warden_Dashboard) ---
export const DUMMY_LEAVES = [
    { leaveId: 1, studentName: "Rahul Sharma", startDate: "2025-10-07", endDate: "2025-10-10", reason: "Family function.", status: "Pending" },
    { leaveId: 2, studentName: "Anjali Verma", startDate: "2025-10-15", endDate: "2025-10-17", reason: "Medical appointment.", status: "Approved" },
];

// --- 5. ALLOCATIONS DATA (Used only in CurrentAllocations) ---
export const DUMMY_ALLOCATIONS = [
    {
        stuId: 501,
        dept: "IT",
        contact: "9876543210",
        guardianContact: "9988776655",
        address: "Pune, Maharashtra",
        contractEndDate: "2026-05-31",
        user: { name: "Aditya Singh" },
        room: { roomNo: "102" }
    },
    {
        stuId: 502,
        dept: "Comp Sci",
        contact: "9000011111",
        guardianContact: "9000022222",
        address: "Nagpur, Maharashtra",
        contractEndDate: "2026-05-31",
        user: { name: "Sonia Patel" },
        room: { roomNo: "201" }
    },
];
