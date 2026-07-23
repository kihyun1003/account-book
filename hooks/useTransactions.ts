"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Transaction } from "@/lib/types";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("transactions")
      .select("id, type, date, category, amount, memo")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) setTransactions(data as Transaction[]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addTransaction = useCallback(
    async (transaction: Omit<Transaction, "id">) => {
      const { data, error } = await supabase
        .from("transactions")
        .insert(transaction)
        .select("id, type, date, category, amount, memo")
        .single();

      if (!error && data) {
        setTransactions((prev) => [data as Transaction, ...prev]);
      }
    },
    [],
  );

  const removeTransaction = useCallback(async (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    await supabase.from("transactions").delete().eq("id", id);
  }, []);

  return { transactions, addTransaction, removeTransaction, loading };
}
