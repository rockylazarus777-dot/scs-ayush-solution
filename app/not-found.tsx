import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1d4ed8] flex items-center justify-center text-center p-6">
      <div>
        <div className="text-8xl font-black text-white/10 mb-4">404</div>
        <h1 className="text-4xl font-black text-white mb-4">Page Not Found</h1>
        <p className="text-blue-200/60 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-xl"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
