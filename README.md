# Ypomoni — Personal Safety, Reimagined

The marketing website for **Ypomoni**, a personal safety app built for the moments that matter most. Hold SOS for 3 seconds to alert your trusted contacts, share your live location, and silently collect evidence — automatically.

**Live site:** Coming soon

---

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack)
- **[React 19](https://react.dev/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)** (`@tailwindcss/postcss`)
- **[Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** — particle sphere hero scene
- **[anime.js v4](https://animejs.com/)** — scroll-linked and UI animations
- **[Framer Motion](https://www.framer.com/motion/)** — social flip button micro-interactions
- **[lucide-react](https://lucide.dev/)** — icon system
- **TypeScript 6**

---

## Features

### Interactive Phone Demo
A fully interactive phone mockup with three screens (Home, Live Map, Profile). Press and hold the SOS button to experience the 3-second confirmation flow with an animated progress ring. Trigger the alert to see the emergency mode UI and live map tracking.

### Three.js Hero Scene
A custom shader-based particle sphere with 4,200 points arranged on a Fibonacci lattice, surrounding a distorted icosahedron core with wireframe layers. Reacts to mouse movement and scroll position.

### Scroll-Driven Sections
- **HowItWorks** — sticky-scroll 3-step sequence with scroll-linked progress bar and expanding detail cards
- **Manifesto** — word-by-word scroll reveal with color transitions
- **Evidence** — scroll-linked recording progress bar with animated evidence vault mockup

### Design System
- Dark theme (`#07070b` ink base) with pink/red accent (`#ff3f68`)
- Custom glass morphism utilities (`glass`, `glass-strong`)
- Gradient text, border accents, section glows, shimmer sweep buttons
- `Space Grotesk` display + `Inter` body typography
- Full `prefers-reduced-motion` support

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/shivamkumar15/Ypomoni-web.git
cd Ypomoni-web
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens, utilities, animations
│   ├── layout.tsx           # Root layout, fonts, metadata
│   └── page.tsx             # Page composition
├── components/
│   ├── Navbar.tsx           # Fixed nav with scroll-aware glass + active section
│   ├── ScrollProgress.tsx   # Top scroll progress bar
│   ├── Reveal.tsx           # IntersectionObserver scroll reveal wrapper
│   ├── SocialFlipButton.tsx # 3D flip social links (framer-motion)
│   ├── sections/
│   │   ├── Hero.tsx         # 3D particle hero + CTAs + stats
│   │   ├── PhoneDemo.tsx    # Interactive phone mockup (3 screens)
│   │   ├── Features.tsx     # Bento grid feature tiles
│   │   ├── HowItWorks.tsx   # Sticky-scroll 3-step SOS sequence
│   │   ├── Evidence.tsx     # Evidence vault mockup + guarantees
│   │   ├── Manifesto.tsx    # Word-by-word scroll reveal
│   │   └── CTA.tsx          # Download CTA + footer
│   └── three/
│       └── HeroScene.tsx    # Three.js particle sphere + core orb
└── lib/
    ├── anime.ts             # anime.js v4 wrapper utilities
    └── utils.ts             # cn() class merge helper
```

---

## License

ISC
