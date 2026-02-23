(function () {
    // CONFIGURATION: Added unique SVG icons for blazing-fast visual lookup
    const APPS = [
        { name: "HABIBULLAH", url: "https://habibullah.dev", description: "Personal Portfolio", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>` },
        { name: "Some Kits", url: "https://habibullah.dev/kits", description: "Daily Useges Kits", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>` },
        { name: "Whiteboard Draw", url: "https://draw.habibullah.dev", description: "Visual Collaboration", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>` },
        { name: "Carbon Snippets", url: "https://carbon.habibullah.dev", description: "Beautiful Code Images", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>` },
        { name: "AnyCable Chat", url: "https://any-cable.habibullah.dev/", description: "Real-time WebSocket", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>` },
        { name: "Ledger Tracker", url: "https://ledger.habibullah.dev", description: "Finance Tracking", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>` },
        { name: "Collaborative Editor", url: "https://liveblocks.habibullah.dev/", description: "Real-time Document Editor", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>` },
        { name: "IT Tools (dev)", url: "https://it-tools.habibullah.dev", description: "Developer Utilities", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>` },
        { name: "Code Transformer", url: "https://transform.habibullah.dev", description: "Polyglot Code Converter", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>` },
        { name: "Free for Dev", url: "https://free-for-dev.habibullah.dev", description: "Free SaaS & PaaS", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>` },
        { name: "System Status", url: "https://status.habibullah.dev", description: "Uptime Monitoring", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>` },
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
            position: fixed;
            top: clamp(10%, 15vh, 20%);
            right: 0;
            z-index: 2147483647;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            pointer-events: none;
            -webkit-tap-highlight-color: transparent;
          }

          * { box-sizing: border-box; margin: 0; padding: 0; }

          .backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: none; z-index: -1; pointer-events: auto;
            background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(3px);
            transition: opacity 0.3s ease;
          }
          .backdrop.visible { display: block; animation: fadeIn 0.2s forwards; }

          .launcher-container {
            display: flex; align-items: flex-start; flex-direction: row-reverse;
            pointer-events: auto; position: relative; right: 0; 
          }

          .launcher-btn {
            width: 46px; height: 46px;
            background: linear-gradient(135deg, #1d232a, #2a323c);
            border-radius: 50% 0 0 50%; cursor: pointer;
            animation: pulse-glow 2s infinite cubic-bezier(0.4, 0, 0.2, 1); 
            display: flex; align-items: center; justify-content: center;
            color: rgba(255,255,255,0.9);
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            border: 1px solid rgba(255,255,255,0.1); border-right: none;
            box-shadow: -4px 4px 12px rgba(0,0,0,0.4);
            position: relative; z-index: 2; flex-shrink: 0;
          }
           
          .launcher-btn:hover { background: #2a323c; width: 52px; color: #10b981; box-shadow: -6px 6px 16px rgba(16, 185, 129, 0.25); }
          .launcher-btn.active { background: #ef4444; color: white; width: 46px; border-color: #ef4444; animation: none; box-shadow: -2px 2px 10px rgba(239, 68, 68, 0.5); }

          .launcher-popup {
            width: calc(100vw - 60px); max-width: 580px; /* Slightly wider to accommodate big text */
            background: rgba(18, 22, 27, 0.9);
            backdrop-filter: blur(18px) saturate(200%); -webkit-backdrop-filter: blur(18px) saturate(200%);
            border: 1px solid rgba(255,255,255,0.1); border-right: none;
            border-radius: 16px 0 16px 16px;
            box-shadow: -10px 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.05);
            padding: 10px; /* Reduced padding */
            transform-origin: right top; transform: scale(0.95) translateX(20px); 
            opacity: 0; visibility: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); margin-right: -1px;
            display: flex; flex-direction: column;
          }

          .launcher-container.open .launcher-popup { transform: scale(1) translateX(0); opacity: 1; visibility: visible; }

          .popup-header {
            font-size: 13px; font-weight: 800; color: #10b981;
            text-transform: uppercase; letter-spacing: 1.5px;
            margin: 4px 4px 10px 4px; display: flex; align-items: center; gap: 8px;
          }
          .popup-header::after {
            content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(16,185,129,0.4), transparent);
          }

          .app-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* STRICT 2 COLUMNS */
            gap: 6px; /* Reduced gap */
            max-height: calc(100vh - 180px); overflow-y: auto; 
            padding-right: 4px; padding-bottom: 4px;
          }

          .app-list::-webkit-scrollbar { width: 4px; }
          .app-list::-webkit-scrollbar-track { background: transparent; }
          .app-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
          .app-list::-webkit-scrollbar-thumb:hover { background: #10b981; }

          /* 🌟 MAGIC TRICK: Makes the last item span 2 columns if the total is odd */
          @media (min-width: 481px) {
            .flip-card:last-child:nth-child(odd) {
              grid-column: 1 / -1; 
            }
          }

          .flip-card {
            background-color: transparent; width: 100%; height: 86px; perspective: 1000px;
          }

          .flip-card-inner {
            position: relative; width: 100%; height: 100%;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d;
          }

          .flip-card:hover .flip-card-inner, .flip-card:active .flip-card-inner, .flip-card:focus-within .flip-card-inner {
            transform: rotateX(180deg);
          }

          .flip-card-front, .flip-card-back {
            position: absolute; display: flex; flex-direction: column; justify-content: center;
            width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden;
            border-radius: 8px; padding: 8px 12px; /* Less padding, more content space */
          }

          .flip-card-front {
            background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.06); align-items: flex-start;
          }

          /* BIGGER FONTS AND ICONS */
          .app-name { 
            font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 4px;
            display: flex; align-items: center; gap: 8px; width: 100%;
          }
          .app-domain { 
            font-size: 12px; color: rgba(255,255,255,0.45); font-weight: 600;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; 
            padding-left: 28px; /* Align under text, avoiding icon */
          }

          .flip-card-back {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.08) 100%);
            border: 1px solid rgba(16, 185, 129, 0.3); transform: rotateX(180deg);
            align-items: center; text-align: center;
          }
          
          .app-desc { 
            font-size: 13px; font-weight: 500; color: #fff; margin-bottom: 8px; line-height: 1.2;
            display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          }

          .action-buttons { display: flex; gap: 6px; width: 100%; justify-content: center; }

          .visit-btn {
            background: #10b981; color: #000; text-decoration: none; font-size: 13px; font-weight: 800;
            padding: 6px 18px; border-radius: 6px; transition: all 0.2s; flex: 1; max-width: 120px;
            display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16,185,129,0.3);
          }
          .visit-btn:hover { background: #0ea5e9; box-shadow: 0 4px 12px rgba(14,165,233,0.4); color: #fff; }

          .copy-btn {
            background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer;
            width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
            transition: all 0.2s;
          }
          .copy-btn:hover { background: #10b981; border-color: #10b981; color: #000; }

          @keyframes pulse-glow {
            0% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

          /* MOBILE OPTIMIZATIONS */
          @media (max-width: 480px) {
            .launcher-popup { width: calc(100vw - 50px); }
            .app-list { grid-template-columns: 1fr; } /* Stack vertically on mobile */
            .flip-card:last-child:nth-child(odd) { grid-column: 1; } /* Reset span for mobile */
            .flip-card { height: 80px; }
            .app-name { font-size: 15px; }
            .app-desc { font-size: 12px; }
          }
        </style>
      `;

            const appsHtml = APPS.map(app => `
        <div class="flip-card" tabindex="0">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <span class="app-name">
                ${app.icon}
                ${app.name}
              </span>
              <span class="app-domain">${this.cleanDomain(app.url)}</span>
            </div>
            <div class="flip-card-back">
              <span class="app-desc">${app.description}</span>
              <div class="action-buttons">
                <a href="${app.url}" target="_blank" class="visit-btn link-item">Visit</a>
                <button class="copy-btn" title="Copy Link" data-link="${app.url}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
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
