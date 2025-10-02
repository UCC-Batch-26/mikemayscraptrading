import { HomePage } from '@/modules/home/pages/home-page';
import { SampleLayout } from '@/modules/sample/layouts/sample-layout';
import { SampleAddPage } from '@/modules/sample/pages/sample-add-page';
import { SampleIndexPage } from '@/modules/sample/pages/sample-index-page';
import { SampleViewPage } from '@/modules/sample/pages/sample-view-page';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { InventoryLayout } from './modules/inventory/layouts/inventory-layout';
import { AddItemPage } from './modules/inventory/pages/inventory-add-page';
import { BaseLayout } from './modules/common/components/base-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/inventory',
        element: <InventoryLayout />,
        children: [
          {
            path: '',
            index: true,
            element: <SampleIndexPage />,
          },
          {
            path: 'add',
            element: <AddItemPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/sample',
    element: <SampleLayout />,
    children: [
      {
        path: '',
        index: true,
        element: <SampleIndexPage />,
      },
      {
        path: ':id',
        element: <SampleViewPage />,
      },
      {
        path: 'add',
        element: <SampleAddPage />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
