export function Input({ children, type = 'input', ...props }) {
  return (
    <input
      type={type}
      className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-yellow-500"
      {...props}
    >
      {children}
    </input>
  );
}
