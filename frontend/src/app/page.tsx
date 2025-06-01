export default function HomePage() {
  return (
    <div id="home-page"> 
      <header className="w-full border-b-2 dark:shadow-xl dark:border-gray-700 border-gray-200 shadow-xs rounded-b-lg py-4 px-6">
        <nav className="flex justify-center space-x-6">
          <a href="/dashboard" className="text-lg text-blue-600 hover:underline">Dashboard</a>
          <a href="/auth/login" className="text-lg text-blue-600 hover:underline">Login</a>
          <a href="/auth/register" className="text-lg text-blue-600 hover:underline">Register</a>
        </nav>
      </header>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-blue-600 font-bold mt-6">Home page!</h1>
        <h1 className="text-2xl">Home page!</h1>
      </div>
    </div>

  );
}
