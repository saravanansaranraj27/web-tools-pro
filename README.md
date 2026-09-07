# WebTools Pro

> A focused collection of browser-based utilities for passwords, websites, text, and Markdown.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

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

| Area       | Capabilities                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Passwords  | Score a password against five common strength criteria and show improvement feedback                  |
| Websites   | Check whether a website is reachable and measure the browser request time                             |
| Text       | Count words, characters, characters without spaces, paragraphs, sentences, and estimated reading time |
| Markdown   | Preview supported Markdown as styled HTML while typing                                                |
| Experience | Responsive layout, client-side processing, and light/dark theme switching                             |

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
npm run dev
```

Open the local URL printed by Vite in your browser. Vite usually serves the app at [http://localhost:5173](http://localhost:5173).

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
4. Use the theme button in the navigation bar to switch between dark and light mode.
5. Select **Home** or the WebTools Pro logo to return to the home screen.

All processing happens in the current browser tab. The app does not require an account or server connection for password, text, and Markdown workflows.

## Views

The app uses client-side state instead of URL routes. Its available views are:

| View     | Purpose                                     |
| -------- | ------------------------------------------- |
| Home     | Introductory screen with links to all tools |
| Password | Password strength analysis                  |
| Status   | Website reachability and timing check       |
| Counter  | Word and character statistics               |
| Markdown | Live Markdown preview                       |

## Project structure

```text
src/
	App.jsx                 Main view switching and theme integration
	main.jsx                React application entry point
	index.css               Global layout, component, and theme styles
	assets/
		Icons.jsx             Reusable interface icons
	components/
		Footer.jsx            Application footer
		Intro.jsx             Home screen
		MdReader.jsx          Markdown parser and preview
		Navbar.jsx            Navigation and theme control
		PasswordTool.jsx      Password strength analyzer
		StatusTool.jsx        Website status checker
		WordCounter.jsx       Text statistics tool
	hooks/
		useTheme.js           Light/dark theme state hook
```

## Technology

- [React 19](https://react.dev/)
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
