"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const BUDGET_ROW_ID = 1;

export function useBudget() {
  const [budget, setBudgetState] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("budget")
      .select("amount")
      .eq("id", BUDGET_ROW_ID)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) setBudgetState(data.amount);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setBudget = useCallback(async (value: number) => {
    setBudgetState(value);
    await supabase
      .from("budget")
      .update({ amount: value, updated_at: new Date().toISOString() })
      .eq("id", BUDGET_ROW_ID);
  }, []);

  return { budget, setBudget, loading };
}
