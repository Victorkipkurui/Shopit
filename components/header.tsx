import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-sky-600 p-2 text-white">
              {/* simple logo mark */}
              SR
            </div>
            <span className="font-semibold text-lg">ShopRight</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/posts" className="text-sm text-slate-700 hover:underline">
            Posts
          </Link>
          <Link href="/login" className="text-sm text-slate-700 hover:underline">
            Login
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex">
            <ShoppingCart className="mr-2" size={16} />
            Cart
          </Button>

          <Button variant="outline" className="md:hidden p-2">
            <Menu size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}