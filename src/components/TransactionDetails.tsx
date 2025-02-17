import { Trash, Pencil } from "lucide-react";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "expense" | "income";
  description?: string;
}

interface TransactionDetailsProps {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export function TransactionDetails({ transaction, onEdit, onDelete }: TransactionDetailsProps) {
  return (
    <>
      {/* Amount */}
      <div className={`text-2xl font-bold my-4 ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
        {transaction.type === "income" ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
      </div>

      {/* Details */}
      <div className="text-gray-300">
        <p>{transaction.description || "No description provided."}</p>
        <p className="text-sm mt-2">{new Date(transaction.date).toLocaleString()}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            fetch("/api/transactions", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: transaction._id }),
            })
              .then((res) => res.json())
              .then(() => {
                console.log("Transaction deleted successfully");
                window.location.reload();
              })
              .catch((err) => console.error("Error deleting transaction:", err));
          }}
          className="text-red-500 hover:text-white flex items-center gap-1"
        >
          <Trash className="w-5 h-5" /> Delete
        </button>
        <button onClick={onEdit} className="text-blue-500 hover:text-white flex items-center gap-1">
          <Pencil className="w-5 h-5" /> Edit
        </button>
      </div>
    </>
  );
}
