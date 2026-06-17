import { useEffect, useState } from 'react';
import {
  NavLink,
  Link,
  useNavigate,
  useLocation,
  useParams,
  Routes,
  Route,
} from 'react-router-dom';
import './styles.css';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY?.trim() || '';
const PER_PAGE = 30;
const BASE_URL = 'https://api.pexels.com/v1/search';

const categories = [
  { slug: 'mountains', label: 'Mountain' },
  { slug: 'beaches', label: 'Beaches' },
  { slug: 'birds', label: 'Birds' },
  { slug: 'food', label: 'Food' },
];

const FALLBACK_IMAGES = {
  mountain: [
    {
      id: 'mountain-1',
      src: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Mountain peak at sunrise',
      photographer: 'Ksenia Chernaya',
    },
    {
      id: 'mountain-2',
      src: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Misty mountain range',
      photographer: 'Ron Durant',
    },
    {
      id: 'mountain-3',
      src: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Snowy mountain valley',
      photographer: 'Tim Gouw',
    },
    {
      id: 'mountain-4',
      src: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Sunset over rugged mountains',
      photographer: 'RODNAE Productions',
    },
    {
      id: 'mountain-5',
      src: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Ice capped mountain peak',
      photographer: 'Vladimir Fedotov',
    },
  ],
  beaches: [
    {
      id: 'beach-1',
      src: 'https://images.pexels.com/photos/1252896/pexels-photo-1252896.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Golden beach and calm water',
      photographer: 'Oleksandr Pidsvytnyi',
    },
    {
      id: 'beach-2',
      src: 'https://images.pexels.com/photos/1543027/pexels-photo-1543027.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Palm trees on sand',
      photographer: 'Peter Wendt',
    },
    {
      id: 'beach-3',
      src: 'https://images.pexels.com/photos/1450358/pexels-photo-1450358.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Colorful beach sunset',
      photographer: 'Pixabay',
    },
    {
      id: 'beach-4',
      src: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Turquoise seaside shore',
      photographer: 'Pixabay',
    },
    {
      id: 'beach-5',
      src: 'https://images.pexels.com/photos/298789/pexels-photo-298789.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Waves rolling onto a beach',
      photographer: 'Kev Costello',
    },
  ],
  birds: [
    {
      id: 'bird-1',
      src: 'https://images.pexels.com/photos/417020/pexels-photo-417020.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Bird in flight',
      photographer: 'Pixabay',
    },
    {
      id: 'bird-2',
      src: 'https://images.pexels.com/photos/325872/pexels-photo-325872.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Colorful tropical bird',
      photographer: 'Jamie Street',
    },
    {
      id: 'bird-3',
      src: 'https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Bird perched on branch',
      photographer: 'Sandra Aguilar',
    },
    {
      id: 'bird-4',
      src: 'https://images.pexels.com/photos/604361/pexels-photo-604361.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Close-up of a hawk',
      photographer: 'Pixabay',
    },
    {
      id: 'bird-5',
      src: 'https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Bird landing on wet grass',
      photographer: 'David Mark',
    },
  ],
  food: [
    {
      id: 'food-1',
      src: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Fresh salad bowl',
      photographer: 'Pixabay',
    },
    {
      id: 'food-2',
      src: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Colorful breakfast bowl',
      photographer: 'Anete Lusina',
    },
    {
      id: 'food-3',
      src: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cheese and vegetables on board',
      photographer: 'Pixabay',
    },
    {
      id: 'food-4',
      src: 'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Italian pizza with basil',
      photographer: 'Pixabay',
    },
    {
      id: 'food-5',
      src: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Healthy lunch idea',
      photographer: 'Pixabay',
    },
  ],
  default: [
    {
      id: 'default-1',
      src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Creative workspace',
      photographer: 'Buro Millennial',
    },
    {
      id: 'default-2',
      src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Walking forest path',
      photographer: 'Vinikay',
    },
  ],
};

function buildFallbackImages(query) {
  const normalized = query.toLowerCase().trim();
  const pool = FALLBACK_IMAGES[normalized] || FALLBACK_IMAGES.default;

  return Array.from({ length: PER_PAGE }, (_, index) => {
    const sample = pool[index % pool.length];
    return {
      id: `${normalized}-${index + 1}`,
      src: sample.src,
      alt: sample.alt,
      photographer: sample.photographer,
    };
  });
}

async function fetchImages(query, page = 1) {
  if (!query) {
    return buildFallbackImages('default');
  }

  if (!API_KEY) {
    return buildFallbackImages(query);
  }

  const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API request failed with status ${response.status}`);
    }

    const json = await response.json();
    return json.photos.map((photo) => ({
      id: photo.id,
      src: photo.src.large,
      alt: photo.alt || query,
      photographer: photo.photographer,
    }));
  } catch (error) {
    console.warn('Pexels request failed, using fallback images:', error.message);
    return buildFallbackImages(query);
  }
}

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchTerm('');
  };

  return (
    <header className="header-shell">
      <div className="branding">
        <div>
          <h1>SnapShot</h1>
          <p>Explore beautiful photos from the Pexels API, switch categories instantly, and search for any visual inspiration.</p>
        </div>
        <div className="top-nav">
          <NavLink className="nav-button" to="/">Home</NavLink>
          <NavLink className="nav-button" to="/search">Search</NavLink>
        </div>
      </div>

      <div className="search-card">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search images like sunset, city, or animals"
            aria-label="Search images"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="tag-list">
        {categories.map((category) => (
          <NavLink
            key={category.slug}
            to={`/${category.slug}`}
            className={({ isActive }) => `category-button${isActive ? ' active' : ''}`}
          >
            {category.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <section className="page-shell">
      <div className="hero-card">
        <h2>Welcome to SnapShot</h2>
        <p>Click a category or search your own topic to load 30 curated images with real-time pagination.</p>
      </div>

      <div className="gallery-shell">
        <div className="gallery-header">
          <div>
            <h2>Popular categories</h2>
            <p className="meta">Choose a collection and see the gallery refresh instantly.</p>
          </div>
        </div>

        <div className="tag-list">
          {categories.map((category) => (
            <Link key={category.slug} className="category-button" to={`/${category.slug}`}>
              {category.label}
            </Link>
          ))}
        </div>
      </div>

      <GallerySection query="Mountain" label="Mountain" />
    </section>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery();
  const searchTerm = query.get('q')?.trim() || '';
  const [activeQuery, setActiveQuery] = useState(searchTerm);

  useEffect(() => {
    setActiveQuery(searchTerm);
  }, [searchTerm]);

  return (
    <section className="page-shell">
      <div className="hero-card">
        <h2>Search Results</h2>
        <p>{searchTerm ? `Showing images for «${searchTerm}»` : 'Use the search form above to load your favorite image type.'}</p>
      </div>

      {searchTerm ? (
        <GallerySection query={activeQuery} label={searchTerm} />
      ) : (
        <div className="empty-message">Try searching for landscapes, pets, fashion or cityscapes.</div>
      )}
    </section>
  );
}

function CategoryPage() {
  const { categoryName } = useParams();
  const category = categories.find((item) => item.slug === categoryName);

  if (!category) {
    return (
      <section className="page-shell">
        <div className="hero-card">
          <h2>Category not found</h2>
          <p>The category you requested does not exist. Use the navigation above to continue.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="gallery-shell">
        <div className="gallery-header">
          <div>
            <h2>{category.label} Gallery</h2>
            <p className="meta">Discover 30 images curated for {category.label.toLowerCase()}.</p>
          </div>
        </div>
      </div>

      <GallerySection query={category.label} label={category.label} />
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="page-shell">
      <div className="hero-card">
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist. Use the category buttons or the search bar to continue exploring.</p>
      </div>
    </section>
  );
}

function PaginationControls({ page, onPageChange, hasMore }) {
  return (
    <div className="pagination-row">
      <button className="pagination-button" type="button" onClick={() => onPageChange(-1)} disabled={page <= 1}>
        Previous
      </button>
      <button className="pagination-button" type="button" onClick={() => onPageChange(1)} disabled={!hasMore}>
        Next
      </button>
    </div>
  );
}

function ImageCard({ photo }) {
  return (
    <article className="image-card">
      <img src={photo.src} alt={photo.alt} />
      <div className="image-meta">
        <span>{photo.alt}</span>
        <span>Photo by {photo.photographer}</span>
      </div>
    </article>
  );
}

function GallerySection({ query, label }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError('');

    fetchImages(query, page)
      .then((result) => {
        if (isCancelled) return;
        setImages(result);
        setLoading(false);
        if (!result.length) {
          setError('No images were found for this topic. Try another keyword.');
        }
      })
      .catch((fetchError) => {
        if (isCancelled) return;
        setError(fetchError.message || 'Unable to load photos.');
        setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [query, page]);

  const handlePageChange = (delta) => {
    setPage((currentPage) => Math.max(1, currentPage + delta));
  };

  return (
    <section className="gallery-shell">
      <div className="gallery-header">
        <div>
          <h2>{label} Pictures</h2>
          <p className="meta">Loaded {images.length} of {PER_PAGE} images · Page {page}</p>
        </div>
        <PaginationControls page={page} onPageChange={handlePageChange} hasMore={images.length === PER_PAGE} />
      </div>

      {loading && <div className="loading-message">Loading images for {label}…</div>}
      {error && !loading && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="grid">
          {images.map((photo) => (
            <ImageCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </section>
  );
}

function App() {
  return (
    <div className="snapshot-app">
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:categoryName" element={<CategoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
