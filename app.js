const apps = [
  {
    name: "TARS Stock Tracker",
    description: "Market watch, insider activity, and stock signals in one focused dashboard.",
    url: "https://marketlens-jn9s.onrender.com",
  },
  {
    name: "Expense Processor",
    description: "Quick expense capture and personal finance visibility without extra ceremony.",
    url: "https://expense-processor-1.onrender.com",
  },
  {
    name: "DraftDay",
    description: "Daily fantasy drafting tool for slate planning and lineup decisions.",
    url: "https://thedraftday.com/",
  },
  {
    name: "Atlas History",
    description: "A history website exploring the past through place, people, and events.",
    url: "https://history.rthomas.app",
  },
  {
    name: "Scoppa",
    description: "Shopify-backed storefront for curated goods.",
    url: "https://www.scoppa.shop/",
  },
];

const appCard = document.querySelector("#appCard");

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  }[c]));
}

function renderApps() {
  appCard.innerHTML = apps.map((app, i) => `
    <div class="row${i === 0 ? " is-open" : ""}">
      <button class="row-trigger" type="button" aria-expanded="${i === 0}" data-app="${i}">
        <span class="row-title">${escapeHtml(app.name)}</span>
        <span class="row-meta">${app.url === "#" ? "soon" : "live"}</span>
        <span class="row-chevron" aria-hidden="true">›</span>
      </button>
      <div class="row-panel"><div class="row-inner">
        <div class="row-body">
          <p>${escapeHtml(app.description)}</p>
          ${app.url === "#"
            ? `<span class="row-meta">URL pending</span>`
            : `<a href="${app.url}" rel="noreferrer">Launch →</a>`}
        </div>
      </div></div>
    </div>
  `).join("");
}

function toggleRow(trigger) {
  const row = trigger.closest(".row");
  const open = row.classList.toggle("is-open");
  trigger.setAttribute("aria-expanded", String(open));
}

appCard.addEventListener("click", (e) => {
  const t = e.target.closest("[data-app]");
  if (t) toggleRow(t);
});

renderApps();
