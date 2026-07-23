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
      <p className="calc-panel rounded-lg text-sm text-center py-8 opacity-70">
        아직 내역이 없어요. 위에서 첫 내역을 추가해보세요.
      </p>
    );
  }

  const sorted = [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <ul className="calc-panel flex flex-col gap-2 w-full rounded-lg p-2">
      {sorted.map((t) => (
        <li
          key={t.id}
          className="calc-key flex items-center justify-between gap-3 rounded-lg px-4 py-3"
        >
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold rounded px-1.5 py-0.5 text-white ${
                  t.type === "income" ? "bg-blue" : "bg-red"
                }`}
              >
                {t.category}
              </span>
              <span className="text-xs opacity-60">{t.date}</span>
            </div>
            {t.memo && <p className="text-sm opacity-70 truncate">{t.memo}</p>}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-lcd text-lg">
              {t.type === "income" ? "+" : "-"}
              {formatCurrency(t.amount)}
            </span>
            <button
              onClick={() => onRemove(t.id)}
              aria-label="삭제"
              className="calc-key calc-key-red h-6 w-6 rounded-full text-xs font-bold shrink-0"
            >
              C
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
