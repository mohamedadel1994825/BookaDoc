🔗 Live Demo
BookaDoc 
A responsive and accessible doctor appointment booking UI module for healthcare platforms.
✨ Features

🧑‍⚕️ Doctor Directory - Browse through a list of doctors with specialty, availability, and location information
🔍 Specialty Filtering - Filter doctors by their specialty to find the right specialist
📅 Booking Modal - Select available time slots and book appointments with an intuitive interface
📋 Appointments Summary - View and manage your booked appointments in one place

🛠️ Tech Stack

⚛️ Framework: Next.js with TypeScript
🗄️ State Management: Redux Toolkit
🎨 Styling: Tailwind CSS
♿ Accessibility: ARIA attributes and keyboard navigation

🚀 Setup Instructions

Clone the repository:

bashgit clone https://github.com/mohamedadel1994825/BookaDoc
cd BookaDoc

Install dependencies:

bashnpm install --legacy-peer-deps

Run the development server:

bashnpm run dev

Open http://localhost:3000 in your browser to see the application.

🤖 How AI Tools Were Used

📝 Code Scaffolding - Used AI to scaffold the basic component structure
📊 Mock Data Generation - Generated realistic doctor data with specialties and availability
♿ Accessibility Improvements - Enhanced keyboard navigation and added appropriate ARIA attributes
📱 Responsive Design - Implemented responsive layouts for mobile, tablet, and desktop views

♿ Accessibility Features

⌨️ Full keyboard navigation support
📑 Proper heading structure
🏷️ ARIA attributes for interactive elements
🔍 Focus management in modal dialogs
📱 Responsive design for all screen sizes
👁️ High contrast text for readability

📁 Project Structure
src/
├── app/ # Next.js app router pages
├── components/ # Reusable components
├── hooks/ # Custom hooks
├── middleware/ # Custom middleware
├── schemas/ # Schema validation with Yup
├── store/ # Redux store configuration & slices
├── styles/ # Global styles
├── types/ # TypeScript type definitions
└── utils/ # Formatting Data
⏭️ Known Limitations and Next Steps

🔌 Backend Integration - Currently uses mock data; ready to integrate with a real backend API
🔒 Authentication - Would add user authentication for personalized appointment management
🔍 Doctor Search - Could implement text search functionality for doctor names
🔔 Notifications - Add appointment reminders and confirmations
⭐ Doctor Reviews - Implement a system for viewing and leaving doctor reviews
