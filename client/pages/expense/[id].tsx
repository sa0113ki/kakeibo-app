import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Expense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../../services/api";
import ExpenseForm from "../../components/Form";

const ExpenseDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ description: "", amount: "" });

  useEffect(() => {
    if (id) {
      fetchExpense(Number(id));
    }
  }, [id]);

  const fetchExpense = async (expenseId: number) => {
    setLoading(true);
    const data = await getExpenseById(expenseId);
    setExpense(data);
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const updatedExpense = await updateExpense(Number(id), {
        description: form.description,
        amount: Number(form.amount),
      });
      setExpense(updatedExpense);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      const confirmDelete = window.confirm("本当に削除しますか？");
      if (confirmDelete) {
        await deleteExpense(Number(id));
        router.push("/");
      }
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  if (loading) {
    return <p className="p-4 text-center">読み込み中...</p>;
  }

  if (!expense) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">支出が見つかりません</h1>
        <Link href="/" className="text-blue-500 underline">
          戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="text-black"
        onClick={() => {
          isEditing ? setIsEditing(false) : router.push("/");
        }}
      >
        ＜戻る
      </button>
      <h1 className="text-2xl font-bold mb-4">支出の詳細</h1>
      {isEditing ? (
        <ExpenseForm
          form={form}
          setForm={setForm}
          onSubmit={handleUpdate}
          isIncome={false}
          setIsIncome={() => {}}
          showType={false}
        />
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">説明: {expense.description}</p>
          <p className="text-lg font-semibold">金額: ¥{expense.amount}</p>
          <p className="text-lg font-semibold">
            作成日: {formatDate(expense.createdAt)}
          </p>
        </div>
      )}
      <div className="mt-4 flex gap-4">
        {!isEditing && (
          <button
            onClick={() => {
              setForm({
                description: expense.description,
                amount: String(expense.amount),
              });
              setIsEditing(true);
            }}
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            更新
          </button>
        )}
        {!isEditing && (
          <button
            onClick={handleDelete}
            className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetail;
