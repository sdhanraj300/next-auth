"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {};

const SignUpPage = (props: Props) => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const router = useRouter();

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 201) {
        setSuccess("Account created successfully");
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setUser({
        email: "",
        password: "",
        username: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignUp();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="text-gray-700 mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="text-gray-700 mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-700 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
