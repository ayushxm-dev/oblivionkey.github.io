document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const byId = (id) => document.getElementById(id);

const applyStagger = () => {
  document.querySelectorAll(".section").forEach((section) => {
    const items = section.querySelectorAll(
      ".card, .stat, .timeline-item, .news-item, .pub-item"
    );
    items.forEach((item, index) => {
      item.style.setProperty("--delay", `${index * 0.08}s`);
    });
  });
};

const initTheme = () => {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) {
    return;
  }

  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (error) {
    stored = null;
  }
  const initial = stored || (prefersDark ? "dark" : "light");

  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  };

  apply(initial);

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Storage can be blocked; theme still applies for the session.
    }
    apply(next);
  });
};

const initManifesto = () => {
  const terms = document.querySelectorAll(".manifesto-term");
  const detail = document.querySelector(".manifesto-detail");
  if (!terms.length || !detail) {
    return;
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const liveSetting = detail.getAttribute("aria-live") || "polite";
  const defaultText = detail.textContent.trim();
  let activeText = null;
  let timer = null;

  const setText = (text) => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    detail.setAttribute("aria-live", liveSetting);
    detail.textContent = text;
    detail.classList.remove("is-revealing");
  };

  const revealText = (text) => {
    if (!text) {
      setText(defaultText);
      return;
    }
    if (prefersReduced) {
      setText(text);
      return;
    }
    if (timer) {
      clearInterval(timer);
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const maxFrames = 16;
    let frame = 0;
    detail.setAttribute("aria-live", "off");
    detail.classList.add("is-revealing");
    timer = setInterval(() => {
      frame += 1;
      const progress = frame / maxFrames;
      const revealCount = Math.floor(text.length * progress);
      const output = text
        .split("")
        .map((char, index) => {
          if (index < revealCount || char === " " || char === "." || char === ",") {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      detail.textContent = output;
      if (frame >= maxFrames) {
        clearInterval(timer);
        timer = null;
        detail.setAttribute("aria-live", liveSetting);
        detail.textContent = text;
        detail.classList.remove("is-revealing");
      }
    }, 24);
  };

  const reset = () => {
    setText(activeText || defaultText);
  };

  terms.forEach((term) => {
    const text = term.dataset.detail;
    if (!text) {
      return;
    }

    term.addEventListener("mouseenter", () => revealText(text));
    term.addEventListener("focus", () => revealText(text));
    term.addEventListener("mouseleave", reset);
    term.addEventListener("blur", reset);
    term.addEventListener("click", () => {
      activeText = text;
      terms.forEach((item) =>
        item.classList.toggle("is-selected", item === term)
      );
      revealText(text);
    });
  });
};

const initNav = () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = byId("nav-links");
  if (!toggle || !links) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
};

const initReveal = () => {
  const sections = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
};

const initTabs = () => {
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const buttons = Array.from(group.querySelectorAll(".tab-button"));
    const panels = Array.from(group.querySelectorAll(".tab-panel"));
    if (buttons.length === 0 || panels.length === 0) {
      return;
    }

    const getActiveName = () => {
      const active = buttons.find(
        (button) =>
          button.classList.contains("is-active") ||
          button.getAttribute("aria-selected") === "true"
      );
      return active ? active.dataset.tab : buttons[0].dataset.tab;
    };

    const activate = (name, { focus = false } = {}) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.tab === name;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("tabindex", isActive ? "0" : "-1");
        if (focus && isActive) {
          button.focus();
        }
      });
      panels.forEach((panel) => {
        const isActive = panel.dataset.tabPanel === name;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
        panel.setAttribute("aria-hidden", String(!isActive));
      });
    };

    const handleKeydown = (event) => {
      const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
      if (!keys.includes(event.key)) {
        return;
      }
      event.preventDefault();
      const currentIndex = buttons.indexOf(event.currentTarget);
      if (currentIndex === -1) {
        return;
      }
      let nextIndex = currentIndex;
      if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = buttons.length - 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % buttons.length;
      }
      const nextButton = buttons[nextIndex];
      activate(nextButton.dataset.tab, { focus: true });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => activate(button.dataset.tab, { focus: true }));
      button.addEventListener("keydown", handleKeydown);
    });

    activate(getActiveName());
  });
};

const initPhotoReveal = () => {
  const card = document.getElementById("photo-reveal-card");
  const trigger = document.getElementById("photo-reveal-trigger");
  if (!card || !trigger) {
    return;
  }

  card.addEventListener("click", () => {
    const state = card.getAttribute("data-state");
    if (state === "01") {
      card.setAttribute("data-state", "02");
    }
  });

  trigger.addEventListener("click", () => {
    card.setAttribute("data-state", "real");
    trigger.setAttribute("data-revealed", "true");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initManifesto();
  initNav();
  initReveal();
  initTabs();
  applyStagger();
  initPhotoReveal();
});
