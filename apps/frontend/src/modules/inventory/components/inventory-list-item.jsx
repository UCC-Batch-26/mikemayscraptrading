import { Link } from 'react-router';
import { ProductCardSkeleton } from './product-card';

export function InventoryListItemSkeleton() {
  return <ProductCardSkeleton />;
}

export function InventoryListItem({ name, id }) {
  return (
    <div className="flex gap-2 items-center">
      {name}
      <Link to={`/inventory/${id}`} className="underline text-sm">
        View
      </Link>
    </div>
  );
}
