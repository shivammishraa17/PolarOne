# ❄️ POLAR ONE: Integrated Polar Expedition Logistics & Asset Management System
**Team:** CryoNauts | **Smart India Hackathon 2026**

[![Production Build](https://img.shields.io/badge/Production%20Build-Passing%20(100%25)-emerald?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Digital%20Twin-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

---

## 🧭 Executive Summary

**POLAR ONE** is a unified operational command platform engineered for extreme, low-connectivity polar environments. Built for polar research organizations (such as NCAOR, USAP, and AWI), it replaces fragmented spreadsheets, manual radio manifests, and disconnected logs with an end-to-end mission platform following the operational loop:

$$\text{PLAN} \longrightarrow \text{COLLECT} \longrightarrow \text{VISUALIZE} \longrightarrow \text{PREDICT} \longrightarrow \text{SIMULATE} \longrightarrow \text{RESPOND} \longrightarrow \text{LEARN}$$

Every operational module is connected dynamically through a central state engine:
- Sea-ice delays immediately contract fuel and ration runways.
- Fuel runway breaching the 15-day threshold triggers critical alerts and drops the Mission Readiness Score.
- What-If Simulator models compound disruptions and applies real-time load-shedding mitigations.
- Field crises trigger an automated 8-step Emergency Response Center with 1-click team dispatch.
- Satellite blackouts automatically activate local client-side persistence and queue mutations until reconnection.

---

## 🗺️ Continental Multi-Station Support

POLAR ONE features a **Global Station / Region Switcher** with zero page reload, maintaining distinct telemetry, cargo corridors, machinery assets, weather metrics, and localized emergency logs across 5 continental stations:

| Research Station | Sovereign Operator | Sector / Region | Coordinates | Elevation | Climate / Environment | Active Expedition |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bharati Station** | 🇮🇳 India (NCAOR) | Larsemann Hills | -69.4075° S, 76.1942° E | 35 m | Maritime coastal, fast sea-ice, modular container stilt design | **ASRE-44** |
| **Maitri Station** | 🇮🇳 India (NCAOR) | Queen Maud Land | -70.7667° S, 11.7333° E | 117 m | Schirmacher Oasis rocky permafrost, Lake Priyadarshini water lifeline | **ASRE-43** |
| **McMurdo Station** | 🇺🇸 USA (USAP) | Ross Island | -77.8463° S, 166.6682° E | 24 m | Volcanic basalt ground, Mount Erebus volcano, Williams Field skiway | **DEEP-FREEZE-26** |
| **Amundsen-Scott Station** | 🇺🇸 USA / Intl | South Pole (Platonic) | -90.0000° S, 0.0000° E | 2,835 m | Cosmic polar plateau, extreme altitude (-58°C), Dark Sector clean air | **POLE-RUN-70** |
| **Neumayer Station III** | 🇩🇪 Germany (AWI) | Ekström Ice Shelf | -70.6744° S, -8.2742° W | 40 m | Floating ice shelf on hydraulic lift jacks, Atka Bay Emperor penguin colony | **POLARSTERN-46** |

---

## ⚙️ Core Architecture & Operational Modules

### 1. Command Center Dashboard
- **Algorithmic Readiness Gauge (0-100%)**: Dynamically computes readiness from fuel runway, cargo delay SLAs, equipment health, and emergency states.
- **Polar Tactical Radar Map**: South polar stereographic projection with dynamic supply corridors, crevasse fields, and localized environmental hazard cones.
- **Synchronized Polar Clocks**: Real-time Zulu UTC clock, Station Local Time (computed via dynamic UTC offsets), and 24-hour Austral daylight tracking.

### 2. 3D Digital Twin (Three.js WebGL)
- **Station Infrastructure**: Central elevated habitat on hydraulic stilts, CAT 350 gensets, cylindrical fuel farms, micro-turbines, and PistenBully 600 snowcats.
- **Dynamic Terrain & Shaders**: Adjusts between rocky permafrost (Maitri), volcanic basalt (McMurdo), high-altitude cosmic night (South Pole), and floating ice shelf (Neumayer).
- **Interactive Shader Layers**: Full Structure, Thermal Heatmap, Power Distribution Grid, and Fuel Storage Depot.
- **Raycaster Telemetry Inspector**: Click any 3D building, tank, or vehicle to inspect live core temperatures, electrical load, and running hours.

### 3. Multi-Modal Cargo Tracking
- Manifest tracking across Icebreakers, LC-130 Hercules ski-planes, PistenBully snowcats, and Twin Otters.
- Interactive Southern Ocean supply corridor view (Cape Town, Christchurch, Bremerhaven).
- Pack-ice delay simulator and new consignment registration with offline mutation queueing.

### 4. Inventory Management & Predictive Intelligence
- **7 Critical Categories**: Fuel (Jet A-1, Polar Diesel), Rations, Medical, Spare Parts, Science, Batteries, Safety.
- **Runway Mathematical Model**:
  $$\text{Daily Burn}(t) = \text{Base Burn} \times (1 + \Delta_{\text{Weather}}) \times \left(1 + \frac{\Delta_{\text{Crew}}}{N}\right)$$
- Multi-horizon depletion curves (30, 45, 60 days) and 5x5 Polar Operational Risk Matrix.

### 5. What-If Crisis Simulator
- Compound disruption modeling: simultaneous cargo delays, blizzard consumption surges, and power loss.
- Dual-plan comparative visualization (Baseline vs. Disrupted).
- 1-click mitigation execution (load-shedding non-essential heating recovering +600L fuel buffer).

### 6. Emergency Response Center
- **Automated 8-Step Triage**: Location ➔ Nearest Team ➔ Vehicle ➔ Equipment ➔ Medical ➔ Dynamic ETA ➔ 1-Click Dispatch ➔ Debrief.
- Live SAR team dispatch status transitions (`PENDING` ➔ `DISPATCHED` ➔ `RESOLVED`).

### 7. Low-Connectivity Offline Architecture
- Satellite blackout simulation mode (`ONLINE` ➔ `OFFLINE`).
- Local mutation queue storing all changes in browser cache with automatic background synchronization upon reconnection.

### 8. Audit Reports & Knowledge Base
- 6 official report templates (Mission Summary, Cargo Manifest, Fuel Runways, Fleet Maintenance, Personnel Safety, Historical Incident Archive).
- 1-click CSV spreadsheet export and formatted PDF/Print generation.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Run
```bash
# 1. Clone or extract repository
cd polar-one

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Or build and test production bundle
npm run build
npm run preview
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🌐 Deploying as a Public Live Website

You can deploy POLAR ONE publicly in under 2 minutes using any modern static host:

### Option A: Vercel (Recommended - Zero Setup)
1. Push this project to GitHub (see step-by-step guide below).
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New... ➔ Project**.
4. Import your `polar-one` repository.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your app is live with a global HTTPS URL (e.g. `polar-one.vercel.app`)!

### Option B: Netlify Drag-and-Drop (Instant 30-Second No-Code Deploy)
1. Build the production bundle locally:
   ```bash
   npm run build
   ```
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the generated **`dist`** folder directly into the browser window.
4. Netlify immediately publishes your live site with an HTTPS link!

---

## 👥 Hackathon Team: CryoNauts
- **Problem Statement:** Integrated Polar Expedition Logistics and Asset Management System
- **Event:** Smart India Hackathon (SIH 2026)
- **License:** MIT
