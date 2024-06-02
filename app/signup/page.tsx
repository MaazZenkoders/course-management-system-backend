"use client";
import React, { useState } from "react";

const SignUpForm: React.FC = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [token, setToken] = useState<string | null>(null);

  const handleDisplay = (name: string) => {
    setRole(name);
    if (name === "Teacher") {
      setRole("admin");
    } else {
      setRole("student");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
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

      localStorage.setItem("role", role);
      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem("token", token);
      console.log(responseData);
      if (role === "admin") {
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
                role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleDisplay("Teacher")}
            >
              Teacher
            </button>
            <button
              className={`py-2 px-4 rounded ${
                role === "student" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleDisplay("Student")}
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
