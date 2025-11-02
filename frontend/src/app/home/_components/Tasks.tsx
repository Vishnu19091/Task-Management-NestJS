"use client";

import { useEffect, useState } from "react";
import TaskBlock from "./Task-comp";
import useAuthToken from "@/_hooks/useAuthToken";
import { usefetchTasks } from "@/_hooks/fetchTasks";
import { CreateTask } from "./TaskModal";

/**
 * Fetches the tasks of the user from db
 * uses token for authentication:Bearer
 * @returns Tasks[] of the user
 */
export default function TaskList() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // for storing the task
  const { tasks, fetchTasks } = usefetchTasks();

  // filter tasks based on input
  let filterTask = tasks.filter((task) => {
    if (activeFilter === "All") return true;
    return task.status === activeFilter;
  });

  const { token, isTokenAlive } = useAuthToken();

  // Fetches the tasks if the token is alive
  useEffect(() => {
    if (token) fetchTasks();
  }, [token, isTokenAlive]);

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
                  className="font-normal px-2 py-1 rounded-2xl border"
                  value={status}
                  onClick={setActiveFilter}
                  isActive={activeFilter === status}
                />
              ))}
            </div>

            {/* TODO: Create a task modal */}
            <CreateTask fetchTasks={fetchTasks} />
          </div>

          {/* display Tasks */}
          {filterTask.length > 0 && (
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
          )}

          {/* No Tasks display messages */}
          {activeFilter === "All" && filterTask.length <= 0 && (
            <h2 className="text-center font-bold text-3xl">
              Start Creating Tasks
            </h2>
          )}

          {activeFilter === "OPEN" && filterTask.length <= 0 && (
            <h2 className="text-center font-bold text-3xl">
              There is no active OPEN Tasks
            </h2>
          )}
          {activeFilter === "IN_PROGRESS" && filterTask.length <= 0 && (
            <h2 className="text-center font-bold text-3xl">
              There is no active IN_PROGRESS Tasks
            </h2>
          )}

          {activeFilter === "DONE" && filterTask.length <= 0 && (
            <h2 className="text-center font-bold text-3xl">
              There is no active DONE Tasks
            </h2>
          )}
        </div>
      ) : (
        // if token is not alive show expired
        // new users should allowed to use app only when they signup
        // then show redirecting
        <div>
          <h1 className="text-3xl text-center">
            Token has expired please you have to{" "}
            <strong className="font-extrabold text-blue-400">
              sign in again{" "}
            </strong>
            redirecting....
          </h1>
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
  // Set of properties K of type T
  const activeColors: Record<typeof value, string> = {
    All: "bg-white/50 border-white text-white",
    OPEN: "bg-gray-400/50 border-gray-500 text-gray-200/70",
    IN_PROGRESS: "bg-blue-400/50 border-blue-500 text-blue-200/70",
    DONE: "bg-green-400/50 border-green-500 text-green-200/70",
  };

  return (
    <button
      className={`${className} ${isActive ? activeColors[value] : ""}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}
