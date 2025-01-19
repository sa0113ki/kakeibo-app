import React from "react";

interface FormProps {
  form: { description: string; amount: string };
  setForm: (form: { description: string; amount: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  isIncome: boolean;
  setIsIncome: (isIncome: boolean) => void;
  showType: boolean;
}

const Form: React.FC<FormProps> = ({
  form,
  setForm,
  onSubmit,
  isIncome,
  setIsIncome,
  showType,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {showType && (
        <div>
          <label className="text-sm font-medium">種類</label>
          <div className="flex items-center space-x-4 mt-2">
            <div>
              <input
                type="radio"
                id="expense"
                name="type"
                checked={!isIncome}
                onChange={() => setIsIncome(false)}
                className="mr-2"
              />
              <label htmlFor="expense">支出</label>
            </div>
            <div>
              <input
                type="radio"
                id="income"
                name="type"
                checked={isIncome}
                onChange={() => setIsIncome(true)}
                className="mr-2"
              />
              <label htmlFor="income">収入</label>
            </div>
          </div>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="説明"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="金額"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isIncome ? "収入追加" : "支出追加"}
      </button>
    </form>
  );
};

export default Form;
