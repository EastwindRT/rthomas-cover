const apps = [
  {
    name: "TARS Stock Tracker",
    description: "Market watch, insider activity, and stock signals in one focused dashboard.",
    url: "https://tars.rthomas.app",
  },
  {
    name: "Agent Helper Concierge",
    description: "A practical assistant layer for daily workflows, coordination, and task support.",
    url: "#",
  },
  {
    name: "Expense Tracker",
    description: "Quick expense capture and personal finance visibility without extra ceremony.",
    url: "#",
  },
];

const defaultPosts = [
  { title: "Pinned post", url: "https://x.com/" },
  { title: "Build log", url: "https://x.com/" },
];

const storageKey = "rthomas-x-feed";
const appCard = document.querySelector("#appCard");
const postCard = document.querySelector("#postCard");
const feedForm = document.querySelector("#feedForm");
const postUrl = document.querySelector("#postUrl");
const formStatus = document.querySelector("#formStatus");

let posts = loadPosts();

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  }[c]));
}

function displayUrl(url) {
  const u = new URL(url);
  return `${u.hostname}${u.pathname}`;
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

function renderPosts() {
  postCard.innerHTML = posts.map((post, i) => `
    <div class="row${i === 0 ? " is-open" : ""}">
      <button class="row-trigger" type="button" aria-expanded="${i === 0}" data-post="${i}">
        <span class="row-title">${escapeHtml(post.title)}</span>
        <span class="row-chevron" aria-hidden="true">›</span>
      </button>
      <div class="row-panel"><div class="row-inner">
        <div class="row-body">
          <p>${escapeHtml(displayUrl(post.url))}</p>
          <a href="${post.url}" target="_blank" rel="noreferrer">View on X →</a>
          <button class="remove" type="button" data-remove="${i}">Remove</button>
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

function loadPosts() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    return Array.isArray(saved) && saved.length ? saved : defaultPosts;
  } catch {
    return defaultPosts;
  }
}

function savePosts() {
  localStorage.setItem(storageKey, JSON.stringify(posts));
}

function normalizePostUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);
  const hosts = ["x.com", "www.x.com", "twitter.com", "www.twitter.com"];
  if (!hosts.includes(url.hostname.toLowerCase())) {
    throw new Error("Use an X or Twitter post link.");
  }
  return url.href;
}

function titleFromUrl(url) {
  const parts = new URL(url).pathname.split("/").filter(Boolean);
  const handle = parts[0] ? `@${parts[0]}` : "X post";
  return parts.includes("status") ? `${handle} post` : handle;
}

feedForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const url = normalizePostUrl(postUrl.value);
    if (posts.some((p) => p.url === url)) {
      formStatus.textContent = "That link is already in the feed.";
      return;
    }
    posts = [{ title: titleFromUrl(url), url }, ...posts];
    savePosts();
    renderPosts();
    feedForm.reset();
    formStatus.textContent = "Added.";
  } catch (err) {
    formStatus.textContent = err.message;
  }
});

appCard.addEventListener("click", (e) => {
  const t = e.target.closest("[data-app]");
  if (t) toggleRow(t);
});

postCard.addEventListener("click", (e) => {
  const remove = e.target.closest("[data-remove]");
  if (remove) {
    posts = posts.filter((_, i) => i !== Number(remove.dataset.remove));
    savePosts();
    renderPosts();
    formStatus.textContent = "Removed.";
    return;
  }
  const t = e.target.closest("[data-post]");
  if (t) toggleRow(t);
});

renderApps();
renderPosts();
