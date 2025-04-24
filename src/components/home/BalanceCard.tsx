export function BalanceCard() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md p-6">
      <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">Saldo Disponible</h2>
      <p className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-gray-100">S/ 598.00</p>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-medium text-green-600 dark:text-green-400">+12.5%</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">vs mes anterior</span>
      </div>
    </div>
  );
}