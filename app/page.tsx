"use client"
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white">
    <h1 className="text-4xl font-bold mb-4">Welcome to Abstraction Courses</h1>
    <p className="text-lg mb-8 text-center">Explore our wide range of courses and unlock your potential.</p>
    <div className="flex space-x-4">
      <a href="/login" className="py-2 px-4 bg-white text-blue-600 hover:bg-blue-100 rounded-lg font-bold text-lg">Login</a>
      <a href="/signup" className="py-2 px-4 bg-white text-blue-600 hover:bg-blue-100 rounded-lg font-bold text-lg">Sign Up</a>
    </div>
  </div>
);
}
