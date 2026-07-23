import { TransactionType } from "./types";

export const CATEGORIES: Record<TransactionType, string[]> = {
  income: ["급여", "용돈", "부수입", "기타"],
  expense: ["식비", "교통", "주거", "쇼핑", "문화생활", "의료", "기타"],
};
