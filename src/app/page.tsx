import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">💰 Personal Finance Tracker</h1>
      <Link href="/transactions">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          View Transactions
        </button>
      </Link>
    </div>
  );
}
