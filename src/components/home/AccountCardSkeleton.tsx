export function AccountCardSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md p-6 animate-pulse">
      <div className="mb-6">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>

        <div className="mt-4 h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-6">
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
