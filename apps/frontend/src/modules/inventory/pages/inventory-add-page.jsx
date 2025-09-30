import { Link } from 'react-router';
import AddItemForm from '../components/add-item-form';

export function AddItemPage() {
  return (
    <div className="grid gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-lead text-3xl">Add Item</h1>
        <Link to="/inventory/add" className="underline">
          Add Item
        </Link>
      </header>
      <AddItemForm />
    </div>
  );
}
