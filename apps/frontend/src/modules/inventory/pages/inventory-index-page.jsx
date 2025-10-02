import { SampleList } from '@/modules/sample/components/sample-list';
import { Link } from 'react-router';

export function InventoryIndexPage() {
  return (
    <div className="grid gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-lead text-4xl">All Inventory</h1>
        <Link to="/sample/add" className="underline">
          Add Item
        </Link>
      </header>
      <SampleList />
      <Link to="/" className="underline mt-10 text-center">
        Go to Home Page
      </Link>
    </div>
  );
}
