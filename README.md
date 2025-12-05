# **SHD-CCP Website Project Structure**

This document serves as the structural guide for the **SHD-CCP (Symbolic High-Dimensional Context Compression Protocol)** website.
Follow this file layout to ensure all navigation links, tutorials, and the simulation engine function correctly when deployed to your VPS or GitHub Pages.

---

## **📁 File Hierarchy**

Your local project folder (**`shd-ccp-website/`**) should look *exactly* like this before you push to GitHub:

```
shd-ccp-website/
├── index.html                # Main Landing Page (Hero, Overview, Concepts)
├── docs.html                 # Technical Documentation Portal (Protocol specs)
├── tutorials.html            # Tutorials Hub (Searchable grid of guides)
├── math.html                 # Mathematical Foundations Hub (Hyperbolic geometry specs)
├── simulation.html           # 3D Simulation Engine (Three.js lattice visualizer)
│
├── src/                      # DIRECTORY: JavaScript Source Code
│   └── auth.js               # Firebase Authentication & Logic module
│
├── tutorials/                # DIRECTORY: Contains individual tutorial pages
│   ├── 01-SHD-CCP 2D Data Encoding -Tutorial Version-
│   ├── 02-SHD-CCP 3D Data Encoding -Tutorial Version-
│   ├── 03-packet-breakdown.html
│   ├── 04-logical-operators.html
│   ├── 05-understanding-qpos.html
│   └── 06-hyperbolic-math.html
│
├── math/                     # DIRECTORY: Contains individual math guide pages
│   ├── 01-intro-hyperbolic.html
│   ├── 02-distance-metrics.html
│   ├── 03-poincare-disk.html
│   ├── 04-lorentz-model.html
│   ├── 05-context-vectors.html
│   └── 06-operator-algebra.html
│
└── vps_deployment_guide.md   # Reference guide for server setup (optional)
```

---

# **⚙️ Setup Instructions**

## **1. Root Directory**

The five core HTML files must be placed directly in the project root:

* `index.html`
* `docs.html`
* `tutorials.html`
* `math.html`
* `simulation.html`

These act as **site-wide navigation anchors**.

---

## **2. Required Subdirectories**

Create **two directories** inside the project root:

```
tutorials/
math/
```

These house all individual documentation pages.

---

## **3. Content Pages**

The files inside `tutorials/` and `math/` are the actual content pages displayed by the hub pages.

### **Template Usage**

To create new pages:

```
Copy either docs.html or tutorials.html
→ rename
→ replace body content
```

This preserves your global:

* Header
* Sidebar
* CSS theme
* Page layout

### **Linking Notes**

The hub pages (`tutorials.html` and `math.html`) depend on **these exact filenames** to generate correct links.

---

# **🚀 Deployment Checklist**

Use this checklist before deploying to GitHub or your VPS:

* [ ] **Initialize Git**

  ```bash
  git init
  ```

* [ ] **Verify Directory Structure**
  Make sure both `tutorials/` and `math/` exist and contain `.html` files.

* [ ] **Commit Project**

  ```bash
  git add .
  git commit -m "Initial site structure"
  ```

* [ ] **Push to GitHub**
  Push to your repo as usual.

* [ ] **Clone to VPS**

  ```bash
  git clone <your-repo-url> /var/www/yourdomain.com
  ```

---
