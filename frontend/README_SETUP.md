# RocketDrop Frontend

A modern React + Vite e-commerce frontend for the RocketDrop exclusive sneaker drops platform.

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.3.1** - Build tool
- **Redux Toolkit 1.9.7** - State management
- **React Router v6** - Client-side routing
- **Tailwind CSS 3.3.6** - Styling
- **Axios 1.6.0** - HTTP client
- **React Hook Form 7.50.0** - Form handling
- **Lucide React** - Icons
- **js-cookie 3.0.5** - Cookie management

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components (routes)
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── ProductListingPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── DropsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── components/         # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CountdownTimer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Pagination.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorBoundary.jsx
│   ├── store/              # Redux store
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── productSlice.js
│   │       ├── cartSlice.js
│   │       ├── orderSlice.js
│   │       └── wishlistSlice.js
│   ├── hooks/              # Custom React hooks
│   │   ├── useCountdown.js
│   │   └── index.js        # useLocalStorage, usePagination, useDebounce, useFetch
│   ├── utils/              # Utility functions
│   │   ├── api.js          # Axios API client
│   │   └── toast.js        # Toast notifications
│   ├── App.jsx             # Main app with routes
│   ├── main.jsx            # Entry point with Redux Provider
│   └── index.css           # Global styles
├── public/                 # Static files
├── .env                    # Environment variables (local)
├── .env.example            # Example env variables
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── vite.config.js          # Vite config
└── package.json            # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- RocketDrop backend running on `http://localhost:8080`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Update .env with your backend API URL (default is already set)
   # VITE_API_URL=http://localhost:8080/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend communicates with the backend via the Axios client configured in `src/utils/api.js`.

### Key API Endpoints

**Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

**Products:**
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/:id` - Get single product
- `GET /api/products/search` - Search products

**Drops:**
- `GET /api/drops` - Get all drops
- `GET /api/drops/live` - Get live drops
- `GET /api/drops/upcoming` - Get upcoming drops

**Orders:**
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

**Cart:**
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart

**Wishlist:**
- `GET /api/wishlist` - Get wishlist items
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

## Features

- **Product Browsing** - Browse exclusive sneaker drops
- **Real-time Countdowns** - Live countdown timers for drops
- **Search & Filter** - Search products and filter by category
- **User Authentication** - Login/Register with JWT tokens
- **Shopping Cart** - Add/remove items with quantity control
- **Wishlist** - Save favorite products
- **Order Management** - View order history and track orders
- **Responsive Design** - Mobile-friendly interface
- **Protected Routes** - Authenticated routes with automatic redirect

## Redux State Management

### Auth State
```javascript
{
  user: { id, email, name, phone, role },
  accessToken: "...",
  refreshToken: "...",
  isAuthenticated: boolean,
  error: null
}
```

### Products State
```javascript
{
  products: [],
  liveDrops: [],
  upcomingDrops: [],
  selectedProduct: null,
  loading: false,
  error: null
}
```

### Cart State
```javascript
{
  items: [
    { id, productId, name, price, quantity, image, stock }
  ],
  total: 0
}
```

### Orders State
```javascript
{
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
}
```

### Wishlist State
```javascript
{
  items: []
}
```

## Styling

The project uses **Tailwind CSS** with custom theme:

### Colors
- Primary: `#FF6B35` (Orange)
- Secondary: `#004E89` (Blue)
- Accent: `#FDB833` (Yellow)
- Dark: `#1a1a1a`
- Light: `#f5f5f5`

### Custom Utilities
- `.btn` - Base button styles
- `.btn-primary` - Primary CTA button
- `.btn-outline` - Outlined button
- `.card` - Card container
- `.countdown-timer` - Timer display
- `.countdown-live` - Live indicator

## Components Guide

### Page Components

**HomePage** - Landing page with hero, live drops showcase, and features

**ProductListingPage** - Product grid with search and category filters

**ProductPage** - Single product detail with countdown, images, and reviews

**LoginPage** / **RegisterPage** - Authentication forms

**CartPage** - Shopping cart with order summary

**CheckoutPage** - Multi-step checkout (shipping, payment, confirmation)

**OrderHistoryPage** - User's order history with tracking

**WishlistPage** - Saved products grid

**DropsPage** - All drops with status filters

**ProfilePage** - User account management and settings

### Reusable Components

**Layout** - Wrapper with Navbar, Footer, and main content area

**Navbar** - Navigation bar with cart/wishlist counters

**Footer** - Site footer with links and social icons

**ProductCard** - Product display card with countdown and actions

**CountdownTimer** - Real-time countdown display

**Pagination** - Page navigation component

**LoadingSpinner** - Loading indicator

**ProtectedRoute** - Route wrapper for authenticated pages

## Custom Hooks

**useCountdown** - Real-time countdown timer for drops

**useLocalStorage** - localStorage persistence hook

**usePagination** - Pagination logic hook

**useDebounce** - Debounce hook for search

**useFetch** - Data fetching hook (basic)

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT tokens
3. Tokens stored in cookies (httpOnly for security)
4. Axios interceptor adds Bearer token to requests
5. On 401, interceptor refreshes token
6. Redux updates global auth state
7. ProtectedRoute checks isAuthenticated

## Error Handling

The application includes:
- Global error boundary
- Toast notifications
- API error interceptor
- Form validation errors
- 404 page for missing routes

## Development Tips

- Use Redux DevTools for state inspection
- Tailwind IntelliSense for IDE autocomplete
- React DevTools for component debugging
- Network tab in DevTools for API debugging

## Troubleshooting

### Vite Dev Server Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API Connection Issues
- Ensure backend is running on `http://localhost:8080`
- Check `.env` file for correct `VITE_API_URL`
- Clear browser cache/cookies
- Check browser console for CORS errors

### Build Errors
- Clear `.vitecache` directory
- Verify all dependencies are installed
- Check for TypeScript errors if using TS

## Production Deployment

### Environment Variables
Set `VITE_API_URL` to production backend URL before building

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading images
- Redux DevTools in development
- Vite tree-shaking for smaller bundle
- CSS minification with Tailwind
- Gzip compression

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit PR

## License

MIT License - See LICENSE file for details
