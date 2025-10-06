import { Button } from '@/modules/common/components/button';
import { Input } from '@/modules/common/components/input';
import React, { useRef, useState } from 'react';

export default function AddItemForm() {
  const formRef = useRef();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const payload = Object.fromEntries(formData.entries());

    setIsPending(true);

    const INVENTORY_URL = import.meta.env.VITE_BACKEND_URL + '/api/items/';

    try {
      const res = await fetch(INVENTORY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to add item');
      }

      const data = await res.json();
      console.log('Item added on backend:', data);

      // Only reset form and update frontend state after success
      formRef.current.reset();
    } catch (err) {
      console.error('Error adding item:', err);
    } finally {
      setIsPending(false);
    }
  };


  return (
    <form onSubmit={onSubmit} ref={formRef} className="space-y-4 max-w-md mx-auto">
      <fieldset className="grid gap-2" disabled={isPending}>
        <div>
          <label htmlFor="name" className="sr-only">
            Item Name
          </label>
          <Input id="name" name="name" type="text" placeholder="Item Name *" required />
        </div>

        <div>
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-yellow-500"
            defaultValue=""
          >
            <option value="" disabled>
              Category *
            </option>
            <option value="Metal">Metal</option>
            <option value="Plastic">Plastic</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Electronics">Electronics</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="sr-only">
            Quantity
          </label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="Quantity *"
            defaultValue={1}
            required
            min={1}
          />
        </div>

        <div>
          <label htmlFor="unit" className="sr-only">
            Unit
          </label>
          <select
            id="unit" name="unit"
            required className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-yellow-500" defaultValue=""
          >
            <option value="" disabled>
              Unit *
            </option>
            <option value="kgs">kgs</option>
            <option value="pcs">pcs</option>
          </select>
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="purchasePrice" className="sr-only">
              Buy Price
            </label>
            <Input id="purchasePrice" name="purchasePrice" type="number" placeholder="Buy Price" min={0} step="any"
            />
          </div>
          <div className="w-full">
            <label htmlFor="sellingPrice" className="sr-only">
              Sell Price
            </label>
            <Input id="sellingPrice" name="sellingPrice" type="number" placeholder="Sell Price" min={0} step="any"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description (optional)"
            rows={4}
            className="w-full px-3 py-3 border rounded-md resize-y h-auto focus:outline-none focus:ring focus:border-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="sr-only">
            Upload Photo
          </label>
          <input
            id="image"
            name="image"
            type="text"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
