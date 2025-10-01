import NavBar from './nav-bar';
import { Outlet } from 'react-router';

export function BaseLayout() {
  return (
    <div className="w-full h-svh bg-[#f1f1f1] flex flex-col">
      <NavBar title={'Inventory'} />

      <main className="container mx-auto px-6 py-6 flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
