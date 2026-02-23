(function () {
    // CONFIGURATION: Add your apps here
    const APPS = [
        { name: "HABIBULLAH", url: "https://habibullah.dev", description: "Personal Portfolio" },
        { name: "Some Kits", url: "https://habibullah.dev/kits", description: "Daily Useges Kits" },
        { name: "Whiteboard Draw", url: "https://draw.habibullah.dev", description: "Visual Collaboration" },
        { name: "Carbon Snippets", url: "https://carbon.habibullah.dev", description: "Beautiful Code Images" },
        { name: "AnyCable Demo", url: "https://any-cable.habibullah.dev/", description: "Real-time WebSocket Communication" },
        { name: "Ledger Tracker", url: "https://ledger.habibullah.dev", description: "Finance Tracking" },
        { name: "Collaborative Editor", url: "https://liveblocks.habibullah.dev/", description: "Real-time Collaborative Document Editor" },
        { name: "IT Tools (dev)", url: "https://it-tools.habibullah.dev", description: "Developer Utilities" },
        { name: "Code Transformer", url: "https://transform.habibullah.dev", description: "Polyglot Code Converter" },
        { name: "Free for Dev", url: "https://free-for-dev.habibullah.dev", description: "Free SaaS & PaaS Directory" },
        { name: "System Status", url: "https://status.habibullah.dev", description: "Uptime & Incident Monitoring" },
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

        toggle() {
            this.isOpen = !this.isOpen;
            const container = this.shadowRoot.querySelector(".launcher-container");
            const btn = this.shadowRoot.querySelector(".launcher-btn");
            const backdrop = this.shadowRoot.querySelector(".backdrop");

            if (this.isOpen) {
                container.classList.add("open");
                btn.classList.add("active");
                backdrop.classList.add("visible");
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            } else {
                container.classList.remove("open");
                btn.classList.remove("active");
                backdrop.classList.remove("visible");
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        }

        close() {
            if (this.isOpen) this.toggle();
        }

        copyToClipboard(text, btnElement) {
            navigator.clipboard.writeText(text).then(() => {
                const originalIcon = btnElement.innerHTML;
                btnElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
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
            position: fixed;
            top: clamp(10%, 15vh, 20%);
            right: 0;
            z-index: 2147483647;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            pointer-events: none;
            -webkit-tap-highlight-color: transparent;
          }

          * { box-sizing: border-box; }

          .backdrop {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            display: none;
            z-index: -1;
            pointer-events: auto;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(2px);
            transition: opacity 0.3s ease;
          }
          .backdrop.visible { display: block; animation: fadeIn 0.3s forwards; }

          .launcher-container {
            display: flex;
            align-items: flex-start;
            flex-direction: row-reverse;
            pointer-events: auto;
            position: relative;
            right: 0; 
          }

          /* MODERN BUTTON */
          .launcher-btn {
            width: 44px; height: 44px;
            background: linear-gradient(135deg, #1d232a, #2a323c);
            border-radius: 50% 0 0 50%;
            cursor: pointer;
            animation: pulse-glow 2s infinite cubic-bezier(0.4, 0, 0.2, 1); 
            display: flex; align-items: center; justify-content: center;
            color: rgba(255,255,255,0.9);
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            border: 1px solid rgba(255,255,255,0.1);
            border-right: none;
            box-shadow: -4px 4px 12px rgba(0,0,0,0.3);
            position: relative;
            z-index: 2; flex-shrink: 0;
          }
           
          .launcher-btn:hover { 
            background: #2a323c; 
            width: 50px; 
            color: #10b981; 
            box-shadow: -6px 6px 16px rgba(16, 185, 129, 0.2);
          }
          .launcher-btn.active { 
            background: #ef4444; 
            color: white; 
            width: 44px; 
            border-color: #ef4444; 
            animation: none;
            box-shadow: -2px 2px 10px rgba(239, 68, 68, 0.4);
          }

          /* RESPONSIVE POPUP */
          .launcher-popup {
            width: calc(100vw - 60px); /* Fits mobile perfectly */
            max-width: 540px; /* Caps out nicely on PC/Tablet */
            background: rgba(18, 22, 27, 0.85);
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            border: 1px solid rgba(255,255,255,0.08);
            border-right: none;
            border-radius: 16px 0 16px 16px;
            box-shadow: -10px 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.05);
            padding: 12px;
            transform-origin: right top;
            transform: scale(0.95) translateX(20px); 
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            margin-right: -1px;
            display: flex;
            flex-direction: column;
          }

          .launcher-container.open .launcher-popup { 
            transform: scale(1) translateX(0); 
            opacity: 1; 
            visibility: visible;
          }

          .popup-header {
            font-size: 11px; font-weight: 800; color: #10b981;
            text-transform: uppercase; letter-spacing: 1.5px;
            margin-bottom: 10px; padding: 0 4px;
            display: flex; align-items: center; gap: 6px;
          }
          .popup-header::after {
            content: ""; flex: 1; height: 1px;
            background: linear-gradient(90deg, rgba(16,185,129,0.3), transparent);
          }

          /* GRID SYSTEM - Responsive */
          .app-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
            max-height: calc(100vh - 200px); 
            overflow-y: auto; 
            padding-right: 4px;
            padding-bottom: 4px;
          }

          .app-list::-webkit-scrollbar { width: 4px; }
          .app-list::-webkit-scrollbar-track { background: transparent; }
          .app-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
          .app-list::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.5); }

          /* 3D FLIP CARDS */
          .flip-card {
            background-color: transparent;
            width: 100%;
            height: 84px; /* Compact height for better space utilization */
            perspective: 1000px;
          }

          .flip-card-inner {
            position: relative;
            width: 100%; height: 100%;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
          }

          /* Trigger flip on hover (PC) or active/focus-within (Mobile) */
          .flip-card:hover .flip-card-inner,
          .flip-card:active .flip-card-inner,
          .flip-card:focus-within .flip-card-inner {
            transform: rotateX(180deg);
          }

          .flip-card-front, .flip-card-back {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%; height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 10px;
            padding: 10px 14px;
          }

          /* FRONT: Clean & Glassy */
          .flip-card-front {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.04);
            align-items: flex-start;
          }

          .app-name { 
            font-size: 14px; font-weight: 700; color: #fff; 
            margin-bottom: 2px;
            display: flex; align-items: center; gap: 6px;
          }
          
          .app-domain { 
            font-size: 11px; color: rgba(255,255,255,0.4); 
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; 
          }

          /* BACK: Vibrant Action Area */
          .flip-card-back {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%);
            border: 1px solid rgba(16, 185, 129, 0.2);
            transform: rotateX(180deg);
            align-items: center;
            text-align: center;
          }
          
          .app-desc { 
            font-size: 11px; color: rgba(255,255,255,0.85); 
            margin-bottom: 8px; line-height: 1.2;
            display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          }

          .action-buttons { display: flex; gap: 6px; width: 100%; justify-content: center; }

          .visit-btn {
            background: #10b981; color: #000; 
            text-decoration: none; font-size: 11px; font-weight: 700;
            padding: 4px 16px; border-radius: 6px;
            transition: all 0.2s; flex: 1; max-width: 100px;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 2px 8px rgba(16,185,129,0.3);
          }
          .visit-btn:hover { background: #0ea5e9; box-shadow: 0 2px 8px rgba(14,165,233,0.4); color: #fff; }

          .copy-btn {
            background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);
            color: #fff; cursor: pointer;
            width: 26px; height: 26px; border-radius: 6px;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s;
          }
          .copy-btn:hover { background: #10b981; border-color: #10b981; color: #000; }

          /* ANIMATIONS */
          @keyframes pulse-glow {
            0% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* MOBILE OPTIMIZATIONS */
          @media (max-width: 480px) {
            .launcher-popup { padding: 10px; width: calc(100vw - 50px); }
            .app-list { grid-template-columns: 1fr; gap: 6px; }
            .flip-card { height: 76px; }
            .app-desc { font-size: 10.5px; margin-bottom: 6px; }
            .visit-btn { padding: 4px 12px; }
            .copy-btn { width: 24px; height: 24px; }
          }
        </style>
      `;

            const appsHtml = APPS.map(app => `
        <div class="flip-card" tabindex="0">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <span class="app-name">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                ${app.name}
              </span>
              <span class="app-domain">${this.cleanDomain(app.url)}</span>
            </div>
            <div class="flip-card-back">
              <span class="app-desc">${app.description}</span>
              <div class="action-buttons">
                <a href="${app.url}" target="_blank" class="visit-btn link-item">Visit</a>
                <button class="copy-btn" title="Copy Link" data-link="${app.url}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join("");

            this.shadowRoot.innerHTML = `
        ${styles}
        <div class="backdrop"></div>
        <div class="launcher-container">
          <div class="launcher-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
          <div class="launcher-popup">
            <div class="popup-header">Ecosystem Hub</div>
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
