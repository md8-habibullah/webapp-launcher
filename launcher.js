(function () {
  // CONFIGURATION: Add your apps here
  const APPS = [
    {
      name: "HABIBULLAH",
      url: "https://habibullah.dev",
      description: "Personal Portfolio",
    },
    {
      name: "Some Kits",
      url: "https://habibullah.dev/kits",
      description: "Daily Useges Kits",
    },
    {
      name: "Whiteboard Draw",
      url: "https://draw.habibullah.dev",
      description: "Visual Collaboration",
    },
    {
      name: "Ledger Tracker",
      url: "https://ledger.habibullah.dev",
      description: "Finance Tracking",
    },
    {
      name: "IT Tools (dev)",
      url: "https://it-tools.habibullah.dev",
      description: "Developer Utilities",
    },
    {
      name: "System Status",
      url: "https://status.habibullah.dev",
      description: "Uptime & Incident Monitoring",
    },

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
      return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
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
        // Cross Icon
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        container.classList.remove("open");
        btn.classList.remove("active");
        backdrop.classList.remove("visible");
        // Circle/Menu Icon
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    }

    close() {
      if (this.isOpen) this.toggle();
    }

    copyToClipboard(text, btnElement) {
      navigator.clipboard.writeText(text).then(() => {
        const originalIcon = btnElement.innerHTML;
        btnElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
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
            top: 15%;
            right: 0;
            z-index: 2147483647;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            pointer-events: none; /* Let clicks pass through when closed */
          }

          .backdrop {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            display: none;
            z-index: -1;
            pointer-events: auto;
          }
          .backdrop.visible { display: block; }

          /* MAIN CONTAINER: Handles the layout */
          .launcher-container {
            display: flex;
            align-items: flex-start;
            flex-direction: row-reverse; /* Button on right, content extends left */
            pointer-events: auto;
            position: relative;
            /* Move slightly right to hide the flat edge of button if needed, currently 0 */
            right: 0; 
          }

          /* BUTTON */
          .launcher-btn {
            width: 48px;
            height: 48px;
            background: #1d232a;
            border-radius: 50% 0 0 50%;
            cursor: pointer;
            animation: wave-alert 2s infinite cubic-bezier(0.66, 0, 0, 1); 
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255,255,255,0.8);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255,255,255,0.05);
            border-right: none;
            position: relative;
            z-index: 2;
            flex-shrink: 0;
          }
           
          .launcher-btn:hover {
            background: #2a323c;
            width: 52px; /* Slight peek */
            color: #fff;
          }
           
          /* Active State: Becomes Red Close Button */
          .launcher-btn.active {
            background: #ef4444;
            color: white;
            width: 48px;
            border-color: #ef4444;
            box-shadow: none; /* Remove shadow to blend with popup */
          }

          /* POPUP MENU */
          .launcher-popup {
            width: 300px;
            background: rgba(29, 35, 42, 0.95); /* More solid for better read */
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            border-right: none; /* Connects to button */
            border-radius: 16px 0 16px 16px; /* Top-right square to touch button */
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            padding: 16px;
            
            /* Animation Logic: Extend from Right */
            transform-origin: right center;
            transform: scaleX(0); 
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            
            /* Positioning logic */
            margin-right: -1px; /* Overlap border slightly */
            margin-top: 0px; 
          }

          /* When Container is Open */
          .launcher-container.open .launcher-popup {
            transform: scaleX(1);
            opacity: 1;
          }

          .popup-header {
            font-size: 13px;
            font-weight: 700;
            color: rgba(255,255,255,0.4);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            padding-left: 4px;
            white-space: nowrap; /* Prevent wrap during anim */
          }

          .app-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            /* NEW: Allow scrolling for many tools */
            max-height: 60vh; 
            overflow-y: auto; 
            padding-right: 6px; /* Space so scrollbar doesn't touch text */
          }

          /* NEW: Custom Scrollbar Styling to match your dark theme */
          .app-list::-webkit-scrollbar {
            width: 5px;
          }
          .app-list::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 10px;
          }
          .app-list::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
          }
          .app-list::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          .app-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px;
            border-radius: 12px;
            transition: background 0.2s;
          }
          .app-row:hover { background: rgba(255,255,255,0.08); }

          .app-link {
            flex: 1;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            min-width: 0;
          }
          .app-name { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 2px; }
          .app-desc { font-size: 12px; color: rgba(255,255,255,0.5); }
          .app-domain { font-size: 10px; color: #10b981; font-family: monospace; margin-top: 2px; }

          .copy-btn {
            background: rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.05);
            color: rgba(255,255,255,0.6);
            cursor: pointer;
            width: 36px; height: 36px;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s;
          }
          .copy-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

          @keyframes wave-alert {
            0% {
              /* Base shadow + starting wave */
              box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0.5);
            }
            70% {
              /* Base shadow + expanded transparent wave */
              box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 15px rgba(16, 185, 129, 0);
            }
            100% {
              box-shadow: -4px 0 15px rgba(0,0,0,0.3), 0 0 0 0 rgba(16, 185, 129, 0);
            }
          }
        </style>
      `;

      const appsHtml = APPS.map(
        (app) => `
        <div class="app-row">
          <a href="${app.url}" target="_blank" class="app-link link-item">
            <span class="app-name">${app.name}</span>
            <span class="app-desc">${app.description}</span>
            <span class="app-domain">${this.cleanDomain(app.url)}</span>
          </a>
          <button class="copy-btn" title="Copy Link" data-link="${app.url}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      `,
      ).join("");

      this.shadowRoot.innerHTML = `
        ${styles}
        <div class="backdrop"></div>
        <div class="launcher-container">
          <div class="launcher-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
           
          <div class="launcher-popup">
            <div class="popup-header">Services, Tools & Kits</div>
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

      // 1. OPEN: Only trigger when hovering exactly over the button
      btn.addEventListener("mouseenter", () => {
        if (!this.isOpen) this.toggle();
      });

      // 2. CLOSE: Trigger when the mouse leaves the entire component (button + popup)
      container.addEventListener("mouseleave", () => {
        this.close();
      });

      // 3. Optional Mobile Fallback: Keep click just in case
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggle();
      });

      // 4. Other listeners (backdrop, links, copy)
      this.shadowRoot
        .querySelector(".backdrop")
        .addEventListener("click", () => this.close());

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
