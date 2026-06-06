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
            position: fixed; top: 10vh; right: 0; z-index: 2147483647;
            font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
            pointer-events: none; -webkit-tap-highlight-color: transparent;
          }

          * { box-sizing: border-box; margin: 0; padding: 0; }

          .backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: none; z-index: -1; pointer-events: none;
            background: rgba(15, 23, 42, 0.6);
            opacity: 0; transition: opacity 0.2s ease;
          }
          .backdrop.visible { display: block; opacity: 1; pointer-events: auto; }

          .launcher-container {
            display: flex; align-items: flex-start; flex-direction: row-reverse;
            pointer-events: none; position: relative; right: 0; gap: 20px;
          }

          /* TRIGGER BUTTON - PILL SHAPE */
          .launcher-btn {
            width: 56px; height: 48px;
            background: #20272c; /* Updated base color */
            border-radius: 24px 0 0 24px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: #94a3b8; transition: all 0.2s ease;
            border: 1px solid rgba(255, 255, 255, 0.1); border-right: none;
            position: relative; z-index: 10; flex-shrink: 0; pointer-events: auto;
            box-shadow: -3px 3px 10px rgba(0,0,0,0.15);
            margin-top: 0px;
          }

          .launcher-btn:hover { background: rgba(52, 211, 153, 0.1); color: #34d399; border-color: rgba(52, 211, 153, 0.3); }
          .launcher-btn.active { background: #34d399; color: #20272c; border-color: #34d399; box-shadow: none; transform: translate(2px, 2px); }

          /* POPUP WINDOW - FLAT COMPACT TRANSPARENT */
          .launcher-popup {
            width: calc(100vw - 84px); max-width: 320px;
            height: 82vh; max-height: 82vh; /* Universally 10% top + 82vh = 8% bottom gap */
            background: rgba(32, 39, 44, 0.85); /* #20272c with opacity */
            backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 12px 20px 24px 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
            
            opacity: 0; transform: translateY(10px) scale(0.98); pointer-events: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: absolute; right: calc(100% + 20px); top: 0;
            display: flex; flex-direction: column;
          }

          .launcher-container.open .launcher-popup { 
            transform: scale(1); 
            opacity: 1; visibility: visible; pointer-events: auto; 
          }

          /* HEADER - PREMIUM ALIGNMENT */
          .popup-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 16px; padding-bottom: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          h2.user-name {
            margin: 0;
            font-size: 18px; line-height: 1.2;
            font-weight: 800; color: #ffffff; letter-spacing: 1px;
            text-transform: uppercase;
          }

          /* LIST ITEMS - PREMIUM SCROLLING & SPACING */
          .app-list {
            display: flex; flex-direction: column; gap: 12px;
            max-height: calc(82vh - 100px); overflow-y: auto; padding-right: 12px;
            padding-bottom: 24px;
          }
          .app-list::-webkit-scrollbar { width: 6px; }
          .app-list::-webkit-scrollbar-thumb { background: #475569; border-radius: 6px; }
          .app-list::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); border-radius: 6px; }

          .list-item-wrapper {
            background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px; position: relative;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .list-item-wrapper:hover { 
            border-color: rgba(52, 211, 153, 0.3); background: rgba(255, 255, 255, 0.06); 
            transform: translateY(-2px); 
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }

          .item-link {
            display: flex; align-items: center; gap: 16px;
            padding: 14px 60px 14px 16px; /* Right padding prevents text overlap with copy button */
            text-decoration: none;
            color: inherit; border-radius: 12px;
          }

          /* AVATARS */
          .item-avatar {
            width: 44px; height: 44px; border-radius: 10px;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02)); 
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex; align-items: center; justify-content: center;
            font-size: 15px; font-weight: 700; color: #34d399; /* Mint green text */
            flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          }

          .item-info { display: flex; flex-direction: column; min-width: 0; gap: 4px; }
          .item-name { color: #f8fafc; font-size: 15px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: 0.2px; }
          .item-meta { color: #94a3b8; font-size: 13px; font-family: ui-monospace, monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: 0.8; }

          /* COPY BUTTON - LARGER & CENTERED */
          .copy-btn {
            position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
            width: 36px; height: 36px; border-radius: 8px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #94a3b8; display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); opacity: 0;
            z-index: 5;
          }
          .list-item-wrapper:hover .copy-btn { opacity: 1; color: #f8fafc; }
          .copy-btn:hover { background: rgba(52, 211, 153, 0.2); color: #34d399; border-color: #34d399; transform: translateY(-50%) scale(1.05); }
          .copy-btn:active { transform: translateY(-50%) scale(0.95); }
          .copy-btn.success { background: #34d399; color: #20272c; border-color: #34d399; opacity: 1; }

          /* ANDROID / MOBILE OPTIMIZATIONS */
          @media (max-width: 600px) {
            :host { top: 10vh; right: 0; left: 16px; bottom: auto; display: block; }
            .launcher-container { position: static; display: block; width: 100%; }
            .launcher-btn { 
              width: 56px; height: 48px; 
              position: absolute; right: 0; top: 12px; 
              z-index: 20; margin: 0;
            }
            .launcher-popup { 
              position: absolute;
              top: 0; left: 0; right: 16px; bottom: auto;
              width: auto; 
              max-width: none;
              padding: 12px 16px 24px 16px; 
              border-radius: 20px;
              transform-origin: top right;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
              z-index: 10;
            }
            .popup-header { display: flex; align-items: center; margin-bottom: 12px; }
            .user-name { margin: 0; }
            .app-list { padding-bottom: 24px; }
            .list-item-wrapper { min-height: 60px; }
            .copy-btn { opacity: 1; background: rgba(0, 0, 0, 0.2); border-color: rgba(255, 255, 255, 0.1); }
          }
        </style>
      `;

      const listHtml = APPS.map((item, index) => `
        <div class="list-item-wrapper">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="item-link">
            <div class="item-avatar">${this.getInitials(item.name)}</div>
            <div class="item-info">
              <span class="item-name">${item.name}</span>
              <span class="item-meta">${this.cleanDomain(item.url)}</span>
            </div>
          </a>
          <button class="copy-btn" title="Copy URL" data-url="${item.url}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      `).join("");

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="backdrop"></div>
        <div class="launcher-container">
          <div class="launcher-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>
          </div>
          <div class="launcher-popup">
            <div class="popup-header">
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
