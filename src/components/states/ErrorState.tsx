export default function ErrorState({ message, onRetry }:
  { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <p className="text-red-600 font-medium">
        {message || "Something went wrong."}
      </p>
      <button
        onClick={onRetry || (() => location.reload())}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
      >
        Retry
      </button>
    </div>
  );
}
