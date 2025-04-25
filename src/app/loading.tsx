export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
      </div>
    </div>
  );
}
