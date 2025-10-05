import AddItemForm from '../components/add-item-form';

export function AddItemPage() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-center">
        <h1 className="text-lead text-3xl">Add Item</h1>
      </div>
      <AddItemForm />
    </div>
  );
}
