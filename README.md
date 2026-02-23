# WebApp Launcher Widget 🚀

A lightweight, drop-in application drawer widget for your personal web ecosystem. Built with Vanilla JavaScript and Web Components, it works seamlessly across **Next.js**, **React**, **Vue**, and **Standard HTML** sites without styling conflicts (thanks to Shadow DOM).

_(You can replace this link with a screenshot of your widget later)_

## ✨ Features

- **Zero Dependencies:** Pure Vanilla JS.
- **Framework Agnostic:** Works in React, Next.js, Vue, Svelte, or plain HTML.
- **Shadow DOM Encapsulation:** Styles will never clash with your main site's CSS.
- **Glassmorphism Design:** Modern, dark-themed UI with blur effects.
- **Utility First:** Includes "Copy Link" buttons and direct navigation.
- **Responsive:** optimized for desktop and mobile edge-cases.

---

## ⚡ Quick Start (The "One-Liner")

The fastest way to add the launcher to your site is via **jsDelivr CDN**. This serves the latest version directly from your `main` branch.

### 1. Next.js (App Router)

Add the script to your root layout.

**File:** `app/layout.tsx` (or `.js`)

```tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Habibullah Launcher Widget */}
        <Script
          src="https://cdn.jsdelivr.net/gh/md8-habibullah/webapp-launcher@main/launcher.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
```

### 2. Standard HTML

Place the script tag just before the closing `</body>` tag.

**File:** `index.html`

```html
<body>
  <script
    src="https://cdn.jsdelivr.net/gh/md8-habibullah/webapp-launcher@main/launcher.js"
    async
  ></script>
</body>
```

### 3. React (Vite / CRA)

If you aren't using Next.js, you can load it in your main `App.jsx` or `index.html`.

**Option A: Public HTML (Recommended)**
Add the `<script>` tag to your `public/index.html` file (same as Standard HTML above).

**Option B: Inside Component (useEffect)**

```jsx
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/md8-habibullah/webapp-launcher@main/launcher.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup if necessary (optional for a persistent widget)
      document.body.removeChild(script);
    };
  }, []);

  return <div>Your App Content</div>;
};
```

---

## 🛠️ Configuration & Customization

The widget is currently self-contained. To change the links or the "Tools & Kits" list, you need to update the source code directly.

1. **Clone the repo:**

```bash
git clone https://github.com/md8-habibullah/webapp-launcher.git

```

2. **Edit `launcher.js`:**
   Look for the `APPS` constant at the top of the file:

```javascript
const APPS = [
  {
    name: "My New App",
    url: "https://example.com",
    description: "Description here",
  },
  // ... add more items
];
```

3. **Push changes:**
   Once you push to GitHub, the **jsDelivr** link will automatically update (it might take a few minutes to clear the cache).

### Purging CDN Cache

If you update the code but don't see changes on your site, you can force-purge the cache here:

Go here : [https://www.jsdelivr.com/tools/purge](https://www.jsdelivr.com/tools/purge) and

Enter: 
```URL
https://cdn.jsdelivr.net/gh/md8-habibullah/webapp-launcher@main/launcher.js
```

OR Try Click : [https://purge.jsdelivr.net/gh/md8-habibullah/webapp-launcher@main/launcher.js](https://purge.jsdelivr.net/gh/md8-habibullah/webapp-launcher@main/launcher.js)

---

## 🎨 Tech Stack

- **Language:** JavaScript (ES6+)
- **Component Model:** Native Web Components (`HTMLElement`, `customElements`)
- **Styling:** CSS-in-JS (Injected into Shadow Root)
- **Icons:** Inline SVGs (No external icon font requests)
