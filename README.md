# Namiraa Portfolio

Static portfolio website with modular front-end architecture.

## Project Structure

```
portfolio/
	index.html
	styles.css
	script.js                  # legacy monolithic script (kept for reference)
	js/
		main.js                  # application bootstrap
		config/
			constants.js           # shared constants and selectors
		features/
			theme.js               # theme initialization and toggle behavior
			effects.js             # animations, cursor, marquee, nav, particles
```

## Architecture Notes

- `js/main.js` is the only runtime entrypoint and orchestrates feature setup.
- Feature modules are grouped by concern (`theme`, `effects`) instead of one large file.
- Shared static data and selectors live in `js/config/constants.js`.
- DOM references are collected once in `buildAppContext()` and passed into modules.

## Run Locally

Because the app now uses ES modules, run it through a local server.

Option 1: VS Code Live Server extension

Option 2: Python

```bash
python -m http.server 5500
```

Then open:

`http://localhost:5500`