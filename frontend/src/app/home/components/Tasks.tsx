"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import TaskBlock from "./Task-comp";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";
import { PopoverModal } from "./TaskModal";

/**
 * Fetches the tasks of the user from db
 * uses token for authentication:Bearer
 * @returns Tasks[] of the user
 */
export default function TaskList() {
  // for storing the task
  const [tasks, setTasks] = useState<Array<string>>([]);

  const { token, isTokenAlive, setisTokenAlive } = useAuthToken();

  // Fetching the tasks
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

    fetchTasks();

    // Fetch tasks & token for every second
    const interval = setInterval(fetchTasks, 10);

    return () => clearInterval(interval);
  }, [token]);

  // Posts the task, request should be sent with bearer token

  return (
    <>
      {isTokenAlive ? (
        <div className="w-[80%] mx-auto">
          <div className="grid grid-cols-2 justify-center items-center mb-4 text-xl font-bold w-fit mx-auto">
            <h2>Tasks</h2>

            {/* TODO: Create a task */}
            <PopoverModal />
          </div>

          {tasks.length > 0 ? (
            <ul className="flex flex-col gap-6 w-full">
              {tasks.map((task: any) => (
                <TaskBlock
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  key={task.id}
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
