import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export default function Summary({ transactions }: { transactions: Transaction[] }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      <div className="rounded-xl bg-blue-50 dark:bg-blue-950 p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">수입</p>
        <p className="text-lg font-semibold text-blue-700 dark:text-blue-300 truncate">
          {formatCurrency(income)}
        </p>
      </div>
      <div className="rounded-xl bg-red-50 dark:bg-red-950 p-4">
        <p className="text-sm text-red-700 dark:text-red-300">지출</p>
        <p className="text-lg font-semibold text-red-700 dark:text-red-300 truncate">
          {formatCurrency(expense)}
        </p>
      </div>
      <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">잔액</p>
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 truncate">
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
}
