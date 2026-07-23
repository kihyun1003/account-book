import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export default function TransactionList({
  transactions,
  onRemove,
}: {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}) {
  if (transactions.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
        아직 내역이 없어요. 위에서 첫 내역을 추가해보세요.
      </p>
    );
  }

  const sorted = [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <ul className="flex flex-col gap-2 w-full">
      {sorted.map((t) => (
        <li
          key={t.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"
        >
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium rounded px-1.5 py-0.5 ${
                  t.type === "income"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {t.category}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {t.date}
              </span>
            </div>
            {t.memo && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                {t.memo}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`font-semibold ${
                t.type === "income"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {t.type === "income" ? "+" : "-"}
              {formatCurrency(t.amount)}
            </span>
            <button
              onClick={() => onRemove(t.id)}
              aria-label="삭제"
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-sm"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
