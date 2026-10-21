import { useMemo, useState } from 'react'
import './App.css'

const movies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    year: 2024,
    rating: '8.6',
    genre: 'Sci-Fi',
    runtime: '2h 46m',
    language: 'English',
    poster:
      'https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    description:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
  },
  {
    id: 2,
    title: 'Poor Things',
    year: 2023,
    rating: '7.8',
    genre: 'Drama',
    runtime: '2h 21m',
    language: 'English',
    poster:
      'https://image.tmdb.org/t/p/w780/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    description:
      'The incredible tale and fantastical evolution of Bella Baxter, a young woman brought back to life by an unorthodox scientist.',
    cast: 'Emma Stone, Mark Ruffalo, Willem Dafoe',
  },
  {
    id: 3,
    title: 'The Batman',
    year: 2022,
    rating: '7.8',
    genre: 'Action',
    runtime: '2h 56m',
    language: 'English',
    poster:
      'https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    description:
      'When a sadistic killer leaves a trail of cryptic clues, Batman is drawn into the underworld of Gotham City.',
    cast: 'Robert Pattinson, Zoë Kravitz, Paul Dano',
  },
  {
    id: 4,
    title: 'Past Lives',
    year: 2023,
    rating: '7.9',
    genre: 'Romance',
    runtime: '1h 46m',
    language: 'Korean, English',
    poster:
      'https://image.tmdb.org/t/p/w780/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    description:
      'Two deeply connected childhood friends are wrested apart after one family emigrates from South Korea.',
    cast: 'Greta Lee, Teo Yoo, John Magaro',
  },
  {
    id: 5,
    title: 'Spider-Man: Across the Spider-Verse',
    year: 2023,
    rating: '8.6',
    genre: 'Animation',
    runtime: '2h 20m',
    language: 'English',
    poster:
      'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    description:
      'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People protecting its existence.',
    cast: 'Shameik Moore, Hailee Steinfeld, Oscar Isaac',
  },
  {
    id: 6,
    title: 'Oppenheimer',
    year: 2023,
    rating: '8.1',
    genre: 'Drama',
    runtime: '3h 00m',
    language: 'English',
    poster:
      'https://image.tmdb.org/t/p/w780/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    description:
      'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    cast: 'Cillian Murphy, Emily Blunt, Robert Downey Jr.',
  },
  {
    id: 7,
    title: 'The Grand Budapest Hotel',
    year: 2014,
    rating: '8.1',
    genre: 'Comedy',
    runtime: '1h 40m',
    language: 'English',
    poster:
      'https://image.tmdb.org/t/p/w780/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    description:
      'A legendary concierge and his young protégé become wrapped up in a theft and the battle for a family fortune.',
    cast: 'Ralph Fiennes, Tony Revolori, Saoirse Ronan',
  },
  {
    id: 8,
    title: 'Everything Everywhere All at Once',
    year: 2022,
    rating: '7.8',
    genre: 'Sci-Fi',
    runtime: '2h 19m',
    language: 'English, Mandarin',
    poster:
      'https://image.tmdb.org/t/p/w780/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    description:
      'An exhausted laundromat owner is swept up in an extraordinary adventure across the multiverse.',
    cast: 'Michelle Yeoh, Stephanie Hsu, Ke Huy Quan',
  },
]

const genres = ['All films', 'Drama', 'Sci-Fi', 'Action', 'Romance', 'Comedy', 'Animation']

function MovieCard({ movie, isFavorite, onFavorite, onSelect }) {
  return (
    <article className="movie-card">
      <button
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        type="button"
        aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
        onClick={() => onFavorite(movie.id)}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <button className="poster-button" type="button" onClick={() => onSelect(movie)}>
        <img className="movie-poster" src={movie.poster} alt={`${movie.title} poster`} />
        <span className="poster-overlay">View film <span aria-hidden="true">↗</span></span>
      </button>
      <div className="movie-meta">
        <div>
          <h3>{movie.title}</h3>
          <p>{movie.year} <span className="meta-dot">·</span> {movie.genre}</p>
        </div>
        <span className="rating"><span aria-hidden="true">★</span> {movie.rating}</span>
      </div>
    </article>
  )
}

function MovieDetails({ movie, onClose, isFavorite, onFavorite }) {
  if (!movie) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close details">
          ×
        </button>
        <img className="details-poster" src={movie.poster} alt="" />
        <div className="details-content">
          <span className="eyebrow">{movie.genre} <span>·</span> {movie.year}</span>
          <h2 id="details-title">{movie.title}</h2>
          <div className="details-facts">
            <span className="rating"><span aria-hidden="true">★</span> {movie.rating}</span>
            <span>{movie.runtime}</span>
            <span>{movie.language}</span>
          </div>
          <h3>Synopsis</h3>
          <p>{movie.description}</p>
          <h3>Cast</h3>
          <p>{movie.cast}</p>
          <button
            className={`button ${isFavorite ? 'button-secondary' : 'button-primary'}`}
            type="button"
            onClick={() => onFavorite(movie.id)}
          >
            {isFavorite ? '♥  In your watchlist' : '+  Add to watchlist'}
          </button>
        </div>
      </section>
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All films')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [user, setUser] = useState(() => localStorage.getItem('movie-library-user') || '')
  const [showSignIn, setShowSignIn] = useState(false)
  const [email, setEmail] = useState('')

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return movies.filter((movie) => {
      const matchesGenre = genre === 'All films' || movie.genre === genre
      const matchesQuery =
        !normalizedQuery ||
        `${movie.title} ${movie.genre} ${movie.year}`.toLowerCase().includes(normalizedQuery)
      const matchesFavorites = !showFavorites || favorites.includes(movie.id)
      return matchesGenre && matchesQuery && matchesFavorites
    })
  }, [favorites, genre, query, showFavorites])

  function toggleFavorite(movieId) {
    setFavorites((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    )
  }

  function signIn(event) {
    event.preventDefault()
    const name = email.split('@')[0].trim()
    if (!name) return
    localStorage.setItem('movie-library-user', name)
    setUser(name)
    setShowSignIn(false)
    setEmail('')
  }

  function signOut() {
    localStorage.removeItem('movie-library-user')
    setUser('')
  }

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Reel Good home">
          <span className="brand-mark" aria-hidden="true">r.</span>
          <span>reel<span className="brand-light">good</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a className={!showFavorites ? 'active' : ''} href="#collection" onClick={() => setShowFavorites(false)}>Discover</a>
          <button className={showFavorites ? 'active' : ''} type="button" onClick={() => setShowFavorites(true)}>
            Watchlist <span className="watchlist-count">{favorites.length}</span>
          </button>
        </nav>
        <div className="account-area">
          {user ? (
            <>
              <span className="user-greeting">Hi, {user}</span>
              <button className="sign-in-link" type="button" onClick={signOut}>Sign out</button>
            </>
          ) : (
            <button className="sign-in-button" type="button" onClick={() => setShowSignIn(true)}>
              Sign in <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT FAVORITE FILM</p>
          <h1>Stories worth<br />staying up for<span>.</span></h1>
          <p className="hero-description">
            A little less scrolling, a lot more watching.<br className="desktop-break" />
            Find something wonderful for tonight.
          </p>
          <a className="button button-primary hero-cta" href="#collection">
            Explore the collection <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <img src={movies[0].poster} alt="" />
          <div className="hero-note"><span>TONIGHT'S PICK</span><strong>{movies[0].title}</strong><small>★ &nbsp;{movies[0].rating} / 10</small></div>
          <span className="hero-spark spark-one">✳</span>
          <span className="hero-spark spark-two">✦</span>
        </div>
        <div className="hero-bottom">
          <span>Curated for curious people</span>
          <span className="scroll-cue">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
        </div>
      </section>

      <section className="collection section-wrap" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> THE COLLECTION</p>
            <h2>{showFavorites ? 'Your watchlist' : 'Find your next favorite'}</h2>
          </div>
          <span className="film-count">{filteredMovies.length.toString().padStart(2, '0')} FILMS</span>
        </div>

        <div className="collection-tools">
          <div className="genre-list" aria-label="Filter by genre">
            {genres.map((item) => (
              <button
                className={`genre-chip ${genre === item ? 'selected' : ''}`}
                type="button"
                key={item}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search films..."
              aria-label="Search films"
            />
            <kbd>↵</kbd>
          </label>
        </div>

        {filteredMovies.length ? (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onFavorite={toggleFavorite}
                onSelect={setSelectedMovie}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">✳</span>
            <h3>{showFavorites ? 'Your watchlist is waiting.' : 'No films found.'}</h3>
            <p>{showFavorites ? 'Save a film you love and it’ll show up here.' : 'Try another title or choose a different genre.'}</p>
            {showFavorites && <button className="text-button" type="button" onClick={() => setShowFavorites(false)}>Explore all films →</button>}
          </div>
        )}
      </section>

      <footer className="footer">
        <a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">r.</span><span>reel<span className="brand-light">good</span></span></a>
        <p>Good films. Good feelings. © 2024 Reelgood.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isFavorite={selectedMovie ? favorites.includes(selectedMovie.id) : false}
        onFavorite={toggleFavorite}
      />

      {showSignIn && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowSignIn(false)}>
          <section className="signin-modal" role="dialog" aria-modal="true" aria-labelledby="signin-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setShowSignIn(false)} aria-label="Close sign in">×</button>
            <span className="brand-mark" aria-hidden="true">r.</span>
            <p className="eyebrow">WELCOME TO REELGOOD</p>
            <h2 id="signin-title">Your movie night,<br />your way.</h2>
            <p>Sign in to keep your watchlist close. No password needed for this demo.</p>
            <form onSubmit={signIn}>
              <label htmlFor="signin-email">Email address</label>
              <input id="signin-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
              <button className="button button-primary" type="submit">Continue <span aria-hidden="true">→</span></button>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
