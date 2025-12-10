Project: Frontend Development — Course exercises and projects

Overview

This repository contains the exercises, labs, and projects completed during the Web Frontend Development course. It is organized by week and includes a complete final project in the `final` folder, as well as progressive examples that demonstrate the development of skills in HTML, CSS, and JavaScript.

Repository contents

- **`final/`**: Final project — a full site with multiple pages (home, disciplines, sign-up, forms, maps, etc.), static assets, and modular scripts.
- **`Week1/` – `Week6/`**: Weekly exercise folders, each containing practical examples, scripts, and styles that accompany the lessons.

Highlighted projects

- **Final Project (`final/`)**: A complete website that integrates local data (`data/`), ES module scripts (`.mjs`), UI components, and responsive styles. It includes:

  - Pages: `index.html`, `disciplines.html`, `join.html`, `subscriptions.html`, `form-response.html`, `attributions.html`.
  - Assets: `images/`, `data/` (JSON/JS), `scripts/` (modules), `styles/` (CSS organized per page and breakpoints).
  - Learning outcomes: project structure, consuming local data, modularization with ES modules, responsive design, and basic accessibility considerations.

- **Weekly Exercises (Week1–Week6)**: Each week focuses on specific topics:
  - **Week1**: CSS normalization and layout fundamentals.
  - **Week2**: Data parsing/consumption, DOM manipulation, and directory examples.
  - **Week3**: ES modules usage and code organization with `.mjs` files.
  - **Week4**: Animations and interactive behavior with JavaScript.
  - **Week5**: A “chamber” style project with directory, discovery pages, and forms; JSON data integration.
  - **Week6**: Project planning and final styling.

Technologies and best practices

- **Languages**: HTML5, CSS3, JavaScript (ES6+ / `.mjs` modules).
- **Styling**: Per-page stylesheets and responsive breakpoints (`small`, `medium`, `large`).
- **Structure**: Separation of concerns with folders for `scripts/`, `styles/`, `images/`, and `data/` to simplify maintenance.
- **Best practices**: Code modularization, use of JSON for data, separate styles per component/page, and attention to basic accessibility.

Folder structure (summary)

- `final/`
  - `index.html`, `disciplines.html`, `join.html`, etc.
  - `data/` (JSON, JS)
  - `images/`
  - `scripts/` (.mjs and .js)
  - `styles/` (CSS per page and breakpoints)
- `Week1/` … `Week6/` (weekly exercises)

How to view the project locally

- Open an HTML file directly: from Finder or with the `open` command, for example:

  `open final/index.html`

- Start a simple local server (recommended for JS modules):

  - With Python 3 (from the repository root):

    `python3 -m http.server 8000`

    Then open `http://localhost:8000/final/index.html` in your browser.

Contributing and next steps

- This repository reflects personal progress during the course. Potential future improvements:
  - Add badges indicating technologies or project status.
  - Add dependency/version management if build tools or bundlers are introduced.
  - Provide an English/Spanish toggle or separate translations for wider sharing.

Credits and contact

- **Author**: David Anampa (work developed as part of the Web Frontend Development course).
- **Acknowledgements**: Course materials and guides, MDN, W3C, and example repositories reviewed during exercises.

License

This repository is intended for personal and educational reference. If you want an explicit license, I can add a `LICENSE` file (for example, MIT).

Would you like me to add an automatic English/Spanish README switch, include badges, or create a `CHANGELOG.md` summarizing weekly milestones?
