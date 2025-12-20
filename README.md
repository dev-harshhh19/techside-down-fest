<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind">
</p>

<h1 align="center">
  ⚡ TechXpression: Techside Down ⚡
</h1>

<p align="center">
  <strong>Enter the portal to the ultimate tech experience</strong>
  <br>
  <em>A Stranger Things themed tech fest website built for March 15-17, 2025</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-development">Development</a>
</p>

---

## ✨ Features

### 🎭 Immersive Experience
- **Stranger Things Atmosphere** - MindFlayer particles, Vecna veins, animated vines, and character silhouettes
- **Cinematic Intro Animation** - TV static, flickering lights, and portal effects
- **Dynamic Audio Player** - Immersive background music with controls

### 📱 Modern & Responsive
- **Mobile-First Design** - Fully optimized for all devices
- **Lazy Loading** - Code-split sections for fast initial load
- **Reduced Motion Support** - Respects user accessibility preferences

### 🎪 Event Sections
| Section | Description |
|---------|-------------|
| **Hero** | Dynamic countdown timer with glitch effects |
| **About** | Event details with animated reveal |
| **Events** | Interactive event cards with registration modals |
| **Schedule** | Three-day event timeline |
| **Gallery** | Showcase of past events |
| **Sponsors** | Partnership tiers display |

### 💳 Registration & Payments
- **Event Registration Modal** - Seamless registration flow
- **UPI Payment Integration** - QR code generation for payments
- **Form Validation** - Powered by React Hook Form + Zod

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework with Suspense & lazy loading |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible component library |
| **Framer Motion** | Smooth animations |
| **Three.js** | 3D effects & particles |

### Libraries
| Library | Purpose |
|---------|---------|
| `react-router-dom` | Client-side routing |
| `@tanstack/react-query` | Server state management |
| `react-hook-form` + `zod` | Form handling & validation |
| `lucide-react` | Icon library |
| `sonner` | Toast notifications |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/dev-harshhh19/techside-down-fest.git

# Navigate to project directory
cd techside-down-fest

# Install dependencies
npm install
# or with bun
bun install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

---

## 📁 Project Structure

```
techside-down-fest/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── sections/       # Page sections (Hero, About, Events, etc.)
│   │   ├── ui/             # shadcn/ui components (49 components)
│   │   ├── IntroAnimation.tsx
│   │   ├── EventRegistrationModal.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...             # Atmosphere components (MindFlayer, VecnaVeins, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/
│   │   ├── Index.tsx       # Main landing page
│   │   └── NotFound.tsx    # 404 page
│   ├── App.tsx             # App entry point with routing
│   ├── main.tsx            # React DOM render
│   └── index.css           # Global styles & Tailwind config
├── index.html              # HTML template with SEO meta tags
├── tailwind.config.ts      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── package.json
```

---

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Performance Features

- **Code Splitting** - Lazy-loaded pages and sections
- **Query Caching** - 5-minute stale time with React Query
- **Conditional Rendering** - Atmosphere effects disabled on mobile
- **Suspense Boundaries** - Graceful loading states

### Development Monitor

A built-in performance monitor (`DevPerformanceMonitor`) displays FPS and render metrics during development.

---

## 🎨 Theming

The project uses a custom Stranger Things-inspired dark theme with:

- **Primary Colors**: Neon red/crimson accents
- **Typography**: Cinzel, Orbitron, Abril Fatface, EB Garamond fonts
- **Effects**: Glitch text, pulsing glows, particle systems

Theme variables are defined in `src/index.css` and `tailwind.config.ts`.

---

## 🔒 Security

The application implements security headers in `index.html`:

- Content Security Policy (CSP)
- X-Content-Type-Options
- Strict Referrer Policy

---

## 📄 License

This project is private and proprietary.

---

<p align="center">
  <strong>Built with 🔮 for TechXpression 2025</strong>
  <br>
  <em>"Friends don't lie, but code shouldn't either."</em>
</p>
