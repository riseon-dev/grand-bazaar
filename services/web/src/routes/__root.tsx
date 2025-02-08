import {createRootRoute, Outlet} from '@tanstack/react-router';
import {Box, Container, Grid, Separator} from '@radix-ui/themes';
import Header from '../design-system/templates/header.tsx';
import Footer from '../design-system/templates/footer.tsx';
// import {TanStackRouterDevtools} from '@tanstack/router-devtools';

// Define the root route with a shared layout

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Grid columns="3" rows="3">
        {/* Header */}
        <Container>
          <Box width="148px" height="120px" />
        </Container>
        <Container
          size={'4'}
          style={{justifyContent: 'center', alignItems: 'center'}}
        >
          <Header />
        </Container>
        <Container>
          <Box width="148px" height="120px" />
        </Container>

        {/* Body */}
        <Container>
          <Box width="148px" height="120px" />
        </Container>
        <Container
          size={'4'}
          style={{justifyContent: 'center', alignItems: 'center'}}
        >
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
        <Container
          size={'4'}
          style={{justifyContent: 'center', alignItems: 'center'}}
        >
          <Separator my="8" size="4" />

          <Footer />
        </Container>
        <Container>
          <Box width="148px" height="120px" />
        </Container>
      </Grid>
      {/*<TanStackRouterDevtools />*/}
    </>
  ),
});
