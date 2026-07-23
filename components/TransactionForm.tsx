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
      className="calc-panel flex flex-col gap-3 w-full rounded-xl p-4"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`calc-key flex-1 rounded-lg py-2 text-sm font-bold ${
            type === "expense" ? "calc-key-red" : ""
          }`}
        >
          지출
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`calc-key flex-1 rounded-lg py-2 text-sm font-bold ${
            type === "income" ? "calc-key-blue" : ""
          }`}
        >
          수입
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold">
          날짜
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="calc-input rounded-lg px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold">
          카테고리
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="calc-input rounded-lg px-3 py-2 text-sm"
          >
            {CATEGORIES[type].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs font-bold">
        금액
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="calc-input rounded-lg px-3 py-2 text-lg font-lcd"
          required
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-bold">
        메모
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="선택 사항"
          className="calc-input rounded-lg px-3 py-2 text-sm"
        />
      </label>

      <button
        type="submit"
        className="calc-key calc-key-red mt-1 rounded-lg py-2 text-sm font-bold tracking-wide"
      >
        추가하기
      </button>
    </form>
  );
}
