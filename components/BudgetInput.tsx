"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

export default function BudgetInput({
  budget,
  onSetBudget,
}: {
  budget: number;
  onSetBudget: (value: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  function startEditing() {
    setValue(budget ? String(budget) : "");
    setIsEditing(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = Number(value);
    if (!parsed || parsed <= 0) return;
    onSetBudget(parsed);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="number"
          min={1}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="이번 달 예산 금액"
          className="calc-input flex-1 rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="calc-key calc-key-blue rounded-lg px-4 py-2 text-sm font-bold"
        >
          설정
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className="calc-key flex items-center justify-between w-full rounded-lg px-4 py-2 text-sm font-bold"
    >
      <span>이번 달 예산</span>
      <span className="font-lcd text-lg">
        {budget > 0 ? formatCurrency(budget) : "설정하기 ▸"}
      </span>
    </button>
  );
}
