# 🌌 Stellar Scanner v1.1
### *No Man's Sky Spectral Classification & Resource Projection Tool*

**Stellar Scanner** is a lightweight, mobile-friendly utility designed for *No Man's Sky* explorers. It deconstructs the procedural "Stellar Class" strings (e.g., `B5pf`, `O2e`) found in the Galactic Map to provide instant intelligence on star temperature, required hyperdrive technology, planet biomes, and resource availability.

---

## 🛠️ Tech Stack
* **Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS
* **Logic:** Deterministic Regex-based Parsing
* **Design:** Mobile-first Responsive UI

---

## 🚀 Features

* **Real-time Analysis:** UI reactively updates its theme (colors/borders) to match the star's color class as you type.
* **Hyperdrive Guidance:** Instantly identifies if you need a **Cadmium**, **Emeril**, or **Indium** drive to warp.
* **Biome Projection:** Uses the heat index ($0-9$) to predict dominant planet types (Scorched, Lush, or Frozen).
* **Suffix Decoding:** * `f`: Water detection for aquatic exploration.
    * `p`: Peculiarity detection for anomalous/glitch planets.
    * `e/m`: Resource spikes for rare metallic yields.
* **Scanner Aesthetic:** A high-contrast "Terminal" interface designed for second-screen use while gaming.

---

## 🧭 How to Read the Data

The app parses the three core components of a Star's identity found in the Galactic Map:

1. **The Class (Letter):** Determines the spectral color and the specific Chromatic Metal found native to the system.
2. **The Heat Index (Number):** A scale where **0** is the hottest and **9** is the coolest.
    * **0–3:** High probability of Scorched/Desert worlds.
    * **4–6:** High probability of Lush/Tropical worlds (The "Goldilocks" zone).
    * **7–9:** High probability of Frozen/Tundra worlds.
3. **The Oddities (Suffixes):** Procedural flags that modify the system's contents, such as the presence of oceans or orbital anomalies.

---

## 🧭 Stellar Class Key

| Color | Classes | Drive Required | Primary Resource |
| :--- | :--- | :--- | :--- |
| 🟡 **Yellow** | F, G | Standard | Copper |
| 🔴 **Red** | K, M | Cadmium | Cadmium |
| 🟢 **Green** | E | Emeril | Emeril |
| 🔵 **Blue** | B, O | Indium | Indium |
| 🟣 **Purple** | X, Y | Atlantid | Quartzite |

*Note: Purple systems are hidden until the completion of 'In Stellar Multitudes'.*

---
## 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/nms-stellar-scanner.git](https://github.com/yourusername/nms-stellar-scanner.git)
   ```
2. **Install dependencies:**
  ```bash
  npm install
```
3. **Run Development Server:**
```bash
npm run dev
```
4. **Build for Production:**
```bash
npm run build
```

##   📝 License
Distributed under the MIT License.

Be safe, Traveler. - - [ 16 // 16 // 16 ] - -
