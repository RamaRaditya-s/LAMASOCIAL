export default function EmptyState({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <img src="/icons/empty-box.svg" alt="empty" className="w-24 h-24" />
      <p className="mt-4 text-gray-500">No data found</p>
      <button
        onClick={onBack || (() => location.reload())}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
      >
        Go Back
      </button>
    </div>
  );
}
