export function TodaysRevenue({ revenue }) {
  const formattedRevenue =
    typeof revenue === 'number'
      ? revenue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : 'Invalid Revenue';

  return (
    <div className="p-6 m-2 bg-white shadow rounded-md w-full">
      <h2 className="text-lg font-semibold text-gray-700">Today's Revenue</h2>
      <p className="text-2xl font-bold">Php{formattedRevenue}</p>
    </div>
  );
}
