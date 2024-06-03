"use client";
import { setCookie } from "cookies-next";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

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
      email,
      password,
      role,
    };

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      setCookie('role',role)
      const responseData = await response.json();
      const accessToken = responseData.token;
      setCookie("accessToken" , accessToken)
      console.log(responseData);
      if (role === "Teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/student";
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
              onClick={() => handleDisplay("Teacher")}
            >
              Student
            </button>
          </div>

          {role && (
            <p className="mb-4 text-center text-gray-600">
              Logging in as {role}
            </p>
          )}

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
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
