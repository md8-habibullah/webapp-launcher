(function () {
  // CONFIGURATION: Cleaned up. No more manual SVG icons needed.
  const APPS = [
    { name: "HABIBULLAH", url: "https://habibullah.dev", description: "Personal Portfolio" },
    { name: "Some Kits", url: "https://habibullah.dev/kits", description: "Daily Useges Kits" },
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
      this.addEventListeners();
    }

    cleanDomain(url) {
      return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
    }

    // Smartly extracts 1 or 2 letters for the Avatar
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
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        container.classList.remove("open");
        btn.classList.remove("active");
        backdrop.classList.remove("visible");
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    }

    close() {
      if (this.isOpen) this.toggle();
    }

    copyToClipboard(text, btnElement) {
      navigator.clipboard.writeText(text).then(() => {
        const originalIcon = btnElement.innerHTML;
        btnElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          btnElement.innerHTML = originalIcon;
          this.close();
        }, 600);
      });
    }

    render() {
      const styles = `
        <style>
          :host {
            position: fixed; top: clamp(10%, 15vh, 20%); right: 0; z-index: 2147483647;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            pointer-events: none; -webkit-tap-highlight-color: transparent;
          }

          * { box-sizing: border-box; margin: 0; padding: 0; }

          .backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: none; z-index: -1; pointer-events: none;
            background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(3px);
            transition: opacity 0.3s ease;
          }
          .backdrop.visible { display: block; pointer-events: auto; animation: fadeIn 0.2s forwards; }

          .launcher-container {
            display: flex; align-items: flex-start; flex-direction: row-reverse;
            pointer-events: none; position: relative; right: 0;
          }

          .launcher-btn {
            width: 46px; height: 46px;
            background: linear-gradient(135deg, #1d232a, #2a323c);
            border-radius: 50% 0 0 50%; cursor: pointer;
            animation: pulse-glow 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
            display: flex; align-items: center; justify-content: center;
            color: rgba(255,255,255,0.9); transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            border: 1px solid rgba(255,255,255,0.1); border-right: none;
            box-shadow: -4px 4px 12px rgba(0,0,0,0.4);
            position: relative; z-index: 2; flex-shrink: 0; pointer-events: auto;
          }
           
          .launcher-btn:hover { background: #2a323c; width: 52px; color: #10b981; box-shadow: -6px 6px 16px rgba(16, 185, 129, 0.25); }
          .launcher-btn.active { background: #ef4444; color: white; width: 46px; border-color: #ef4444; animation: none; box-shadow: -2px 2px 10px rgba(239, 68, 68, 0.5); }

          .launcher-popup {
            width: calc(100vw - 60px); max-width: 540px;
            background: rgba(18, 22, 27, 0.85);
            backdrop-filter: blur(18px) saturate(200%); -webkit-backdrop-filter: blur(18px) saturate(200%);
            border: 1px solid rgba(255,255,255,0.1); border-right: none;
            border-radius: 16px 0 16px 16px;
            box-shadow: -10px 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.05);
            padding: 12px; transform-origin: right top; transform: scale(0.95) translateX(20px);
            opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); margin-right: -1px;
            display: flex; flex-direction: column; pointer-events: none;
          }

          .launcher-container.open .launcher-popup { transform: scale(1) translateX(0); opacity: 1; visibility: visible; pointer-events: auto; }

          .popup-header {
            font-size: 13px; font-weight: 800; color: #10b981;
            text-transform: uppercase; letter-spacing: 1.5px;
            margin: 4px 4px 12px 4px; display: flex; align-items: center; gap: 8px;
          }
          .popup-header::after {
            content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(16,185,129,0.4), transparent);
          }

          .app-list {
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; 
            max-height: calc(100vh - 180px); overflow-y: auto; 
            padding-right: 4px; padding-bottom: 4px;
          }

          .app-list::-webkit-scrollbar { width: 4px; }
          .app-list::-webkit-scrollbar-track { background: transparent; }
          .app-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
          .app-list::-webkit-scrollbar-thumb:hover { background: #10b981; }

          @media (min-width: 481px) {
            .flip-card:last-child:nth-child(odd) { grid-column: 1 / -1; }
          }

          .flip-card {
            background-color: transparent; width: 100%; height: 72px; position: relative;
            display: flex; align-items: center;
          }

          .front-link {
            display: flex; align-items: center; gap: 12px; padding: 8px 12px;
            width: 70%; height: 100%; text-decoration: none; cursor: pointer;
            background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 10px 0 0 10px; transition: background 0.2s, border-color 0.2s;
          }
          .front-link:hover {
            background: rgba(255, 255, 255, 0.06); border-color: rgba(16, 185, 129, 0.3);
          }

          .app-avatar {
            width: 40px; height: 40px; border-radius: 10px;
            background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.02));
            border: 1px solid rgba(16,185,129,0.2); flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            font-size: 15px; font-weight: 800; color: #10b981; letter-spacing: 0.5px;
          }

          .app-info {
            display: flex; flex-direction: column; overflow: hidden; justify-content: center; flex: 1;
          }

          .app-name {
            font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 2px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .app-domain {
            font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }

          .copy-btn {
            width: 30%; height: 100%; background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.08) 100%);
            border: 1px solid rgba(16, 185, 129, 0.3); border-left: none;
            border-radius: 0 10px 10px 0; cursor: pointer; color: #fff;
            display: flex; align-items: center; justify-content: center; gap: 6px;
            font-size: 12px; font-weight: 700; transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            padding: 8px 12px; pointer-events: auto;
          }
          .copy-btn:hover {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0.15) 100%);
            border-color: #10b981; box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
          }
          .copy-btn:active {
            background: #10b981; color: #000; border-color: #10b981;
          }

          @keyframes pulse-glow {
            0% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

          /* MOBILE OPTIMIZATIONS */
          @media (max-width: 480px) {
            .launcher-popup { width: calc(100vw - 50px); }
            .app-list { grid-template-columns: 1fr; }
            .flip-card:last-child:nth-child(odd) { grid-column: 1; }
            .flip-card { height: 68px; }
            .front-link { width: 65%; padding: 6px 10px; }
            .copy-btn { width: 35%; padding: 6px 8px; }
            .app-avatar { width: 36px; height: 36px; font-size: 13px; }
            .app-name { font-size: 14px; }
            .app-domain { font-size: 11px; }
          }
        </style>
      `;

      const appsHtml = APPS.map(app => `
        <div class="flip-card">
          <a href="${app.url}" target="_blank" rel="noopener noreferrer" class="front-link link-item">
            <div class="app-avatar">${this.getInitials(app.name)}</div>
            <div class="app-info">
              <span class="app-name">${app.name}</span>
              <span class="app-domain">${this.cleanDomain(app.url)}</span>
            </div>
          </a>
          <button class="copy-btn" title="Copy URL" data-link="${app.url}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      `).join("");

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="backdrop"></div>
        <div class="launcher-container">
          <div class="launcher-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
          <div class="launcher-popup">
            <div class="popup-header">DOT DOT DOT</div>
            <div class="app-list">
              ${appsHtml}
            </div>
          </div>
        </div>
      `;
    }

    addEventListeners() {
      const btn = this.shadowRoot.querySelector(".launcher-btn");
      const container = this.shadowRoot.querySelector(".launcher-container");

      btn.addEventListener("mouseenter", () => {
        if (!this.isOpen) this.toggle();
      });

      container.addEventListener("mouseleave", () => {
        this.close();
      });

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggle();
      });

      this.shadowRoot.querySelector(".backdrop").addEventListener("click", () => this.close());

      const links = this.shadowRoot.querySelectorAll(".link-item");
      links.forEach((link) => {
        link.addEventListener("click", () => this.close());
      });

      const copyButtons = this.shadowRoot.querySelectorAll(".copy-btn");
      copyButtons.forEach((copyBtn) => {
        copyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.copyToClipboard(copyBtn.dataset.link, copyBtn);
        });
      });
    }
  }

  if (!customElements.get("habibullah-launcher")) {
    customElements.define("habibullah-launcher", HabibullahLauncher);
  }

  const launcher = document.createElement("habibullah-launcher");
  document.body.appendChild(launcher);
})();
