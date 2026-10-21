# Reelgood Movie Library

A responsive React movie-library demo with genre filters, instant title search, movie details, a favorites watchlist, and a lightweight demo sign-in.

## Run locally

```sh
npm install
npm run dev
```

## Features

- Browse a curated list of films and filter by genre.
- Search titles, genres, and release years as you type.
- Open a film to view its synopsis, rating, language, runtime, and cast.
- Add or remove films from the watchlist.
- Sign in with an email address to show a personalized greeting. This is a UI demo, not secure authentication.

Movie information is stored in `src/App.jsx` and poster images are loaded from TMDB image URLs. The demo does not require an API key or persist the watchlist between page reloads.
