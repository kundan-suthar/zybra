import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the Home Page</h1>
        <p className="text-gray-600 mb-6">
          Thanks for the task I learnt a lot from this one, And will be using tanstack table more often
        </p>
        <Link
          href="/users"
          className="inline-block rounded-md bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition"
        >
          Go to Users Page
        </Link>
      </div>
    </main>
  );
}
