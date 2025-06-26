export const mockComplaints = [
  {
    id: 1,
    title: "Login Issues",
    description: "Unable to login to the platform. Getting error message 'Invalid credentials' even with correct password.",
    status: "Open",
    priority: "High",
    category: "Technical",
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    },
    school: "Groupe Scolaire L'initiale",
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-03-15T14:20:00Z",
    assignedTo: "Support Team",
    attachments: ["screenshot1.png", "error_log.txt"]
  },
  {
    id: 2,
    title: "Payment Processing Error",
    description: "Payment is being deducted twice from my account for the same subscription.",
    status: "In Progress",
    priority: "High",
    category: "Billing",
    user: {
      id: 102,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=random"
    },
    school: "Groupe Scolaire Lavoisier",
    createdAt: "2024-03-14T09:15:00Z",
    updatedAt: "2024-03-15T11:45:00Z",
    assignedTo: "Billing Team",
    attachments: ["payment_receipt.pdf", "bank_statement.pdf"]
  },
  {
    id: 3,
    title: "Course Content Not Loading",
    description: "Video lessons are not loading properly. Getting buffering issues and sometimes the video stops completely.",
    status: "Open",
    priority: "Medium",
    category: "Content",
    user: {
      id: 103,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=random"
    },
    school: "Groupe Scolaire Tangerine",
    createdAt: "2024-03-13T16:45:00Z",
    updatedAt: "2024-03-14T10:30:00Z",
    assignedTo: "Content Team",
    attachments: ["video_error.mp4"]
  },
  {
    id: 4,
    title: "Account Deactivation Request",
    description: "I would like to deactivate my account and request a refund for the remaining subscription period.",
    status: "Closed",
    priority: "Low",
    category: "Account",
    user: {
      id: 104,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      avatar: "https://ui-avatars.com/api/?name=Emily+Brown&background=random"
    },
    school: "Groupe Scolaire Al Jabr",
    createdAt: "2024-03-12T13:20:00Z",
    updatedAt: "2024-03-13T15:10:00Z",
    assignedTo: "Account Team",
    attachments: ["refund_request.pdf"]
  },
  {
    id: 5,
    title: "Mobile App Crashes",
    description: "The mobile app crashes every time I try to access the quiz section. This happens on both Android and iOS.",
    status: "In Progress",
    priority: "High",
    category: "Technical",
    user: {
      id: 105,
      name: "David Lee",
      email: "david.lee@example.com",
      avatar: "https://ui-avatars.com/api/?name=David+Lee&background=random"
    },
    school: "Bewize",
    createdAt: "2024-03-11T11:00:00Z",
    updatedAt: "2024-03-14T09:15:00Z",
    assignedTo: "Mobile Team",
    attachments: ["crash_log.txt", "device_info.json"]
  },
  {
    id: 6,
    title: "Incorrect Course Progress",
    description: "My course progress is showing as 0% even though I have completed several lessons. The progress bar is not updating.",
    status: "Open",
    priority: "Medium",
    category: "Content",
    user: {
      id: 106,
      name: "Lisa Garcia",
      email: "lisa.garcia@example.com",
      avatar: "https://ui-avatars.com/api/?name=Lisa+Garcia&background=random"
    },
    school: "Groupe Scolaire L'initiale",
    createdAt: "2024-03-10T14:30:00Z",
    updatedAt: "2024-03-12T16:45:00Z",
    assignedTo: "Content Team",
    attachments: ["progress_screenshot.png"]
  },
  {
    id: 7,
    title: "Email Notifications Not Working",
    description: "I'm not receiving email notifications for new lessons and updates. Checked spam folder and email settings.",
    status: "Closed",
    priority: "Low",
    category: "Technical",
    user: {
      id: 107,
      name: "Alex Chen",
      email: "alex.chen@example.com",
      avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=random"
    },
    school: "Groupe Scolaire Lavoisier",
    createdAt: "2024-03-09T08:45:00Z",
    updatedAt: "2024-03-11T12:20:00Z",
    assignedTo: "Support Team",
    attachments: []
  },
  {
    id: 8,
    title: "Subscription Renewal Issue",
    description: "My subscription was supposed to auto-renew but it didn't. Now I can't access premium content.",
    status: "In Progress",
    priority: "High",
    category: "Billing",
    user: {
      id: 108,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      avatar: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random"
    },
    school: "Groupe Scolaire Tangerine",
    createdAt: "2024-03-08T15:20:00Z",
    updatedAt: "2024-03-14T13:30:00Z",
    assignedTo: "Billing Team",
    attachments: ["subscription_details.pdf"]
  }
];

export const complaintCategories = [
  "Technical",
  "Billing", 
  "Content",
  "Account",
  "General"
];

export const complaintPriorities = [
  "Low",
  "Medium", 
  "High",
  "Critical"
];

export const complaintStatuses = [
  "Open",
  "In Progress",
  "Resolved",
  "Closed"
]; 