import Link from "next/link";
import { Plus } from "lucide-react";

export function FloatingAddButton() {
  return (
    <Link href="/add-transaction" className="fixed bottom-16 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
      <Plus className="w-6 h-6" />
    </Link>
  );
}
