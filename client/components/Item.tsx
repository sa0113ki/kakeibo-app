import Link from "next/link";
import React from "react";

interface ItemProps {
  id: number;
  description: string;
  amount: number;
  onDelete: (id: number) => void;
  title: "支出" | "収入";
}

const Item: React.FC<ItemProps> = ({
  id,
  description,
  amount,
  onDelete,
  title,
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300">
      <Link href={title === "支出" ? `/expense/${id}` : `/income/${id}`}>
        <div>
          <p className="text-lg font-semibold">{description}</p>
          <p className="text-gray-500">¥{amount}</p>
        </div>
      </Link>
      <button
        onClick={() => onDelete(id)}
        className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
      >
        削除
      </button>
    </div>
  );
};

export default Item;
