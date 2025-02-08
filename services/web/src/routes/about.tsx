import {createRoute} from '@tanstack/react-router';
import {rootRoute} from './__root.tsx';

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <div>About Us</div>,
});
