export function Button({ children, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className="w-full text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 disabled:bg-yellow-300 disabled:text-yellow-100"
      {...props}
    >
      {children}
    </button>
  );
}
