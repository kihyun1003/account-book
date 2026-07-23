"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Transaction } from "@/lib/types";

const STORAGE_KEY = "account-book:transactions";
const EMPTY: Transaction[] = [];
const listeners = new Set<() => void>();
let cache: Transaction[] | null = null;

function readFromStorage(): Transaction[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): Transaction[] {
  if (cache === null) cache = readFromStorage();
  return cache;
}

function getServerSnapshot(): Transaction[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeTransactions(transactions: Transaction[]) {
  cache = transactions;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  listeners.forEach((listener) => listener());
}

export function useTransactions() {
  const transactions = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id">) => {
      writeTransactions([
        { ...transaction, id: crypto.randomUUID() },
        ...getSnapshot(),
      ]);
    },
    [],
  );

  const removeTransaction = useCallback((id: string) => {
    writeTransactions(getSnapshot().filter((t) => t.id !== id));
  }, []);

  return { transactions, addTransaction, removeTransaction };
}
