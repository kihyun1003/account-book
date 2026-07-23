"use client";

import Summary from "@/components/Summary";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useTransactions } from "@/hooks/useTransactions";

export default function Home() {
  const { transactions, addTransaction, removeTransaction } =
    useTransactions();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 w-full max-w-xl flex-col gap-6 py-10 px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          가계부
        </h1>

        <Summary transactions={transactions} />
        <TransactionForm onAdd={addTransaction} />
        <TransactionList
          transactions={transactions}
          onRemove={removeTransaction}
        />
      </main>
    </div>
  );
}
