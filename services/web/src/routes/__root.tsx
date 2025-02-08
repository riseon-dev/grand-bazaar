import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import {Box, Container, Grid} from '@radix-ui/themes';

// Define the root route with a shared layout

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Grid columns="3" rows="3">
        {/* Header */}
        <Container>
          <Box width="148px" height="120px" />
        </Container>
        <Container size={'4'}>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </Container>
        <Container>
          <Box width="148px" height="120px" />
        </Container>

        {/* Body */}
        <Container>
          <Box width="148px" height="120px" />
        </Container>
        <Container size={'4'}>
          <Box>
            <Outlet />
          </Box>
        </Container>
        <Container>
          <Box width="148px" height="120px" />
        </Container>

        {/* Footer */}
        <Container>
          <Box width="148px" height="120px" />
        </Container>
        <Container size={'4'}>
          <Box>Footer</Box>
        </Container>
        <Container>
          <Box width="148px" height="120px" />
        </Container>
      </Grid>
      <TanStackRouterDevtools />
    </>
  ),
});
