# HeroDashboard Component

This component renders the hero section for the CauseBag landing page, including a sticky header with logo and navigation buttons.

## Required Image Assets

The component requires the following image to be added to the `public/images/` directory:

1. `logo.png` - CauseBag logo image (150x50px recommended)

## Features

- Fully responsive design optimized for all screen sizes:
  - 1750px (xxl)
  - 1600px (xl)
  - 1450px (lg-xl)
  - 1366px (lg)
  - 1280px (md-lg)
  - 1080px (md)
  - 860px (sm-md)
  - 600px (sm)
  - 420px (xs)
  - 380px (xxs)

- Adaptive header:
  - Desktop: Logo and navigation buttons
  - Mobile (< 600px): Logo and hamburger menu
  
- Hero section with:
  - Dynamic floating cause category chips with gradient colors
  - Responsive typography and spacing
  - Optimized layouts for each breakpoint
  
- Call-to-action buttons that adapt to screen size
- Modern, accessibility-friendly design with proper contrast
- Smooth animations and transitions

## Usage

```jsx
import HeroDashboard from 'src/components/HeroDashboard';

function HomePage() {
  return (
    <main>
      <HeroDashboard />
      {/* Other landing page sections */}
    </main>
  );
}

export default HomePage;
```

## Dependencies

This component uses:

- Material UI components (Chip, IconButton, Menu, MenuItem)
- Material UI icons (MenuIcon)
- Next.js Image component
- Custom Button component
- React hooks for responsive behavior
