import {createRoute} from '@tanstack/react-router';
import {rootRoute} from './__root.tsx';

// Define child routes
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Home Page</div>,
});
