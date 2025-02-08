import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';

// Define the root route with a shared layout

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
