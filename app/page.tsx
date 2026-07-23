"use client";

import BudgetInput from "@/components/BudgetInput";
import Summary from "@/components/Summary";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useBudget } from "@/hooks/useBudget";
import { useTransactions } from "@/hooks/useTransactions";

export default function Home() {
  const { transactions, addTransaction, removeTransaction } =
    useTransactions();
  const { budget, setBudget } = useBudget();

  return (
    <div className="flex flex-col flex-1 items-center bg-background py-10 px-4">
      <main className="calc-shell flex w-full max-w-xl flex-col gap-4 rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between px-1">
          <h1 className="text-lg font-bold tracking-widest text-key-text">
            가계부
          </h1>
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.6)]" />
        </div>

        <Summary transactions={transactions} budget={budget} />
        <BudgetInput budget={budget} onSetBudget={setBudget} />
        <TransactionForm onAdd={addTransaction} />
        <TransactionList
          transactions={transactions}
          onRemove={removeTransaction}
        />
      </main>
    </div>
  );
}
