# WebTools Pro

> A focused collection of browser-based utilities for passwords, websites, text, and Markdown.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

### 🌐 [Live Demo](https://saravanansaranraj27.github.io/web-tools-pro)

WebTools Pro is a responsive single-page React application that runs utility workflows directly in the browser. It provides password-strength feedback, website reachability checks, text statistics, and a live Markdown preview without a backend or external service.

## Contents

- [Features](#features)
- [Tools](#tools)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Views](#views)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Features

| Area       | Capabilities                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Passwords  | Score a password against five common strength criteria and show improvement feedback                                                                          |
| Websites   | Check whether a website is reachable and measure the browser request time                                                                                     |
| Text       | Count words, characters, characters without spaces, paragraphs, sentences, and estimated reading time                                                         |
| Markdown   | Preview supported Markdown as styled HTML while typing                                                                                                        |
| Experience | Responsive layout, client-side processing, skeleton loading states on page transitions, and light/dark theme switching that defaults to the system preference |

## Tools

### Password Strength Analyzer

Checks for:

- At least 8 characters
- An uppercase letter
- A lowercase letter
- A number
- A special character

The result is scored from `0/5` to `5/5` and labeled `Weak`, `Strong`, or `Excellent`.

### Website Status Checker

Enter a domain or URL to perform a browser-side `fetch` request. The tool adds `https://` when the input does not start with `http`, then reports whether the target was reachable and the measured response time.

### Word & Character Counter

Enter or paste text to calculate words, total characters, characters excluding whitespace, paragraphs, sentences, and an estimated reading time based on approximately 200 words per minute.

### Markdown Reader

Write Markdown in the editor to see a live preview. The parser supports headings, emphasis, links, images, inline code, fenced code blocks, unordered and ordered lists, blockquotes, tables, and horizontal rules.

## Quick start

### Requirements

- Node.js 18 or newer

- npm

### Run locally

```sh
npm install
npm install react-router-dom
npm run dev
```

Open the local URL printed by Vite in your browser. Vite usually serves the app at http://localhost:5173.

### Deploy to GitHub Pages

Install `gh-pages` as a dev dependency (only needed once):

```sh
npm install --save-dev gh-pages
```

Then build and deploy:

```sh
npm run build
npm run deploy
```

## Using the app

1. Open the app to view the WebTools Pro home screen.
2. Choose a tool from the navigation bar or one of the home screen actions.
3. Enter content into the selected tool and run its analysis, except for Markdown, which previews automatically as you type.
4. Use the theme button in the navigation bar to switch between dark and light mode. The theme defaults to your operating system's preference on first load.
5. Select **Home** or the WebTools Pro logo to return to the home screen.
6. On longer pages, use the floating back-to-top button that appears after scrolling to return to the top instantly.

All processing happens in the current browser tab. The app does not require an account or server connection for password, text, and Markdown workflows.

## Views

The app uses [React Router](https://reactrouter.com/) for client-side URL routing. Its available views are:

| View     | Route          | Purpose                                     |
| -------- | -------------- | ------------------------------------------- |
| Home     | `/`            | Introductory screen with links to all tools |
| Password | `/password`    | Password strength analysis                  |
| Status   | `/status`      | Website reachability and timing check       |
| Counter  | `/wordcounter` | Word and character statistics               |
| Markdown | `/mdreader`    | Live Markdown preview                       |

Any unrecognized path redirects back to Home, and each navigation shows a brief skeleton loading state before the destination view renders.

## Project structure

```text
public/
    favicon.svg              App favicon
    icons.svg                Shared icon sprite

src/
    App.jsx                 Route definitions, theme integration, and skeleton/loading orchestration
    main.jsx                React application entry point
    Icons.jsx               Reusable interface icons

    assets/
        hero.png             Home screen hero image
        react.svg            React logo asset
        vite.svg             Vite logo asset

    components/
        common/
            Skeletons.jsx    Shared loading-skeleton placeholders

        layout/
            Footer.jsx       Application footer
            Navbar.jsx       Navigation and theme control

        sections/
            Intro.jsx        Home screen

        tools/
            MdReader.jsx     Markdown parser and preview
            PasswordTool.jsx Password strength analyzer
            StatusTool.jsx   Website status checker
            WordCounter.jsx  Text statistics tool

    hooks/
        useNavigation.js     Route-aware navigation and page-loading state
        useScrollToTop.js    Back-to-top visibility and smooth-scroll handling
        useSystemTheme.js    Light/dark theme state hook (system-aware)

    styles/
        globals.css          Global layout and component styles
        themes.css           Light/dark theme variables
        variables.css        Shared CSS custom properties

    utils/
        markdown.js          Markdown-to-HTML parsing logic used by MdReader
```

## Technology

- [React 19](https://react.dev/)
- [React Router](https://reactrouter.com/) (`react-router-dom`)
- [Vite 8](https://vite.dev/)
- CSS
- Browser Fetch API
- Browser-local React state

## Development commands

```sh
npm install --save-dev gh-pages   # One-time setup for GitHub Pages deployment
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
npm run deploy    # Publish dist/ with gh-pages
```

## Limitations

- The website checker uses `fetch` with `no-cors`, so it cannot verify the full HTTP status code or response body.
- Firewalls, unavailable domains, browser restrictions, and network conditions can affect status-check results.
- The Markdown parser is a lightweight custom parser, not a complete CommonMark implementation.
- Markdown is inserted into the preview as generated HTML; only render trusted Markdown input.
- Tool content and theme selection are held in React state and reset when the page is reloaded.
- There is no backend, remote synchronization, authentication, or database.

## Contributing

Bug reports, improvements, and pull requests are welcome. Keep changes focused and verify them with the available lint and build commands.

## License

This project is licensed under the MIT License.
