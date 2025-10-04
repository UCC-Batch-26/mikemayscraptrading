import { Link } from 'react-router';
import { InventoryList } from '../components/inventory-list';

export function InventoryIndexPage() {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          to="/inventory/add"
          className="inline-block px-6 py-2.5 me-1 mb-2  bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        >
          Add Item
        </Link>
      </div>
      <div className="grid gap-4 justify-center">
        <InventoryList />
      </div>
    </div>
  );
}
