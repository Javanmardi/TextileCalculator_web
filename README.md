[🇮🇷 نسخه فارسی](README.fa.md)

# Textile Calculator — Web Version

A browser-based calculation tool for the textile manufacturing industry, developed by **Parsianik Group**. Built as an HTML file with no frameworks, no build step, and no dependencies beyond a Google Fonts stylesheet.

🌐 **Live:** [calc.parsianik.com](https://calc.parsianik.com/) 

---

## Features

- Categorize formulas across production processes
- RTL Farsi interface with Vazirmatn font
- Responsive layout — permanent sidebar on desktop, slide-in drawer on mobile
- Hamburger menu with animated open/close on screens ≤ 720px
- Dim overlay closes the drawer on tap outside
- Instant calculation with Enter key support
- Input validation with inline error highlighting
- Animated result display
- Zero installation — runs in any modern browser

---

## Categories & Formulas

### 1. Melt Spinning (ذوب ریسی)
| Formula | Inputs |
|---|---|
| Theoretical production weight per minute | Speed, number of yarn ends, denier count |
| Theoretical production weight over active time | Theoretical weight/min, machine runtime |
| Theoretical weight of produced product | Masterbatch %, chip weight, oil % |
| Theoretical number of full bobbins | Theoretical product weight, full bobbin weight |
| Total waste weight | Fixed waste, line waste weight |
| Production efficiency | Actual final product weight, theoretical weight over active time |

### 2. Texturing (تکسچره)
| Formula | Inputs |
|---|---|
| Theoretical production weight (kg) | Number of positions, production time, production speed, output yarn count |
| Output yarn count (denier) | Input yarn count, draw ratio, oil %, feed draw %, draw count |
| Production efficiency (%) | Actual yarn produced, theoretical production weight |
| Quality efficiency (%) | Actual yarn produced, off-grade yarn produced |

### 3. Twisting (تابندگی)
| Formula | Inputs |
|---|---|
| Twists per meter | Take-up speed, twister speed |
| Output yarn count | Input yarn count, twists per meter |

### 4. Weaving (بافندگی)
| Formula | Inputs |
|---|---|
| Fabric areal density (g/m²) | Weft density, warp count, weft count, warp density |
| Weight per linear meter (g/m) | Width, areal density |
| Number of warp beam yarn ends | Creel capacity, total yarn ends |

### 5. Tufting (تافتینگ)
| Formula | Inputs |
|---|---|
| Machine gauge number | Gauge number per inch (number of niddles per inch)  |
| Stitch number | Number of stitches per decimeter |
| Pile length | Pile length (centimeter) |
| Yarn count | Yarn count (denier) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, flexbox, CSS animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Font | Vazirmatn via Google Fonts |
| Hosting | Cloudflare Pages |

No npm. No build step. No React. No dependencies to install or update.

---

## Project Structure

```
textile-calculator-web/
│
├── textile_calculator.html   # Entire application — single file
└── README.md
```

---

## Customization

| What | Where in the file |
|---|---|
| Hamburger / top-right icon | `<button class="hamburger">` — replace `<span>` tags with `<img>` |
| Sidebar brand logo | `<div class="brand-mark">` — replace `<svg>` with `<img>` |
| Brand name | `<div class="brand-name">` |
| Subtitle (formula count) | `<div class="brand-sub">` |
| Welcome screen text | `<div class="welcome">` |
| Footer credit line | `<h5>` inside `.welcome` — pinned bottom-left via `position: fixed` |
| Favicon | Add `<link rel="icon" type="image/png" href="favicon.png">` in `<head>` |
| Color palette | CSS custom properties in `:root` (top of `<style>` block) |
| Formulas | `const DATA = [...]` array in the `<script>` block |

---

## Adding a New Formula

Inside the `DATA` array in the `<script>` block, add an entry to the relevant category:

```javascript
{ title: 'نام فرمول',
  unit: 'واحد خروجی',
  inputs: [
    { id: 'a', label: 'متغیر اول' },
    { id: 'b', label: 'متغیر دوم' },
  ],
  calc: v => v.a * v.b   // your formula here
},
```

The sidebar nav and formula card are generated automatically — no other changes needed.

---

## Predecessor

This project replaces the archived Python/Tkinter desktop version:
👉 [TextileCalculator_python](../TextileCalculator_python)

---

## License

Licensed under the [Apache 2.0 License](LICENSE).

---

## Developer

Parsianik Group
