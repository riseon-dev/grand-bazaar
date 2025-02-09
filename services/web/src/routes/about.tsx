import {createRoute} from '@tanstack/react-router';
import {rootRoute} from './__root.tsx';
import About from '../design-system/pages/about.tsx';

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});
