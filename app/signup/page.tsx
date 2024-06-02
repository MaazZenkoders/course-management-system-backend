"use client";
import React, { useState } from "react";

const SignUpForm: React.FC = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Teacher" | "Student" | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<number | undefined>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      isAdmin,
    };

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const responseData = await response.json();
      const jwtToken = responseData.token;
      setToken(jwtToken);
      console.log(responseData);
      if (role === "Teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/student";
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          ABSTRACTION COURSES
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-around mb-4">
            <button
              className={`py-2 px-4 rounded ${
                role === "Teacher" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setRole("Teacher")}
            >
              Teacher
            </button>
            <button
              className={`py-2 px-4 rounded ${
                role === "Student" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setRole("Student")}
            >
              Student
            </button>
          </div>

          {role && (
            <p className="mb-4 text-center text-gray-600">
              Signing up as {role}
            </p>
          )}

          <div className="mb-4">
            <input
              type="text"
              className="w-full py-2 px-4 border rounded"
              placeholder="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              className="w-full py-2 px-4 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="w-full py-2 px-4 border rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="w-full py-2 px-4 border rounded"
              placeholder="isAdmin"
              value={isAdmin}
              onChange={(e) =>
                setIsAdmin(
                  e.target.value ? parseInt(e.target.value, 10) : undefined
                )
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded"
          >
            Sign Up
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
