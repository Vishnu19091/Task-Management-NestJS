import api from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import useAuthToken from "./useAuthToken";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "DONE";
  // createdAt?: string;
};

/** 
 * State variable: tasks, setTasks
 
 * @returns **Tasks, fetchTasks()**
 */
export function usefetchTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { token, setIsTokenAlive } = useAuthToken();

  // Fetches the tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);

      // set token is alive
      setIsTokenAlive(true);
      // console.log(res.data);

      // if token has expired, log the error
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        if (status == 401) {
          console.warn("Token expired!:");
          setIsTokenAlive(false);
        } else {
          console.error(status, message);
        }
      } else {
        console.error(err);
      }
    }
  };

  return { tasks, fetchTasks };
}
