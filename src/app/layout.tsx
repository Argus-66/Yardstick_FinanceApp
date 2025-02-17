import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav"; // ✅ New bottom bar component
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-950 text-white">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 min-h-screen md:ml-64">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
