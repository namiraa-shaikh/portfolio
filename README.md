# Namiraa Portfolio

Static portfolio website with modular front-end architecture.

## Project Structure

```
portfolio/
	html/
		index.html
	Css/
		styles.css
	js/
		main.js                  # application bootstrap
		config/
			constants.js           # shared constants and selectors
		features/
			theme.js               # theme initialization and toggle behavior
			effects.js             # animations, cursor, marquee, nav, particles
	image/
	script.js                  # legacy monolithic script (kept for reference)
	vercel.json                # deployment config for Vercel
```

## Architecture Notes

- `js/main.js` is the runtime entrypoint and orchestrates feature setup.
- Feature modules are grouped by concern (`theme`, `effects`) instead of one large file.
- Shared static data and selectors live in `js/config/constants.js`.
- DOM references are collected once in `buildAppContext()` and passed into modules.

## Run Locally

Because the app uses ES modules, run it through a local server.

Option 1: VS Code Live Server extension

Option 2: Python

```bash
python -m http.server 5500
```

Then open `http://localhost:5500/html/`.

## Deploy On Vercel

This project is configured for static hosting. `vercel.json` rewrites `/` to `html/index.html`.

### Option 1: Vercel Dashboard

1. Push this repository to GitHub.
2. In Vercel, click **Add New...** > **Project**.
3. Import the repository.
4. Keep framework preset as **Other**.
5. Deploy.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

When prompted during `vercel` setup:

- Set up and deploy: `Y`
- Link to existing project: `N` (or choose existing if you already created one)
- In which directory is your code located: `./`
- Want to modify settings: `N`