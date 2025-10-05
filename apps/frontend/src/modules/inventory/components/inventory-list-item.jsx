import { Link } from 'react-router';
import { ProductCard, ProductCardSkeleton } from './product-card';

export function InventoryListItemSkeleton() {
  return <ProductCardSkeleton />;
}

export function InventoryListItem({ name, id, category, quantity, imageUrl }) {
  return (
    <ProductCard name={name} categoryName={category} quantity={quantity} imageUrl={imageUrl} />
  );
}
