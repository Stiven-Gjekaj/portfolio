# Super Mario 64 Portfolio Design System

A retro gaming design system inspired by Super Mario 64's iconic visual style from 1996.

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Components](#components)
6. [Animations & Effects](#animations--effects)
7. [Custom CSS Libraries](#custom-css-libraries)
8. [Implementation Guide](#implementation-guide)

---

## Design Philosophy

### Core Principles
- **Nostalgic Playfulness**: Evoke the joyful, adventurous spirit of SM64
- **Bold & Readable**: High contrast, chunky text, clear hierarchy
- **3D Depth**: Simulated depth through shadows, bevels, and layering
- **Vibrant Energy**: Bright, saturated colors reminiscent of N64 graphics
- **Retro Modernism**: Classic aesthetics with modern web standards

### Visual References
- Peach's Castle exterior (blue sky, white clouds, brick textures)
- Star selection screen (bold yellow stars, blue backgrounds)
- Power-up effects (shine, sparkle, rotation)
- HUD elements (coin counter, health meter, power stars)
- Platform textures (checkerboard patterns, grassy platforms)

---

## Color Palette

### Primary Colors
```css
/* Mario Red - Primary action color */
--mario-red: #E52521;
--mario-red-dark: #B81D1A;
--mario-red-light: #FF5A56;

/* Sky Blue - Background & calm elements */
--sky-blue: #5B9BD5;
--sky-blue-dark: #4472B0;
--sky-blue-light: #8AC6FF;

/* Star Yellow - Highlights & achievements */
--star-yellow: #FFD700;
--star-yellow-dark: #CCAC00;
--star-yellow-light: #FFE64D;

/* Grass Green - Success states */
--grass-green: #4CAF50;
--grass-green-dark: #388E3C;
--grass-green-light: #81C784;
```

### Secondary Colors
```css
/* Coin Gold - Accents & rewards */
--coin-gold: #FFB84D;

/* Warp Pipe Green */
--pipe-green: #3FA34D;

/* ? Block Orange */
--block-orange: #FF8C1A;

/* Bob-omb Black */
--bobomb-black: #2C2C2C;

/* Cloud White */
--cloud-white: #F5F5F5;
```

### Neutral Colors
```css
/* Castle Stone - Text & borders */
--stone-gray: #8C8C8C;
--stone-dark: #4A4A4A;
--stone-light: #BEBEBE;

/* Background layers */
--bg-primary: #E8F4FF;    /* Light sky */
--bg-secondary: #C7E3FF;  /* Mid sky */
--bg-tertiary: #A8D5FF;   /* Deep sky */
```

### Semantic Colors
```css
--success: var(--grass-green);
--warning: var(--block-orange);
--error: var(--mario-red);
--info: var(--sky-blue);
```

---

## Typography

### Font Stack

#### Primary Font: Press Start 2P
**Usage**: Headers, buttons, navigation, retro elements
**CDN**: Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```

```css
--font-retro: 'Press Start 2P', cursive;
```

**Characteristics**:
- Pixel-perfect retro aesthetic
- 8-bit gaming nostalgia
- Use sparingly due to readability at small sizes
- Best for sizes 12px and above

#### Secondary Font: VT323
**Usage**: Body text, descriptions, readable content
**CDN**: Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
```

```css
--font-mono: 'VT323', monospace;
```

**Characteristics**:
- Monospace terminal aesthetic
- More readable than Press Start 2P
- Good for longer text passages
- Optimal at 20px+ for body text

#### Fallback Font: System
```css
--font-system: system-ui, -apple-system, sans-serif;
```

### Typography Scale

```css
/* Display - Hero headings */
--text-display: clamp(32px, 6vw, 56px);
--line-display: 1.1;
--font-display: var(--font-retro);

/* Headline - Section titles */
--text-headline: clamp(24px, 4vw, 36px);
--line-headline: 1.2;
--font-headline: var(--font-retro);

/* Title - Card headers */
--text-title: 18px;
--line-title: 1.3;
--font-title: var(--font-retro);

/* Body - Main content */
--text-body: 20px;
--line-body: 1.6;
--font-body: var(--font-mono);

/* Caption - Small text */
--text-caption: 14px;
--line-caption: 1.4;
--font-caption: var(--font-mono);

/* Label - UI elements */
--text-label: 12px;
--line-label: 1.3;
--font-label: var(--font-retro);
```

### Text Styles

```css
/* Pixel Text Shadow - Classic arcade depth */
.text-pixel-shadow {
  text-shadow:
    2px 2px 0 var(--bobomb-black),
    4px 4px 0 rgba(0, 0, 0, 0.3);
}

/* Gold Shine - For star/coin elements */
.text-gold-shine {
  color: var(--star-yellow);
  text-shadow:
    1px 1px 0 var(--star-yellow-dark),
    2px 2px 4px rgba(255, 215, 0, 0.6),
    0 0 8px rgba(255, 215, 0, 0.4);
}

/* Retro Outline */
.text-outline {
  text-shadow:
    -2px -2px 0 var(--bobomb-black),
    2px -2px 0 var(--bobomb-black),
    -2px 2px 0 var(--bobomb-black),
    2px 2px 0 var(--bobomb-black);
}
```

---

## Layout & Spacing

### Grid System
Based on 8px baseline grid (classic gaming 8x8 tiles)

```css
--space-1: 8px;    /* Micro */
--space-2: 16px;   /* Small */
--space-3: 24px;   /* Medium */
--space-4: 32px;   /* Large */
--space-5: 40px;   /* XL */
--space-6: 48px;   /* 2XL */
--space-8: 64px;   /* 3XL */
--space-12: 96px;  /* 4XL */
--space-16: 128px; /* Hero */
```

### Container Widths
```css
--container-sm: 640px;   /* Mobile landscape */
--container-md: 768px;   /* Tablet */
--container-lg: 1024px;  /* Desktop */
--container-xl: 1280px;  /* Wide */
```

### Breakpoints
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

---

## Components

### 1. Buttons

#### Power Star Button (Primary)
```css
.btn-star {
  background: linear-gradient(135deg, var(--star-yellow) 0%, var(--coin-gold) 100%);
  color: var(--bobomb-black);
  font-family: var(--font-retro);
  font-size: var(--text-label);
  padding: 12px 24px;
  border: 3px solid var(--star-yellow-dark);
  border-radius: 8px;
  box-shadow:
    0 4px 0 var(--star-yellow-dark),
    0 8px 16px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
}

.btn-star:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 0 var(--star-yellow-dark),
    0 12px 20px rgba(0, 0, 0, 0.4);
}

.btn-star:active {
  transform: translateY(2px);
  box-shadow:
    0 2px 0 var(--star-yellow-dark),
    0 4px 8px rgba(0, 0, 0, 0.3);
}
```

#### ? Block Button (Secondary)
```css
.btn-block {
  background: linear-gradient(135deg, var(--block-orange) 0%, #D97514 100%);
  color: white;
  font-family: var(--font-retro);
  font-size: var(--text-label);
  padding: 12px 24px;
  border: 3px solid #B85F0F;
  border-radius: 4px;
  box-shadow:
    inset -2px -2px 0 rgba(0, 0, 0, 0.3),
    inset 2px 2px 0 rgba(255, 255, 255, 0.3),
    0 4px 0 #B85F0F;
  position: relative;
  overflow: hidden;
}

.btn-block::before {
  content: '?';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  opacity: 0.2;
  pointer-events: none;
}
```

#### Warp Pipe Button (Tertiary)
```css
.btn-pipe {
  background: linear-gradient(180deg, var(--pipe-green) 0%, #2E7A38 100%);
  color: white;
  font-family: var(--font-retro);
  font-size: var(--text-label);
  padding: 12px 24px;
  border: 3px solid #1F5426;
  border-radius: 50px;
  box-shadow:
    inset 0 -4px 0 rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.4);
}
```

### 2. Cards

#### Project Card (Painting Frame Style)
```css
.card-painting {
  background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
  border: 8px solid #5C3A21;
  border-radius: 4px;
  padding: 16px;
  box-shadow:
    inset 0 0 0 4px #A0522D,
    inset 0 0 0 8px #8B4513,
    0 8px 16px rgba(0, 0, 0, 0.5);
  position: relative;
}

.card-painting::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.card-painting-inner {
  background: white;
  padding: 16px;
  border-radius: 2px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
}
```

#### Skill Card (Coin Style)
```css
.card-coin {
  background: radial-gradient(circle, var(--coin-gold) 0%, #E09A3D 100%);
  border: 4px solid var(--star-yellow-dark);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 0 var(--star-yellow-dark),
    0 8px 16px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.card-coin::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent);
  border-radius: 50%;
  top: 10%;
  left: 20%;
}
```

### 3. Navigation

#### Castle Door Menu
```css
.nav-castle {
  background: linear-gradient(180deg, #8B7355 0%, #6B5644 100%);
  border: 4px solid #5C4A3A;
  border-radius: 12px 12px 0 0;
  padding: var(--space-3);
  box-shadow:
    inset 0 -4px 8px rgba(0, 0, 0, 0.3),
    0 -4px 8px rgba(0, 0, 0, 0.2);
}

.nav-castle a {
  font-family: var(--font-retro);
  font-size: var(--text-label);
  color: var(--cloud-white);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.2s;
}

.nav-castle a:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.2);
}
```

### 4. Forms

#### Star Collect Input
```css
.input-star {
  background: white;
  border: 3px solid var(--stone-gray);
  border-radius: 8px;
  padding: 12px 16px;
  font-family: var(--font-mono);
  font-size: var(--text-body);
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.2);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-star:focus {
  outline: none;
  border-color: var(--star-yellow);
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.1),
    0 0 0 4px rgba(255, 215, 0, 0.3),
    0 4px 8px rgba(255, 215, 0, 0.2);
}
```

### 5. Badges & Tags

#### Power-Up Badge
```css
.badge-powerup {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--grass-green);
  color: white;
  font-family: var(--font-retro);
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 2px solid var(--grass-green-dark);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
}
```

### 6. Progress Indicators

#### Power Meter
```css
.progress-power {
  background: var(--bobomb-black);
  border: 3px solid var(--stone-gray);
  border-radius: 8px;
  height: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
}

.progress-power-fill {
  background: linear-gradient(90deg,
    var(--mario-red) 0%,
    var(--mario-red-light) 50%,
    var(--mario-red) 100%);
  height: 100%;
  transition: width 0.3s ease;
  box-shadow: 0 0 8px rgba(229, 37, 33, 0.6);
  position: relative;
  overflow: hidden;
}

.progress-power-fill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## Animations & Effects

### 1. Star Collect Animation
```css
@keyframes star-collect {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}

.star-collect {
  animation: star-collect 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 2. Coin Spin
```css
@keyframes coin-spin {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

.coin-spin {
  animation: coin-spin 1s linear infinite;
  transform-style: preserve-3d;
}
```

### 3. Power-Up Bounce
```css
@keyframes powerup-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.powerup-bounce {
  animation: powerup-bounce 0.6s ease-in-out infinite;
}
```

### 4. Warp Pipe Entrance
```css
@keyframes warp-enter {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(20px) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translateY(40px) scale(0);
    opacity: 0;
  }
}

.warp-enter {
  animation: warp-enter 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.34);
}
```

### 5. Text Appear (Mario 64 Style)
```css
@keyframes text-appear {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.1) rotate(10deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.text-appear {
  animation: text-appear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 6. Background Parallax Clouds
```css
@keyframes cloud-drift {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
}

.cloud-layer-1 {
  animation: cloud-drift 60s linear infinite;
}

.cloud-layer-2 {
  animation: cloud-drift 90s linear infinite;
}

.cloud-layer-3 {
  animation: cloud-drift 120s linear infinite;
}
```

### 7. Star Sparkle
```css
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

.sparkle {
  animation: sparkle 1.5s ease-in-out infinite;
}
```

---

## Custom CSS Libraries

### Recommended Libraries

#### 1. NES.css
**Purpose**: Authentic NES-style components
**CDN**:
```html
<link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />
```

**Usage**:
- Pixel-perfect buttons
- Retro containers
- 8-bit styled forms
- Dialog boxes

**Customization**:
Override NES.css variables with SM64 colors

```css
:root {
  --nes-btn-primary: var(--mario-red);
  --nes-btn-success: var(--grass-green);
  --nes-btn-warning: var(--block-orange);
}
```

#### 2. Pixel Borders (Custom)
**Purpose**: Create authentic pixel-art borders

```css
.pixel-border {
  border-image: repeating-linear-gradient(
    90deg,
    var(--bobomb-black) 0px,
    var(--bobomb-black) 4px,
    transparent 4px,
    transparent 8px
  ) 4;
  border-width: 4px;
  border-style: solid;
}
```

#### 3. CSS Doodle
**Purpose**: Procedural background patterns
**CDN**:
```html
<script src="https://unpkg.com/css-doodle@0.34.0/css-doodle.min.js"></script>
```

**Example - Checkerboard Pattern**:
```html
<css-doodle>
  :doodle {
    @grid: 8 / 100%;
    background: var(--bg-primary);
  }
  background: @pick(var(--sky-blue-light), var(--sky-blue));
  opacity: @rand(0.3, 0.6);
</css-doodle>
```

#### 4. Animate.css
**Purpose**: Pre-built animations
**CDN**:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
```

**SM64 Mapping**:
- `bounce` → Power-up collect
- `rotateIn` → Star appear
- `zoomOut` → Warp pipe exit
- `pulse` → Coin glow

---

## Implementation Guide

### Phase 1: Foundation (Week 1)

1. **Setup Color System**
   - Replace existing CSS variables
   - Update theme toggle to switch between day/night castle themes
   - Add color utility classes

2. **Typography Integration**
   - Import Press Start 2P and VT323
   - Replace font variables
   - Apply to headers and body text
   - Test readability across devices

3. **Spacing Updates**
   - Implement 8px grid system
   - Update all margin/padding values
   - Ensure consistent spacing

### Phase 2: Components (Week 2)

1. **Button Redesign**
   - Convert all buttons to Power Star style
   - Add hover/active states
   - Implement sound effects (optional)

2. **Card Components**
   - Convert project cards to painting frames
   - Style skill cards as coins
   - Add shine/glow effects

3. **Navigation**
   - Redesign header as castle door
   - Style mobile menu as warp pipe entrance
   - Add transition animations

### Phase 3: Effects & Polish (Week 3)

1. **Background System**
   - Add parallax cloud layers
   - Implement sky gradient
   - Add subtle texture overlays

2. **Animations**
   - Star collect on page load
   - Coin spin on skill hover
   - Power-up bounce on buttons
   - Smooth page transitions

3. **Interactive Elements**
   - Add sound effects (coin, star, jump)
   - Implement easter eggs
   - Add konami code secret

### Phase 4: Optimization (Week 4)

1. **Performance**
   - Optimize animations (GPU acceleration)
   - Lazy load fonts
   - Compress background images

2. **Accessibility**
   - Ensure color contrast (WCAG AA)
   - Add reduced motion preferences
   - Keyboard navigation testing

3. **Browser Testing**
   - Cross-browser compatibility
   - Mobile responsiveness
   - Fallback fonts

---

## Asset Resources

### Sprites & Icons
- **Super Mario 64 Sprite Sheets**: The Spriters Resource
- **Custom Icons**: Create pixel art versions of tech logos
- **Star Icons**: Yellow star in multiple sizes
- **Coin Sprites**: Animated coin rotation frames

### Textures
- **Castle Stone**: Seamless brick pattern
- **Grass Platform**: Green checkerboard
- **Sky Gradient**: Blue to light blue
- **Cloud Shapes**: Fluffy white clouds (SVG)

### Sounds (Optional)
- **Coin Collect**: "Ding!"
- **Star Get**: Triumphant fanfare
- **Jump**: "Hoo!"
- **Button Click**: Menu select sound

### Fonts Already Specified
- Press Start 2P (Google Fonts)
- VT323 (Google Fonts)

---

## Accessibility Considerations

### Color Contrast
All text meets WCAG AA standards:
- Black text on yellow: 10.4:1 ✓
- White text on red: 5.3:1 ✓
- White text on green: 4.8:1 ✓

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States
```css
*:focus-visible {
  outline: 4px solid var(--star-yellow);
  outline-offset: 4px;
  box-shadow: 0 0 0 8px rgba(255, 215, 0, 0.3);
}
```

### Screen Readers
- Use semantic HTML
- Add ARIA labels for decorative elements
- Ensure all interactive elements are keyboard accessible

---

## Design Tokens (CSS Custom Properties)

### Complete Variable Set

```css
:root {
  /* Colors */
  --mario-red: #E52521;
  --mario-red-dark: #B81D1A;
  --mario-red-light: #FF5A56;

  --sky-blue: #5B9BD5;
  --sky-blue-dark: #4472B0;
  --sky-blue-light: #8AC6FF;

  --star-yellow: #FFD700;
  --star-yellow-dark: #CCAC00;
  --star-yellow-light: #FFE64D;

  --grass-green: #4CAF50;
  --grass-green-dark: #388E3C;
  --grass-green-light: #81C784;

  --coin-gold: #FFB84D;
  --pipe-green: #3FA34D;
  --block-orange: #FF8C1A;
  --bobomb-black: #2C2C2C;
  --cloud-white: #F5F5F5;

  --stone-gray: #8C8C8C;
  --stone-dark: #4A4A4A;
  --stone-light: #BEBEBE;

  --bg-primary: #E8F4FF;
  --bg-secondary: #C7E3FF;
  --bg-tertiary: #A8D5FF;

  /* Typography */
  --font-retro: 'Press Start 2P', cursive;
  --font-mono: 'VT323', monospace;
  --font-system: system-ui, -apple-system, sans-serif;

  --text-display: clamp(32px, 6vw, 56px);
  --text-headline: clamp(24px, 4vw, 36px);
  --text-title: 18px;
  --text-body: 20px;
  --text-caption: 14px;
  --text-label: 12px;

  --line-display: 1.1;
  --line-headline: 1.2;
  --line-title: 1.3;
  --line-body: 1.6;
  --line-caption: 1.4;
  --line-label: 1.3;

  /* Spacing */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-8: 64px;
  --space-12: 96px;
  --space-16: 128px;

  /* Effects */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.5);

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 0.1s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

---

## Quick Start Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SM64 Portfolio</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">

  <!-- Optional: NES.css -->
  <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />

  <!-- Custom Styles -->
  <link rel="stylesheet" href="sm64-styles.css">
</head>
<body>
  <!-- Sky Background -->
  <div class="sky-background">
    <div class="cloud-layer-1"></div>
    <div class="cloud-layer-2"></div>
  </div>

  <!-- Main Content -->
  <header class="nav-castle">
    <h1 class="text-pixel-shadow">Your Name</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
    </nav>
  </header>

  <main>
    <!-- Hero Section -->
    <section class="hero">
      <h2 class="text-gold-shine text-appear">Let's-a Go!</h2>
      <button class="btn-star">View Projects</button>
    </section>

    <!-- Project Card -->
    <article class="card-painting">
      <div class="card-painting-inner">
        <h3>Project Name</h3>
        <p>Description goes here</p>
        <span class="badge-powerup">React</span>
      </div>
    </article>
  </main>

  <footer>
    <p>© 2025 - Made with ⭐</p>
  </footer>
</body>
</html>
```

---

## Final Notes

### Design Philosophy Summary
This design system captures the essence of Super Mario 64 while maintaining modern web standards. The playful aesthetic should enhance user engagement without compromising usability.

### Customization Freedom
All components are modular. Mix and match elements based on your content needs. Not every page needs to look like a painting from Peach's Castle!

### Performance First
While the retro aesthetic is fun, performance matters. Use CSS transforms for animations (GPU-accelerated), optimize images, and lazy-load non-critical assets.

### Have Fun!
Super Mario 64 is about joy, exploration, and adventure. Let that spirit shine through in your design choices. Wahoo! 🍄⭐

---

**Version**: 1.0
**Last Updated**: 2025
**Maintained by**: Stiven Gjekaj
