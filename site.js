const demos = {
  hustle: {
    label: "HUSTLE COMPLETE",
    title: "You made $184 dirty.",
    body: "The job went clean. Your Heat increased by 1.",
    stats: [["Dirty", "$2,460"], ["Clean", "$1,125"], ["Heat", "18"]],
  },
  launder: {
    label: "MONEY CLEANED",
    title: "$425 clean is ready.",
    body: "You moved $500 dirty through the operation at a 15% fee.",
    stats: [["Dirty", "$1,960"], ["Clean", "$1,550"], ["Fee", "15%"]],
  },
  collect: {
    label: "COLLECTION COMPLETE",
    title: "Your rackets brought in $1,080.",
    body: "Three operations paid out. Nothing was seized this time.",
    stats: [["Collected", "$1,080"], ["Rackets", "3"], ["Heat", "20"]],
  },
  profile: {
    label: "YOUR OPERATION",
    title: "Ranked #4 in this server.",
    body: "A 9-day streak, three rackets, and two currencies to manage.",
    stats: [["Net worth", "$15,630"], ["Streak", "9 days"], ["Rackets", "3 / 5"]],
  },
};

const tabs = [...document.querySelectorAll(".demo-tab")];
const label = document.querySelector("#demo-label");
const title = document.querySelector("#demo-title");
const body = document.querySelector("#demo-body");
const stats = document.querySelector("#demo-stats");

function showDemo(tab) {
  const demo = demos[tab.dataset.demo];
  if (!demo || !label || !title || !body || !stats) return;

  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  label.textContent = demo.label;
  title.textContent = demo.title;
  body.textContent = demo.body;
  stats.replaceChildren(...demo.stats.map(([term, value]) => {
    const item = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = value;
    item.append(dt, dd);
    return item;
  }));

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelector(".response-card")?.animate(
      [{ opacity: 0.55, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 180, easing: "ease-out" },
    );
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showDemo(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    tabs[next].focus();
    showDemo(tabs[next]);
  });
});
