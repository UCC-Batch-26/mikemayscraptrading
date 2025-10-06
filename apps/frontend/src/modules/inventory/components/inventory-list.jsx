import { useEffect } from 'react';
import { useInventory } from '../hooks/use-inventory';
import { InventoryListItem, InventoryListItemSkeleton } from './inventory-list-item';
import { EmptyState } from './empty-state';

function InventoryListSkeleton() {
  return (
    <>
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
    </>
  );
}

export function InventoryList() {
  const { data, isPending, isFailed, allInventories } = useInventory();

  useEffect(() => {
    function fetchAllInventories() {
      allInventories();
    }

    fetchAllInventories();
  }, [allInventories]);

  if (isPending) {
    return <InventoryListSkeleton />;
  }

  if (isFailed) {
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Failed</span> {data}
      </div>
    );
  }

  if (!data?.items?.length) {
    return <EmptyState />;
  }

  return (
    <>
      {data.items.map((item) => (
        <InventoryListItem name={item.name} id={item._id} key={item._id} category={item.category} quantity={item.quantity} image={item.image} />
      ))}
    </>
  );
}
