# Rajesh & Sons — Luxury Carpet & Rugs Web Showcase

An editorial, high-fashion handmade carpet and rugs showroom website built with **React**, **Tailwind CSS**, and **Framer Motion**, pre-architected for headless **Strapi v5 CMS** management.

---

## 🌟 Key Features

1. **Brand Identity & Bespoke SVG Monogram**:
   - Custom **Rajesh & Sons** logo emblem featuring traditional upright loom warp lines, interlocking knot monogram, gold gradient foil styling, and corner star accents.
   - Grounded in the authentic heritage of **Bhadohi & Mirzapur** (Est. 1978).

2. **Rich Animated Hero Screen**:
   - Animated ambient warp loom matrix strings and illuminated silk floating particles.
   - Kinetic split-heading typography.
   - Live animated metric counters (48+ Years, 1,200+ Master Artisans, 550 KPSI Peak, 45+ Countries).

3. **Interactive 4x Optical KPSI & Fiber Magnifier**:
   - Real-time hover reticle with dynamic telemetry readout (knots per square inch, fiber composition, weave type, and origin).

4. **2D Room Perspective Visualizer**:
   - Preview rugs in simulated living room, suite bedroom, and dining spaces.
   - Real-time perspective skew, scale ratio adjustments, and rotation controls.

5. **Strapi-Ready Data Schema**:
   - Mock data modeled directly after Strapi Content-Type structures (`documentId`, `knotDensity`, `weaveType`, `material`, `pileHeight`, `dimensions`).

6. **Interactive Feedback Across All Actions**:
   - Active response triggers on all catalog filters, sample requests, cart, wishlist, currency selector, and concierge links.

---

## 🚀 Quick Setup & Run in VS Code

### 1. Extract the ZIP archive
Extract the files into your desired project directory and open the folder in **VS Code**.

### 2. Open Terminal in VS Code
Open your integrated terminal (`Ctrl + ~` or `Cmd + ~`) and install dependencies:

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🛠 Project Structure

```text
rajesh-and-sons/
├── index.html              # HTML shell with Google Fonts (Playfair Display, Inter, JetBrains Mono)
├── package.json            # Scripts & dependencies
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind CSS theme & font configuration
├── postcss.config.js       # PostCSS plugins
├── src/
│   ├── App.jsx             # Main luxury showroom application
│   ├── main.jsx            # React root entrypoint
│   └── index.css           # Tailwind directives & base styles
└── README.md               # Documentation
```
