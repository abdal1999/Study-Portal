console.log("CBSE FILTER: LOOP-PROOF MODE");

const keywords = [
  "cbse", "ncert",
  "class 1", "class 2", "class 3", "class 4", "class 5",
  "class 6", "class 7", "class 8", "class 9",
  "class 10", "class 11", "class 12",
  "math", "maths", "science", "physics",
  "chemistry", "biology", "history", "geography",
  "civics", "economics", "english", "hindi",
  "board exam", "revision", "one shot",
  "physics wallah", "pw", "vedantu", "unacademy"
];

function isEducational(title) {
  return keywords.some(k => title.includes(k));
}

function applyFilter() {
  let eduCount = 0;

  const videos = document.querySelectorAll(
    "ytd-video-renderer, ytd-rich-item-renderer"
  );

  videos.forEach(video => {
    const titleEl = video.querySelector("a#video-title");
    if (!titleEl) return;

    const title = titleEl.textContent.toLowerCase();

    if (isEducational(title)) {
      video.style.filter = "";
      video.style.pointerEvents = "";
      video.style.opacity = "";
      eduCount++;
    } else {
      video.style.filter = "blur(6px)";
      video.style.pointerEvents = "none";
      video.style.opacity = "0.4";
    }
  });

  handleNoResultsMessage(eduCount);
}

function handleNoResultsMessage(count) {
  if (!location.pathname.startsWith("/results")) return;

  let msg = document.getElementById("cbse-no-results");

  if (count === 0) {
    if (msg) return;

    msg = document.createElement("div");
    msg.id = "cbse-no-results";
    msg.textContent =
      "No Educational videos found. Try a different search.";

    msg.style.cssText = `
      font-size: 18px;
      text-align: center;
      margin: 24px;
      padding: 16px;
      background: #f1f3f4;
      border-radius: 8px;
      font-family: Roboto, Arial, sans-serif;
    `;

    const container = document.querySelector("#primary");
    if (container) container.prepend(msg);
  } else {
    if (msg) msg.remove();
  }
}

/* Debounced observer (safe) */
let timeout;
const observer = new MutationObserver(() => {
  clearTimeout(timeout);
  timeout = setTimeout(applyFilter, 400);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

window.addEventListener("yt-navigate-finish", () => {
  setTimeout(applyFilter, 1200);
});

setTimeout(applyFilter, 1200);
