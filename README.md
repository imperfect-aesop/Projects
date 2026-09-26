# Birthday Love Letter

A responsive React + Vite birthday microsite with Framer Motion, React Icons, Tailwind CSS, glassy gradients, a live countdown, photo lightbox, animated letter, and birthday wish interaction. It is fully static: there is no backend or database.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Edit the content

Everything intended for personalization lives in `src/data/`:

- `birthday.js`: her name, birthday date, greeting, main message, signature, and optional music URL.
- `photos.js`: photo URLs, alt text, captions, and dates. Replace the Unsplash URLs with your own hosted images when ready.
- `albums.js`: album titles, subtitles, covers, and the photo indexes each album displays.
- `timeline.js`: relationship dates, titles, descriptions, icons, and optional photos.
- `memories.js`: memory card text and images.
- `reasons.js`: the interactive “Reasons I love you” cards.
- `messages.js`: messages shown by the floating heart button.

The only required birthday value is the ISO date in `birthday.js`, for example `2026-10-18T00:00:00`. The app automatically calculates upcoming, birthday-day, and post-birthday states.

### Music

Set `musicUrl` in `src/data/birthday.js` to a direct audio URL or a file you host in `public/`, such as `/music/our-song.mp3`. Music never starts until the visitor presses the music button.

### Colors and type

The palette and responsive styling are centralized in `src/App.css` as CSS variables near the top. Google Fonts are loaded in `src/index.css`; replace the font import there if you want a different pairing.

## Static deployment

- **Vercel:** import the repository, use `npm run build`, and publish the `dist` directory.
- **Netlify:** use build command `npm run build` and publish directory `dist`.
- **GitHub Pages:** build with `npm run build` and deploy `dist` using a Pages action or a static hosting action. If the site is hosted under a repository subpath, set Vite's `base` in `vite.config.js` to `'/repository-name/'` before building.

The page is keyboard-friendly, uses descriptive image alt text, lazy-loads gallery images, supports lightbox navigation, and respects `prefers-reduced-motion`.
