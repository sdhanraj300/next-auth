"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const ProfilePage = (props: Props) => {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.log(err);
        router.push("/login"); // Redirect to login if user is not authenticated
      }
    };

    fetchUser();
  }, [router]);

  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        console.log("Logout successful");
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Profile Page</h1>
        {user ? (
          <div>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
            <button
              onClick={logoutHandler}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
