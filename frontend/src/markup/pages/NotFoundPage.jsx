export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#07adb1]">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Oops! Page not found</h2>
        <p className="text-gray-500 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[#07adb1] text-white text-lg rounded-md shadow hover:bg-[#05989c] transition-colors duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
