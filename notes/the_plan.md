Here is the updated, current plan for the multi-page academic site. It reflects the manifesto landing, HTML-first content, and progressive JS only for enhancements.

---

## 1. Overall Goals

**Primary goals**

* Present you as a **serious PhD-ready researcher** in applied cryptography and theoretical computer science.
* Give committees and collaborators a **fast, accurate overview** of research, publications, projects, and experience.
* Keep the site **clear, private, and professional** without oversharing or unnecessary downloads.

**Secondary goals**

* Show that you build real systems (prototypes, benchmarks, tooling).
* Keep the experience lightweight with minimal JS.

---

## 2. Information Architecture (Navigation)

Multi-page layout with a manifesto landing page and dedicated sections:

1. Home (Manifesto)
2. Research
3. Publications
4. Projects
5. Experience and Education
6. Awards and Skills
7. Contact

Each page is a standalone HTML document for SEO and clarity.

---

## 3. Visual Style

* Academic, minimal layout with serif headings and clean typography.
* Light/dark themes via CSS variables.
* Subtle motion only for reveal and manifesto interactions.
* Neutral palette with a soft accent.

---

## 4. Page-by-Page Plan

### 4.1 Home (Manifesto)

* Short statement of values and research intent.
* Interactive keywords (privacy, integrity, autonomy).
* Two calls-to-action: enter portfolio and publications.
* Theme toggle available here as well.

### 4.2 Research

* Profile snapshot and professional summary.
* Two focus cards: Applied Cryptography, Theoretical CS.
* Clear, precise motivation paragraph.

### 4.3 Publications

* Year-grouped list with badges (Accepted, Submitted, Patent, Ongoing).
* Concise notes for each item.
* Optional links to GitHub or PDFs when public.

### 4.4 Projects

* Two tabbed groups: Cryptography and Security; Quantum and Navigation.
* Each card includes status, brief bullets, and tech stack.

### 4.5 Experience and Education

* Tabbed layout for Experience and Education.
* Timeline-style entries for roles.
* Compact education list.

### 4.6 Awards and Skills

* Tabbed layout for Awards/Training and Skills.
* Skills grouped by domain (programming, security, research, languages).

### 4.7 Contact

* Email, phone, GitHub, LinkedIn.
* One line on availability for PhD opportunities.

---

## 5. JS and Accessibility

* HTML is the single source of truth for content.
* JS only for theme toggle, nav toggle, tab switching, reveal animation, and manifesto hover/tap effects.
* Content remains readable if JS is disabled.

---

## 6. Content Maintenance

* Update HTML directly when you add publications, projects, or roles.
* Keep titles, meta descriptions, and page copy consistent with the applied cryptography focus.
* Review the publications page every time a paper status changes.
