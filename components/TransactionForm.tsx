"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { Transaction, TransactionType } from "@/lib/types";

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

export default function TransactionForm({
  onAdd,
}: {
  onAdd: (transaction: Omit<Transaction, "id">) => void;
}) {
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState(todayString());
  const [category, setCategory] = useState(CATEGORIES.expense[0]);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  function handleTypeChange(nextType: TransactionType) {
    setType(nextType);
    setCategory(CATEGORIES[nextType][0]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) return;

    onAdd({ type, date, category, amount: parsedAmount, memo });
    setAmount("");
    setMemo("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            type === "expense"
              ? "bg-red-600 text-white"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          }`}
        >
          지출
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            type === "income"
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          }`}
        >
          수입
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          날짜
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          카테고리
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
          >
            {CATEGORIES[type].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        금액
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        메모
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="선택 사항"
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
        />
      </label>

      <button
        type="submit"
        className="mt-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2 text-sm font-medium hover:opacity-90"
      >
        추가하기
      </button>
    </form>
  );
}
