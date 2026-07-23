export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  type: TransactionType;
  date: string; // YYYY-MM-DD
  category: string;
  amount: number;
  memo: string;
};
