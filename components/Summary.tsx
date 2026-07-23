import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

const BUDGET_SEGMENTS = 20;

export default function Summary({
  transactions,
  budget,
}: {
  transactions: Transaction[];
  budget: number;
}) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  const used = budget > 0 ? Math.min(expense / budget, 1) : 0;
  const overBudget = budget > 0 && expense > budget;
  const filledSegments = Math.round(used * BUDGET_SEGMENTS);

  return (
    <div className="lcd-panel flex flex-col gap-3 rounded-xl px-4 py-3">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs tracking-widest opacity-70">수입</p>
          <p className="font-lcd text-2xl leading-none truncate">
            {formatCurrency(income)}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-widest opacity-70">지출</p>
          <p className="font-lcd text-2xl leading-none truncate">
            {formatCurrency(expense)}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-widest opacity-70">잔액</p>
          <p className="font-lcd text-2xl leading-none truncate">
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {budget > 0 && (
        <div className="flex flex-col gap-1 border-t border-lcd-dim pt-2">
          <div className="flex items-center justify-between text-xs tracking-wide opacity-80">
            <span>예산 {formatCurrency(budget)}</span>
            <span className={overBudget ? "font-bold" : ""}>
              {overBudget
                ? `초과 ${formatCurrency(expense - budget)}`
                : `남음 ${formatCurrency(budget - expense)}`}
            </span>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: BUDGET_SEGMENTS }).map((_, i) => (
              <span
                key={i}
                className={`h-2 flex-1 rounded-[1px] ${
                  i < filledSegments
                    ? overBudget
                      ? "bg-red"
                      : "bg-lcd-text"
                    : "bg-lcd-dim"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
