"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "account-book:budget";
const listeners = new Set<() => void>();
let cache: number | null = null;

function readFromStorage(): number {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}

function getSnapshot(): number {
  if (cache === null) cache = readFromStorage();
  return cache;
}

function getServerSnapshot(): number {
  return 0;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeBudget(budget: number) {
  cache = budget;
  window.localStorage.setItem(STORAGE_KEY, String(budget));
  listeners.forEach((listener) => listener());
}

export function useBudget() {
  const budget = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setBudget = useCallback((value: number) => {
    writeBudget(value);
  }, []);

  return { budget, setBudget };
}
