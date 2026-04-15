(function () {
  /**
   * CONFIGURATION: Premium Launcher Data
   */
  const APPS = [
    { name: "HABIBULLAH", url: "https://habibullah.dev", description: "Personal Portfolio" },
    { name: "Some Kits", url: "https://habibullah.dev/kits", description: "Daily Usage Kits" },
    { name: "Whiteboard Draw", url: "https://draw.habibullah.dev", description: "Visual Collaboration" },
    { name: "Carbon Snippets", url: "https://carbon.habibullah.dev", description: "Beautiful Code Images" },
    { name: "AnyCable Demo", url: "https://any-cable.habibullah.dev/", description: "Real-time WebSocket" },
    { name: "Ledger Tracker", url: "https://ledger.habibullah.dev", description: "Finance Tracking" },
    { name: "Collaborative Editor", url: "https://liveblocks.habibullah.dev/", description: "Real-time Document Editor" },
    { name: "IT Tools (dev)", url: "https://it-tools.habibullah.dev", description: "Developer Utilities" },
    { name: "Code Transformer", url: "https://transform.habibullah.dev", description: "Polyglot Code Converter" },
    { name: "Free for Dev", url: "https://free-for-dev.habibullah.dev", description: "Free SaaS & PaaS" },
    { name: "System Status", url: "https://status.habibullah.dev", description: "Uptime Monitoring" },
  ];

  class HabibullahLauncher extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.isOpen = false;
    }

    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }

    cleanDomain(url) {
      return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
    }

    getInitials(name) {
      const words = name.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").filter(w => w);
      if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
      return (words[0][0] + words[1][0]).toUpperCase();
    }

    toggle() {
      this.isOpen = !this.isOpen;
      const container = this.shadowRoot.querySelector(".launcher-container");
      const btn = this.shadowRoot.querySelector(".launcher-btn");
      const backdrop = this.shadowRoot.querySelector(".backdrop");

      if (this.isOpen) {
        container.classList.add("open");
        btn.classList.add("active");
        backdrop.classList.add("visible");
        this.resetAnimations();
      } else {
        container.classList.remove("open");
        btn.classList.remove("active");
        backdrop.classList.remove("visible");
      }
    }

    close() {
      if (this.isOpen) this.toggle();
    }

    resetAnimations() {
      const items = this.shadowRoot.querySelectorAll(".list-item-wrapper");
      items.forEach(el => {
        el.style.animation = "none";
        el.offsetHeight; // trigger reflow
        el.style.animation = null;
      });
    }

    copyToClipboard(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        btn.classList.add("success");
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove("success");
        }, 1500);
      });
    }

    render() {
      const styles = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&family=Inter:wght@400;700&display=swap');

          :host {
            position: fixed; top: clamp(100px, 15vh, 250px); right: 0; z-index: 2147483647;
            font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
            pointer-events: none; -webkit-tap-highlight-color: transparent;
          }

          * { box-sizing: border-box; margin: 0; padding: 0; }

          .backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: none; z-index: -1; pointer-events: none;
            background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px);
            opacity: 0; transition: opacity 0.4s ease;
          }
          .backdrop.visible { display: block; opacity: 1; pointer-events: auto; }

          .launcher-container {
            display: flex; align-items: flex-start; flex-direction: row-reverse;
            pointer-events: none; position: relative; right: 0;
          }

          /* TRIGGER BUTTON */
          .launcher-btn {
            width: 54px; height: 54px;
            background: linear-gradient(145deg, #1e293b, #0f172a);
            border-radius: 50% 0 0 50%; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: #94a3b8; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(255,255,255,0.1); border-right: none;
            box-shadow: -8px 8px 24px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1);
            position: relative; z-index: 10; flex-shrink: 0; pointer-events: auto;
          }
          
          .launcher-btn::after {
            content: '1'; position: absolute; top: 10px; left: 10px;
            width: 16px; height: 16px; background: #ef4444; color: white;
            font-size: 10px; font-weight: 900; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            border: 2px solid #0f172a; animation: bounce 2s infinite;
          }

          .launcher-btn:hover { color: #10b981; transform: translateX(-4px); width: 64px; }
          .launcher-btn.active { background: #ef4444; color: white; width: 54px; border-color: #ef4444; transform: scale(0.9); }
          .launcher-btn.active::after { display: none; }

          /* POPUP WINDOW */
          .launcher-popup {
            width: calc(100vw - 74px); max-width: 480px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(24px) saturate(160%); -webkit-backdrop-filter: blur(24px) saturate(160%);
            border: 1px solid rgba(255,255,255,0.08); border-right: none;
            border-radius: 24px 0 24px 24px;
            box-shadow: -20px 40px 80px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255,255,255,0.05);
            padding: 24px; transform-origin: right top; transform: perspective(1000px) rotateY(10deg) scale(0.9) translateX(40px);
            opacity: 0; visibility: hidden; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex; flex-direction: column; gap: 20px;
            margin-right: -1px;
          }

          .launcher-container.open .launcher-popup { 
            transform: perspective(1000px) rotateY(0deg) scale(1) translateX(0); 
            opacity: 1; visibility: visible; pointer-events: auto; 
          }

          /* HEADER & STATUS */
          .popup-header {
            display: flex; flex-direction: column; gap: 10px;
          }
          .active-status {
            background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);
            color: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 11px;
            font-weight: 700; display: flex; align-items: center; gap: 8px; width: fit-content;
          }
          .status-dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }

          .user-name { color: white; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; opacity: 0.9; }

          /* LIST ITEMS */
          .app-list {
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
            max-height: 480px; overflow-y: auto; padding-right: 8px;
          }
          .app-list::-webkit-scrollbar { width: 4px; }
          .app-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

          .list-item-wrapper {
            background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
            border-radius: 16px; display: flex; align-items: center; padding: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0; transform: translateY(15px); animation: slideIn 0.4s forwards;
            position: relative; overflow: hidden;
            min-height: 72px;
          }
          .list-item-wrapper:hover {
            background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2);
            transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }

          .item-link {
            display: flex; align-items: center; gap: 12px; text-decoration: none; flex: 1; min-width: 0;
          }

          .item-avatar {
            width: 44px; height: 44px; border-radius: 14px; display: flex;
            align-items: center; justify-content: center; flex-shrink: 0;
            font-weight: 800; font-size: 15px; color: #10b981;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid rgba(16, 185, 129, 0.2);
          }

          .item-info { display: flex; flex-direction: column; min-width: 0; }
          .item-name { color: white; font-size: 15px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .item-meta { color: #64748b; font-size: 11px; font-family: ui-monospace, monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }

          /* COPY BUTTON - BOTTOM LEFT CIRCLE */
          .copy-btn {
            position: absolute; bottom: 8px; left: 8px;
            width: 24px; height: 24px; border-radius: 50%;
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(255,255,255,0.1);
            color: #94a3b8; display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s; opacity: 0; transform: scale(0.8);
            z-index: 5;
          }
          .list-item-wrapper:hover .copy-btn { opacity: 1; transform: scale(1); }
          .copy-btn:hover { background: #10b981; color: #000; border-color: #10b981; transform: scale(1.1); }
          .copy-btn.success { background: #10b981; color: #000; opacity: 1; transform: scale(1.1); }

          /* ANIMATIONS */
          @keyframes slideIn { to { opacity: 1; transform: translateY(0); } }
          @keyframes bounce { 
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }

          /* ANDROID / MOBILE OPTIMIZATIONS */
          @media (max-width: 600px) {
            .launcher-popup { 
              width: calc(100vw - 50px); 
              max-height: 85vh; 
              padding: 18px; 
              border-radius: 20px 0 20px 20px;
            }
            .app-list { grid-template-columns: 1fr; gap: 10px; }
            .list-item-wrapper { padding: 10px; min-height: 64px; }
            .item-avatar { width: 40px; height: 40px; font-size: 14px; }
            .copy-btn { opacity: 0.6; transform: scale(1); } /* Always slightly visible on mobile */
            .user-name { font-size: 18px; }
          }
        </style>
      `;

      const listHtml = APPS.map((item, index) => `
        <div class="list-item-wrapper" style="animation-delay: ${index * 0.04}s">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="item-link">
            <div class="item-avatar">${this.getInitials(item.name)}</div>
            <div class="item-info">
              <span class="item-name">${item.name}</span>
              <span class="item-meta">${this.cleanDomain(item.url)}</span>
            </div>
          </a>
          <button class="copy-btn" title="Copy URL" data-url="${item.url}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      `).join("");

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="backdrop"></div>
        <div class="launcher-container">
          <div class="launcher-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"/><path d="M8 12h8"/></svg>
          </div>
          <div class="launcher-popup">
            <div class="popup-header">
              <div class="active-status">
                <span class="status-dot"></span> Available for new opportunities
              </div>
              <h2 class="user-name">HABIBULLAH.DEV</h2>
            </div>

            <div class="app-list">
              ${listHtml}
            </div>
          </div>
        </div>
      `;
    }

    setupEventListeners() {
      const btn = this.shadowRoot.querySelector(".launcher-btn");
      const backdrop = this.shadowRoot.querySelector(".backdrop");
      const container = this.shadowRoot.querySelector(".launcher-container");

      btn.addEventListener("click", () => this.toggle());
      backdrop.addEventListener("click", () => this.close());

      // ESC key listener
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.close();
        }
      });

      // Copy buttons
      this.shadowRoot.querySelectorAll(".copy-btn").forEach(copyBtn => {
        copyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.copyToClipboard(copyBtn.dataset.url, copyBtn);
        });
      });

      // Hover logic for desktop
      if (window.matchMedia("(min-width: 1024px)").matches) {
        btn.addEventListener("mouseenter", () => {
          if (!this.isOpen) this.toggle();
        });
        container.addEventListener("mouseleave", () => {
          this.close();
        });
      }
    }
  }

  // Register Component
  if (!customElements.get("habibullah-launcher")) {
    customElements.define("habibullah-launcher", HabibullahLauncher);
  }

  // Auto-inject
  if (typeof document !== 'undefined') {
    const inject = () => {
      if (!document.querySelector("habibullah-launcher")) {
        const widget = document.createElement("habibullah-launcher");
        document.body.appendChild(widget);
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      inject();
    }
  }
})();
