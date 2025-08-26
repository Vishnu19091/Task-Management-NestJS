"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import TaskBlock from "./Task-comp";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";
import { PopoverModal } from "./TaskModal";
import { constrainedMemory } from "process";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "DONE"; // enforce allowed values
  // createdAt?: string; // if you also have dates
};

/**
 * Fetches the tasks of the user from db
 * uses token for authentication:Bearer
 * @returns Tasks[] of the user
 */
export default function TaskList() {
  // for storing the task
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeFilter, setActiveFilter] = useState<string>("All");

  // filter tasks based on input
  let filterTask = tasks.filter((task) => {
    if (activeFilter === "All") return true;
    return task.status === activeFilter;
  });
  // console.log(filterTask);

  const { token, isTokenAlive, setisTokenAlive } = useAuthToken();

  // Fetch the tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);

      // set token is alive
      setisTokenAlive(true);
      // console.log(res.data);

      // if token has expired, log the error
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        if (status == 401) {
          console.warn("Token expired!:");
          setisTokenAlive(false);
        } else {
          console.error(status, message);
        }
      } else {
        console.error(err);
      }
    }
  };

  // Fetching the tasks
  useEffect(() => {
    // TODO: if token not found return user to the login or signup page
    if (token) fetchTasks();
  }, [token]);

  const [sortActive, isSortActive] = useState(true);

  return (
    <>
      {isTokenAlive ? (
        <div className="w-[80%] mx-auto">
          <div className="grid grid-cols-3 justify-center items-center mb-4 text-xl font-bold w-fit mx-auto">
            <h2>Tasks</h2>

            {/* Sort tasks buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              {["All", "OPEN", "IN_PROGRESS", "DONE"].map((status) => (
                <FilterButton
                  key={status}
                  className="font-normal px-2 py-1 rounded-2xl border w-auto"
                  value={status}
                  onClick={setActiveFilter}
                  isActive={activeFilter === status}
                />
              ))}
            </div>

            {/* TODO: Create a task modal */}
            <PopoverModal onTaskCreated={fetchTasks} />
          </div>

          {/* display Tasks */}
          {filterTask.length > 0 ? (
            <ul className="flex flex-col gap-6 w-full">
              {filterTask.map((task: any) => (
                <TaskBlock
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  // createdAt={task.createdAt}
                  key={task.id}
                  onTaskFetch={fetchTasks}
                />
              ))}
            </ul>
          ) : (
            <h2 className="text-center font-bold text-3xl">
              Start Creating Tasks
            </h2>
          )}
        </div>
      ) : (
        // if token is not alive show expired
        // new users should allowed to use app only when they signup
        // then show redirecting
        <div>
          Token has expired please you have to{" "}
          <strong className="font-extrabold text-blue-400">
            sign in again{" "}
          </strong>
          redirecting....
        </div>
      )}
    </>
  );
}

function FilterButton({
  className,
  value,
  onClick,
  isActive,
}: {
  className: string;
  value: string;
  onClick: (value: string) => void;
  isActive: boolean;
}) {
  return (
    <button
      className={`${className} ${isActive ? "bg-white/30 border-white" : ""}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}
