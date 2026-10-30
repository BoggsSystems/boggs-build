# Boggs Systems — Corporate Web Presence (`boggs.build`)

Official corporate web application and media hub for **Boggs Systems Inc.**

## Overview
- **Brand & Domain**: [boggs.build](https://boggs.build)
- **Founder**: Jeffrey Boggs (uOttawa Software Engineering Inaugural Class Alum)
- **Book**: *The New Physics of Software Velocity: From Prompts to Autonomous Loops*
- **Recruitment**: uOttawa SEG Capstone 2026/2027 sponsorship & 10 student software engineering roles.

## Architecture
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailored dark-mode CSS with glassmorphism and ambient lighting
- **Interactive Media**: Integrated with DigitPop player and VOD speedrun streams
- **Deployment**: Optimized for Railway deployment with dynamic `$PORT` binding

## Local Development
```bash
# Install dependencies
pnpm install # or npm install

# Run dev server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Railway Deployment
1. Connect the repository `BoggsSystems/boggs-build` in Railway.
2. Railway detects the Node/Vite buildpack (`npm run build` and `npm run start`).
3. Add the custom domain `boggs.build` in Railway's Networking settings.
4. Point the DNS CNAME record in Cloudflare to Railway.
