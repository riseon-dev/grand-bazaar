import {createRoute} from '@tanstack/react-router';
import {rootRoute} from './__root.tsx';

export const deployRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deploy',
  component: () => <div>Deploy</div>,
});
