import {createRoute} from '@tanstack/react-router';
import {rootRoute} from './__root.tsx';
import Deploy from '../design-system/pages/deploy.tsx';

export const deployRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deploy',
  component: () => <Deploy />,
});
