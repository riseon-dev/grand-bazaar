import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>WOW</h1>
    </div>
  );
}
