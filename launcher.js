(function () {
  // CONFIGURATION: Add your apps here
  const APPS = [
    {
      name: "Global ID",
      url: "https://habibullah.dev",
      description: "My Portfolio",
    },
    {
      name: "IT Tools",
      url: "https://it-tools.habibullah.dev",
      description: "Developer Utilities",
    },
    {
      name: "Whiteboard",
      url: "https://draw.habibullah.dev",
      description: "Visual Collaboration",
    },
    {
      name: "Ledger Tracker",
      url: "https://ledger.habibullah.dev",
      description: "Finance Tracking",
    },
  ];

  class HabibullahLauncher extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" }); // This isolates your CSS!
      this.isOpen = false;
    }

    connectedCallback() {
      this.render();
      this.addEventListeners();
    }

    toggle() {
      this.isOpen = !this.isOpen;
      const popup = this.shadowRoot.querySelector(".launcher-popup");
      const btn = this.shadowRoot.querySelector(".launcher-btn");

      if (this.isOpen) {
        popup.classList.add("visible");
        btn.classList.add("active");
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        popup.classList.remove("visible");
        btn.classList.remove("active");
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
      }
    }

    copyToClipboard(text, btnElement) {
      navigator.clipboard.writeText(text).then(() => {
        const originalIcon = btnElement.innerHTML;
        btnElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          btnElement.innerHTML = originalIcon;
        }, 2000);
      });
    }

    render() {
      // Modern Glassmorphism CSS
      const styles = `
        <style>
          :host {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 2147483647; /* Maximum Z-Index */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          
          /* The Floating Button */
          .launcher-btn {
            width: 56px;
            height: 56px;
            background: #0f172a;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255,255,255,0.1);
          }
          
          .launcher-btn:hover {
            transform: scale(1.05);
            background: #1e293b;
          }
          
          .launcher-btn.active {
            background: #ef4444;
            transform: rotate(90deg);
          }

          /* The Popup Container */
          .launcher-popup {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 300px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            padding: 8px;
            opacity: 0;
            transform: translateY(10px) scale(0.95);
            pointer-events: none;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: bottom right;
          }

          .launcher-popup.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
          }

          /* App Items */
          .app-item {
            display: flex;
            align-items: center;
            padding: 12px;
            border-radius: 8px;
            color: #fff;
            text-decoration: none;
            transition: background 0.2s;
            gap: 12px;
          }

          .app-item:hover {
            background: rgba(255,255,255,0.05);
          }

          .app-info {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .app-name {
            font-weight: 600;
            font-size: 14px;
            color: #f1f5f9;
          }

          .app-desc {
            font-size: 11px;
            color: #94a3b8;
            margin-top: 2px;
          }

          /* Copy Button */
          .copy-btn {
            background: transparent;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
          }

          .copy-btn:hover {
            background: rgba(255,255,255,0.1);
            color: #fff;
          }
        </style>
      `;

      // Generate App List HTML
      const appsHtml = APPS.map(
        (app) => `
        <div class="app-row" style="display:flex; align-items:center;">
          <a href="${app.url}" class="app-item" style="flex:1;">
             <div style="width:32px; height:32px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px;">${app.name.substring(0, 2).toUpperCase()}</div>
            <div class="app-info">
              <span class="app-name">${app.name}</span>
              <span class="app-desc">${app.description}</span>
            </div>
          </a>
          <button class="copy-btn" title="Copy Link" data-link="${app.url}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      `,
      ).join("");

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="launcher-popup">
          <div style="padding: 8px 12px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Habibullah Apps</div>
          ${appsHtml}
        </div>
        <div class="launcher-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        </div>
      `;
    }

    addEventListeners() {
      this.shadowRoot
        .querySelector(".launcher-btn")
        .addEventListener("click", () => this.toggle());

      const copyButtons = this.shadowRoot.querySelectorAll(".copy-btn");
      copyButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation(); // Don't close popup
          this.copyToClipboard(btn.dataset.link, btn);
        });
      });
    }
  }

  // Register the custom element
  if (!customElements.get("habibullah-launcher")) {
    customElements.define("habibullah-launcher", HabibullahLauncher);
  }

  // Auto-inject into body
  const launcher = document.createElement("habibullah-launcher");
  document.body.appendChild(launcher);
})();
