import informationIcon from '../../../assets/icons/information.png';

export function EmptyState() {
  return (
    <div
      role="alert"
      className="flex flex-row items-center justify-center p-12 bg-gray-50 border border-gray-200 rounded-lg text-center"
    >
      <img src={informationIcon} alt="Information Icon" className="w-12 h-12" />
      <h2 className="md:text-lg sm:text-sm font-semibold text-gray-700 mb-2 text-left ml-2 ">
        You haven't added anything to the list yet.
      </h2>
    </div>
  );
}
