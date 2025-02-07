import {createLazyFileRoute, LazyRoute} from '@tanstack/react-router';

// eslint-disable-next-line
export const Route: LazyRoute<any> = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
