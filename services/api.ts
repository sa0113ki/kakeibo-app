import axios from "axios";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  createdAt: string;
}

export interface Income {
  id: number;
  description: string;
  amount: number;
  createdAt: string;
}

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await api.get<Expense[]>("/expenses");
  return response.data;
};

export const createExpense = async (
  data: Omit<Expense, "id" | "createdAt">
): Promise<Expense> => {
  const response = await api.post<Expense>("/expenses", data);
  return response.data;
};

export const updateExpense = async (
  id: number,
  data: Omit<Expense, "id" | "createdAt">
): Promise<Expense> => {
  const response = await api.put<Expense>(`/expenses/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await api.delete(`/expenses/${id}`);
};

export const getExpenseById = async (id: number): Promise<Expense | null> => {
  try {
    const response = await api.get<Expense>(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch expense:", error);
    return null;
  }
};

export const getIncomes = async (): Promise<Income[]> => {
  const response = await api.get<Income[]>("/incomes");
  return response.data;
};

export const createIncome = async (
  data: Omit<Income, "id" | "createdAt">
): Promise<Income> => {
  const response = await api.post<Income>("/incomes", data);
  return response.data;
};

export const updateIncome = async (
  id: number,
  data: Omit<Income, "id" | "createdAt">
): Promise<Income> => {
  const response = await api.put<Income>(`/incomes/${id}`, data);
  return response.data;
};

export const deleteIncome = async (id: number): Promise<void> => {
  await api.delete(`/incomes/${id}`);
};

export const getIncomeById = async (id: number): Promise<Income | null> => {
  try {
    const response = await api.get<Income>(`/incomes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch income:", error);
    return null;
  }
};
