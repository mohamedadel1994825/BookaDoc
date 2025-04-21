# BookaDoc

A responsive and accessible doctor appointment booking UI module for healthcare platforms.

## 🔗 [Live Demo](https://book-a-doc-sooty.vercel.app/)

## ✨ Features

- 🧑‍⚕️ **Doctor Directory**: Browse through a list of doctors with their specialty, availability, and location information.
- 🔍 **Specialty Filtering**: Filter doctors by their specialty to easily find the right specialist.
- 📅 **Booking Modal**: Select available time slots and book appointments with an intuitive interface.
- 📋 **Appointments Summary**: View and manage your booked appointments in one place.

## 🛠️ Tech Stack

- ⚛️ **Framework**: Next.js with TypeScript
- 📊 **Http**: React Query
- 🎨 **Styling**: Tailwind CSS
- ♿ **Accessibility**: ARIA attributes and keyboard navigation

## 🚀 Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/mohamedadel1994825/BookaDoc
cd BookaDoc
```

2. Install dependencies

```bash
npm install --legacy-peer-deps
```

3. Run the development server

```bash
npm run dev
```

4. Visit http://localhost:3000 in your browser to see the application.

## 🤖 How AI Tools Were Used

- 📝 **Code Scaffolding**: AI was used to scaffold the basic component structure.
- 📊 **Mock Data Generation**: Realistic doctor data was generated with specialties and availability.
- ♿ **Accessibility Improvements**: Enhanced keyboard navigation and added appropriate ARIA attributes.
- 📱 **Responsive Design**: Implemented responsive layouts for mobile, tablet, and desktop views.

## ♿ Accessibility Features

- ⌨️ Full keyboard navigation support
- 📑 Proper heading structure
- 🏷️ ARIA attributes for interactive elements
- 🔍 Focus management in modal dialogs
- 📱 Responsive design for all screen sizes
- 👁️ High contrast text for readability

## 📁 Project Structure

```bash
src/
├── app/         # Next.js app router pages
├── components/  # Reusable components
├── hooks/       # Custom hooks
├── middleware/  # Custom middleware
├── schemas/     # Schema validation with Yup
├── store/       # Redux store configuration & slices
├── styles/      # Global styles
├── types/       # TypeScript type definitions
└── utils/       # Formatting Data
```

## ⏭️ Known Limitations and Next Steps

- 🔌 **Backend Integration**: Currently uses mock data; ready for backend API integration.
- 🔒 **Authentication**: Plan to add user authentication for personalized appointment management.
- 🔍 **Doctor Search**: Could implement a search feature for doctor names.
- 🔔 **Notifications**: Add appointment reminders and confirmations.
- ⭐ **Doctor Reviews**: Implement a system for viewing and leaving doctor reviews.
