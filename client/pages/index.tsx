import { useState, useEffect } from "react";
import {
  Expense,
  Income,
  getExpenses,
  getIncomes,
  createExpense,
  createIncome,
  deleteExpense,
  deleteIncome,
} from "../services/api";
import ExpenseForm from "../components/Form";
import ExpenseList from "../components/List";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [form, setForm] = useState({ description: "", amount: "" });
  const [isIncome, setIsIncome] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, []);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const fetchIncomes = async () => {
    const data = await getIncomes();
    setIncomes(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isIncome) {
      await createIncome({
        description: form.description,
        amount: parseFloat(form.amount),
      });
    } else {
      await createExpense({
        description: form.description,
        amount: parseFloat(form.amount),
      });
    }
    setForm({ description: "", amount: "" });
    fetchExpenses();
    fetchIncomes();
  };

  const handleDelete = async (id: number, isIncome: boolean) => {
    if (isIncome) {
      await deleteIncome(id);
      fetchIncomes();
    } else {
      await deleteExpense(id);
      fetchExpenses();
    }
  };

  const groupExpensesByMonth = (expenses: Expense[]) => {
    const grouped: { [key: string]: Expense[] } = {};

    expenses.forEach((expense) => {
      const month = new Date(expense.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      });
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(expense);
    });

    return grouped;
  };

  const groupIncomesByMonth = (incomes: Income[]) => {
    const grouped: { [key: string]: Income[] } = {};

    incomes.forEach((income) => {
      const month = new Date(income.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      });
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(income);
    });

    return grouped;
  };

  const calculateBalance = (expenses: Expense[], incomes: Income[]) => {
    const incomeTotal = incomes.reduce((acc, income) => acc + income.amount, 0);
    const expenseTotal = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return incomeTotal - expenseTotal;
  };

  const groupedExpenses = groupExpensesByMonth(expenses);
  const groupedIncomes = groupIncomesByMonth(incomes);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">家計簿アプリ</h1>

      <div className="max-w-lg mx-auto">
        <ExpenseForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          isIncome={isIncome}
          setIsIncome={setIsIncome}
          showType={true}
        />
      </div>

      <div className="mt-8 max-w-lg mx-auto">
        <div className="space-y-8">
          {Object.keys(groupedExpenses).map((month) => {
            const monthlyExpenses = groupedExpenses[month];
            const monthlyIncomes = groupedIncomes[month] || [];
            const balance = calculateBalance(monthlyExpenses, monthlyIncomes);

            return (
              <div key={month} className="mb-6">
                <h2 className="text-xl font-semibold mb-4">{month}</h2>
                <div className="space-y-4">
                  <ExpenseList
                    expenses={monthlyExpenses}
                    onDelete={(id) => handleDelete(id, false)}
                    title="支出"
                  />
                  <ExpenseList
                    expenses={monthlyIncomes}
                    onDelete={(id) => handleDelete(id, true)}
                    title="収入"
                  />
                  <div className="mt-4">
                    <p className="font-semibold">
                      差額: ¥{balance.toLocaleString()}
                    </p>
                    {balance < 0 ? (
                      <p className="text-red-500">節約しましょう</p>
                    ) : (
                      <p>貯金できててえらい</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
