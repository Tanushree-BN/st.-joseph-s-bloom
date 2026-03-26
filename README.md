# St. Joseph's Bloom

Welcome to the official web platform for St. Joseph's Bloom. This repository houses the frontend architecture and administrative dashboard for the school's website, delivering a modern, responsive, and interactive experience for students, parents, and administrators alike.

## 🚀 Features

### Public Portal
- **Home & About**: Comprehensive overview of the institution, mission, and vision.
- **Academics**: Details on the curriculum and academic programs.
- **Facilities**: Information about the state-of-the-art campus facilities.
- **Admissions**: Streamlined online admission process with digital form submissions.
- **Gallery**: Visual showcase of campus life and events.
- **News & Events**: Up-to-date announcements and calendar.
- **Principal's Message**: Direct communication from the head of the institution.
- **Mandatory Disclosures**: Essential regulatory and compliance information.
- **Contact**: Reach out easily with forms and maps.

### Administrative Dashboard
- **Admin Login**: Secure authentication for school administrators.
- **Dashboard Management**: Centralized hub to manage admissions, website content, and events dynamically.

## 🛠 Technology Stack

This project is built using modern web development standards to ensure high performance, maintainability, and accessibility:

- **Frontend Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GIT_URL>
   cd st.-joseph-s-bloom
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```text
st.-joseph-s-bloom/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── pages/              # Route components (Index, About, Admissions, etc.)
│   ├── App.tsx             # Main application routing
│   └── main.tsx            # Application entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # Project documentation
```

## 📜 Available Scripts

- `npm run dev` - Starts the development server with Hot Module Replacement (HMR).
- `npm run build` - Builds the application for production.
- `npm run lint` - Runs ESLint to check for code quality issues.
- `npm run preview` - Previews the production build locally.
- `npm test` - Runs Vitest test cases.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
*Built with ❤️ for St. Joseph's Bloom.*
