import {createRoute} from '@tanstack/react-router';
import {rootRoute} from './__root.tsx';
import Agents from '../design-system/pages/agents.tsx';

// Define child routes
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Agents,
});
