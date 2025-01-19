import React from "react";
import ExpenseItem from "./Item";

interface Expense {
  id: number;
  description: string;
  amount: number;
  createdAt: string;
}

interface ListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  title: "支出" | "収入";
}

const List: React.FC<ListProps> = ({ expenses, onDelete, title }) => {
  const sortedExpenses = expenses.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="space-y-4 max-h-60 overflow-auto">
        {sortedExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            description={expense.description}
            amount={expense.amount}
            onDelete={onDelete}
            title={title}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
