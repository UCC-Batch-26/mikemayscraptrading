export function EmptyState() {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg text-center"
    >
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-2a2 2 0 00-2-2H5V7a2 2 0 012-2h10a2 2 0 012 2v6h-2a2 2 0 00-2 2v2m-4 0h4"
        />
      </svg>

      <h2 className="text-lg font-semibold text-gray-700 mb-2">You haven't added anything to the list yet.</h2>
    </div>
  );
}
