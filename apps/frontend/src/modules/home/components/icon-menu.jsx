import { Link } from 'react-router';
import { FileClock, FileCog, ShoppingCart, Calculator } from "lucide-react";
import { NotebookText } from 'lucide-react';

export function IconMenu() {
  const menuItems = [
    { icon: FileCog, label: "Inventory", to: "/inventory" },
    { icon: FileClock, label: "Transactions", to: "/transactions" },
    { icon: ShoppingCart, label: "Sales", to: "/sales" },
    { icon: Calculator, label: "Compute", to: "/compute" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto">
      {menuItems.map(({ icon: Icon, label, to }) => (
        <Link
          key={label}
          to={to}
          className="flex flex-col items-center justify-center p-6 rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition"
        >
          <Icon className="w-12 h-12 text-yellow-600 mb-3" />
          <span className="text-gray-800 font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
}
