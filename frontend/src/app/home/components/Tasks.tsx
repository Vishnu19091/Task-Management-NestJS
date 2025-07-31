"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

/**
 * Fetches the tasks of the user from db
 * uses token for authentication:Bearer
 * @returns Tasks[] of the user
 */
export default function TaskList() {
  // for storing the task
  const [tasks, setTasks] = useState([]);

  // storing the token
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // ✅ no JSON.parse
    }
  }, []);

  useEffect(() => {
    // TODO: if token not found return user to the login or signup page
    if (!token) return;

    // Fetch the tasks
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
        console.log(res.data);
      } catch (err: any) {
        console.error("❌ Token failed:", err?.response?.data || err.message);
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      {/* TODO: Write a comp that displays the tasks props */}
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
